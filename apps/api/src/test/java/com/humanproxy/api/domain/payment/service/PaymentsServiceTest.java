package com.humanproxy.api.domain.payment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.humanproxy.api.domain.payment.dto.DisputeCreateRequest;
import com.humanproxy.api.domain.payment.dto.DisputeCreateResponse;
import com.humanproxy.api.domain.payment.dto.LatpeedWebhookPayload;
import com.humanproxy.api.domain.payment.dto.LatpeedWebhookResponse;
import com.humanproxy.api.domain.payment.repository.InMemoryPaymentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PaymentsServiceTest {

  private PaymentsService paymentsService;

  @BeforeEach
  void setUp() {
    paymentsService = new PaymentsService(new InMemoryPaymentRepository());
  }

  @Test
  void latpeedWebhookShouldBeIdempotentByEventId() {
    LatpeedWebhookResponse first = paymentsService.latpeedWebhook(new LatpeedWebhookPayload("evt-1"));
    LatpeedWebhookResponse second = paymentsService.latpeedWebhook(new LatpeedWebhookPayload("evt-1"));

    assertEquals("accepted", first.status());
    assertEquals("duplicate", second.status());
    assertEquals("evt-1", second.eventId());
  }

  @Test
  void createDisputeShouldReturnDisputeIdAndOpenStatus() {
    DisputeCreateResponse response =
        paymentsService.createDispute(new DisputeCreateRequest("task-123", "품질 이슈", "기준 미충족"));

    assertEquals("OPEN", response.status());
    assertTrue(response.disputeId().startsWith("dsp-"));
    assertTrue(
        paymentsService.walletLedger().stream()
            .anyMatch((entry) -> "DISPUTE_HOLD".equals(entry.type()) && "OPEN".equals(entry.status())));
  }
}
