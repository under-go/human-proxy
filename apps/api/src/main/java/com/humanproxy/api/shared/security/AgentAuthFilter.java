package com.humanproxy.api.shared.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AgentAuthFilter extends OncePerRequestFilter {

  private static final List<String> AGENT_REQUIRED_HEADERS =
      List.of("X-HP-API-KEY", "X-HP-TIMESTAMP", "X-HP-NONCE", "X-HP-SIGNATURE");
  private static final List<String> LATPEED_REQUIRED_HEADERS =
      List.of("X-LATPEED-TIMESTAMP", "X-LATPEED-SIGNATURE");
  private static final Set<String> IDEMPOTENCY_REQUIRED_METHODS =
      Set.of("POST", "PUT", "PATCH", "DELETE");
  private static final String HMAC_ALGORITHM = "HmacSHA256";

  private final String agentSigningSecret;
  private final String latpeedSigningSecret;
  private final Set<String> allowedApiKeys;
  private final long timestampSkewSeconds;
  private final Map<String, Long> nonceExpirationByKey = new ConcurrentHashMap<>();

  public AgentAuthFilter(
      @Value("${security.agent.signing-secret:hp-dev-signing-secret}") String agentSigningSecret,
      @Value("${security.latpeed.signing-secret:latpeed-dev-signing-secret}")
          String latpeedSigningSecret,
      @Value("${security.agent.allowed-api-keys:}") String allowedApiKeys,
      @Value("${security.agent.timestamp-skew-seconds:300}") long timestampSkewSeconds) {
    this.agentSigningSecret = agentSigningSecret;
    this.latpeedSigningSecret = latpeedSigningSecret;
    this.allowedApiKeys = parseAllowedApiKeys(allowedApiKeys);
    this.timestampSkewSeconds = timestampSkewSeconds;
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String uri = request.getRequestURI();
    return !(uri.startsWith("/v1/agent/")
        || uri.startsWith("/v1/jobs/")
        || uri.startsWith("/v1/wallet/")
        || uri.equals("/v1/settlements")
        || uri.equals("/v1/disputes")
        || uri.equals("/v1/payments/latpeed/webhook"));
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String uri = request.getRequestURI();
    String method = request.getMethod();

    if (uri.startsWith("/v1/agent/")) {
      String apiKey = request.getHeader("X-HP-API-KEY");
      String timestamp = request.getHeader("X-HP-TIMESTAMP");
      String nonce = request.getHeader("X-HP-NONCE");
      String signature = request.getHeader("X-HP-SIGNATURE");
      String idempotencyKey = request.getHeader("Idempotency-Key");

      for (String header : AGENT_REQUIRED_HEADERS) {
        if (isBlank(request.getHeader(header))) {
          writeUnauthorized(response, "AUTH_HEADER_MISSING", "Missing header: " + header);
          return;
        }
      }
      if (!allowedApiKeys.isEmpty() && !allowedApiKeys.contains(apiKey)) {
        writeUnauthorized(response, "AUTH_KEY_INVALID", "Unknown API key");
        return;
      }
      if (!isTimestampWithinRange(timestamp)) {
        writeUnauthorized(response, "AUTH_TIMESTAMP_INVALID", "Timestamp is out of allowed range");
        return;
      }
      if (!registerNonce(apiKey, nonce)) {
        writeUnauthorized(response, "AUTH_NONCE_REPLAYED", "Nonce already used");
        return;
      }
      if (IDEMPOTENCY_REQUIRED_METHODS.contains(method) && isBlank(idempotencyKey)) {
        writeUnauthorized(response, "AUTH_HEADER_MISSING", "Missing header: Idempotency-Key");
        return;
      }
      String payload =
          canonicalPayload(
              method, uri, timestamp, nonce, idempotencyKey == null ? "" : idempotencyKey);
      if (!verifySignature(agentSigningSecret, signature, payload)) {
        writeUnauthorized(response, "AUTH_SIGNATURE_INVALID", "Invalid request signature");
        return;
      }
    } else if (uri.equals("/v1/payments/latpeed/webhook")) {
      String timestamp = request.getHeader("X-LATPEED-TIMESTAMP");
      String signature = request.getHeader("X-LATPEED-SIGNATURE");
      for (String header : LATPEED_REQUIRED_HEADERS) {
        if (isBlank(request.getHeader(header))) {
          writeUnauthorized(response, "WEBHOOK_HEADER_MISSING", "Missing header: " + header);
          return;
        }
      }
      if (!isTimestampWithinRange(timestamp)) {
        writeUnauthorized(
            response, "WEBHOOK_TIMESTAMP_INVALID", "Timestamp is out of allowed range");
        return;
      }
      String payload = canonicalPayload(method, uri, timestamp, "", "");
      if (!verifySignature(latpeedSigningSecret, signature, payload)) {
        writeUnauthorized(response, "WEBHOOK_SIGNATURE_INVALID", "Invalid webhook signature");
        return;
      }
    } else {
      String auth = request.getHeader("Authorization");
      if (isBlank(auth) || !auth.startsWith("Bearer ")) {
        writeUnauthorized(
            response,
            "AUTH_HEADER_INVALID",
            "Authorization header must be a Bearer token");
        return;
      }
    }

    filterChain.doFilter(request, response);
  }

  private static boolean isBlank(String value) {
    return value == null || value.isBlank();
  }

  private Set<String> parseAllowedApiKeys(String rawKeys) {
    if (isBlank(rawKeys)) {
      return Set.of();
    }
    Set<String> parsed = new HashSet<>();
    Arrays.stream(rawKeys.split(","))
        .map(String::trim)
        .filter((value) -> !value.isEmpty())
        .forEach(parsed::add);
    return Set.copyOf(parsed);
  }

  private boolean isTimestampWithinRange(String timestampHeader) {
    try {
      long now = Instant.now().getEpochSecond();
      long timestamp = parseEpochSecond(timestampHeader);
      return Math.abs(now - timestamp) <= timestampSkewSeconds;
    } catch (NumberFormatException ex) {
      return false;
    }
  }

  private long parseEpochSecond(String timestampHeader) {
    long raw = Long.parseLong(timestampHeader);
    if (timestampHeader.length() > 10) {
      return raw / 1000;
    }
    return raw;
  }

  private boolean registerNonce(String apiKey, String nonce) {
    cleanupExpiredNonces();
    long now = Instant.now().getEpochSecond();
    long expiration = now + timestampSkewSeconds;
    String cacheKey = apiKey + ":" + nonce;
    Long existing = nonceExpirationByKey.putIfAbsent(cacheKey, expiration);
    if (existing == null) {
      return true;
    }
    if (existing < now) {
      nonceExpirationByKey.put(cacheKey, expiration);
      return true;
    }
    return false;
  }

  private void cleanupExpiredNonces() {
    long now = Instant.now().getEpochSecond();
    nonceExpirationByKey.entrySet().removeIf((entry) -> entry.getValue() < now);
  }

  private static String canonicalPayload(
      String method, String path, String timestamp, String nonce, String idempotencyKey) {
    return method + "\n" + path + "\n" + timestamp + "\n" + nonce + "\n" + idempotencyKey;
  }

  private boolean verifySignature(String secret, String receivedSignature, String payload) {
    if (isBlank(receivedSignature)) {
      return false;
    }
    String expected = signHmacSha256(secret, payload);
    String normalized = normalizeSignature(receivedSignature);
    return MessageDigest.isEqual(
        expected.getBytes(StandardCharsets.UTF_8), normalized.getBytes(StandardCharsets.UTF_8));
  }

  private String signHmacSha256(String secret, String payload) {
    try {
      Mac mac = Mac.getInstance(HMAC_ALGORITHM);
      SecretKeySpec secretKey =
          new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
      mac.init(secretKey);
      byte[] digest = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
      StringBuilder hex = new StringBuilder(digest.length * 2);
      for (byte value : digest) {
        hex.append(String.format("%02x", value));
      }
      return hex.toString();
    } catch (GeneralSecurityException ex) {
      throw new IllegalStateException("Failed to validate request signature", ex);
    }
  }

  private static String normalizeSignature(String signature) {
    String trimmed = signature.trim();
    if (trimmed.regionMatches(true, 0, "sha256=", 0, 7)) {
      return trimmed.substring(7).toLowerCase();
    }
    return trimmed.toLowerCase();
  }

  private static void writeUnauthorized(HttpServletResponse response, String code, String message)
      throws IOException {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.setContentType("application/json");
    response.getWriter().write("{\"code\":\"" + code + "\",\"message\":\"" + message + "\"}");
  }
}
