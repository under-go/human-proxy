package com.humanproxy.api.shared.security;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.UUID;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class AgentAuthFilterTest {

  private static final String AGENT_SECRET = "hp-dev-signing-secret";
  private static final String LATPEED_SECRET = "latpeed-dev-signing-secret";

  @Autowired private MockMvc mockMvc;

  @Test
  void agentEndpointsShouldRequireHeaders() throws Exception {
    mockMvc.perform(get("/v1/agent/tasks/sample")).andExpect(status().isUnauthorized());
  }

  @Test
  void agentGetShouldAcceptValidSignature() throws Exception {
    String timestamp = currentTimestamp();
    String nonce = UUID.randomUUID().toString();
    String signature = agentSignature("GET", "/v1/agent/tasks/sample", timestamp, nonce, "");

    mockMvc
        .perform(
            get("/v1/agent/tasks/sample")
                .header("X-HP-API-KEY", "hp_test_key")
                .header("X-HP-TIMESTAMP", timestamp)
                .header("X-HP-NONCE", nonce)
                .header("X-HP-SIGNATURE", signature))
        .andExpect(status().isNotFound());
  }

  @Test
  void agentGetShouldRejectInvalidSignature() throws Exception {
    String timestamp = currentTimestamp();
    String nonce = UUID.randomUUID().toString();

    mockMvc
        .perform(
            get("/v1/agent/tasks/sample")
                .header("X-HP-API-KEY", "hp_test_key")
                .header("X-HP-TIMESTAMP", timestamp)
                .header("X-HP-NONCE", nonce)
                .header("X-HP-SIGNATURE", "bad-signature"))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void agentMutatingRequestsShouldRequireIdempotencyHeader() throws Exception {
    String timestamp = currentTimestamp();
    String nonce = UUID.randomUUID().toString();
    String signature = agentSignature("POST", "/v1/agent/tasks", timestamp, nonce, "");

    mockMvc
        .perform(
            post("/v1/agent/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-HP-API-KEY", "hp_test_key")
                .header("X-HP-TIMESTAMP", timestamp)
                .header("X-HP-NONCE", nonce)
                .header("X-HP-SIGNATURE", signature)
                .content(validTaskCreateRequest()))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void agentMutatingRequestsShouldAcceptValidSignature() throws Exception {
    String timestamp = currentTimestamp();
    String nonce = UUID.randomUUID().toString();
    String idempotencyKey = "idem-" + UUID.randomUUID();
    String signature = agentSignature("POST", "/v1/agent/tasks", timestamp, nonce, idempotencyKey);

    mockMvc
        .perform(
            post("/v1/agent/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-HP-API-KEY", "hp_test_key")
                .header("X-HP-TIMESTAMP", timestamp)
                .header("X-HP-NONCE", nonce)
                .header("X-HP-SIGNATURE", signature)
                .header("Idempotency-Key", idempotencyKey)
                .content(validTaskCreateRequest()))
        .andExpect(status().isOk());
  }

  @Test
  void agentNonceReplayShouldBeRejected() throws Exception {
    String timestamp = currentTimestamp();
    String nonce = "replay-nonce";
    String signature = agentSignature("GET", "/v1/agent/tasks/sample", timestamp, nonce, "");

    mockMvc
        .perform(
            get("/v1/agent/tasks/sample")
                .header("X-HP-API-KEY", "hp_test_key")
                .header("X-HP-TIMESTAMP", timestamp)
                .header("X-HP-NONCE", nonce)
                .header("X-HP-SIGNATURE", signature))
        .andExpect(status().isNotFound());

    mockMvc
        .perform(
            get("/v1/agent/tasks/sample")
                .header("X-HP-API-KEY", "hp_test_key")
                .header("X-HP-TIMESTAMP", timestamp)
                .header("X-HP-NONCE", nonce)
                .header("X-HP-SIGNATURE", signature))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void walletEndpointsShouldRequireBearerAuthorization() throws Exception {
    mockMvc.perform(get("/v1/wallet/ledger")).andExpect(status().isUnauthorized());
  }

  @Test
  void walletEndpointsShouldAcceptBearerAuthorization() throws Exception {
    mockMvc
        .perform(get("/v1/wallet/ledger").header("Authorization", "Bearer demo-owner-token"))
        .andExpect(status().isOk());
  }

  @Test
  void latpeedWebhookShouldRequireDedicatedHeaders() throws Exception {
    mockMvc
        .perform(
            post("/v1/payments/latpeed/webhook")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"eventId\":\"evt-1\"}"))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void latpeedWebhookShouldAcceptSignedHeaders() throws Exception {
    String timestamp = currentTimestamp();
    String signature = latpeedSignature("POST", "/v1/payments/latpeed/webhook", timestamp);

    mockMvc
        .perform(
            post("/v1/payments/latpeed/webhook")
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-LATPEED-TIMESTAMP", timestamp)
                .header("X-LATPEED-SIGNATURE", signature)
                .content("{\"eventId\":\"evt-1\"}"))
        .andExpect(status().isOk());
  }

  private static String validTaskCreateRequest() {
    return """
        {
          "spec": {
            "prompt": "테스트 작업",
            "expectedOutput": "완료 보고",
            "category": "research",
            "deadlineAt": "2026-03-20T09:00:00+09:00"
          },
          "reward": {
            "amountKrw": 10000,
            "feeKrw": 1500
          }
        }
        """;
  }

  private static String currentTimestamp() {
    return String.valueOf(Instant.now().getEpochSecond());
  }

  private static String agentSignature(
      String method, String path, String timestamp, String nonce, String idempotencyKey) {
    return hmacSha256(AGENT_SECRET, canonicalPayload(method, path, timestamp, nonce, idempotencyKey));
  }

  private static String latpeedSignature(String method, String path, String timestamp) {
    return hmacSha256(LATPEED_SECRET, canonicalPayload(method, path, timestamp, "", ""));
  }

  private static String canonicalPayload(
      String method, String path, String timestamp, String nonce, String idempotencyKey) {
    return method + "\n" + path + "\n" + timestamp + "\n" + nonce + "\n" + idempotencyKey;
  }

  private static String hmacSha256(String secret, String payload) {
    try {
      Mac mac = Mac.getInstance("HmacSHA256");
      mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
      byte[] digest = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
      StringBuilder hex = new StringBuilder(digest.length * 2);
      for (byte value : digest) {
        hex.append(String.format("%02x", value));
      }
      return hex.toString();
    } catch (Exception ex) {
      throw new IllegalStateException("Failed to create test signature", ex);
    }
  }
}
