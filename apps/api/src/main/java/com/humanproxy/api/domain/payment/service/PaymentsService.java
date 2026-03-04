package com.humanproxy.api.domain.payment.service;

import com.humanproxy.api.domain.payment.dto.DisputeCreateRequest;
import com.humanproxy.api.domain.payment.dto.DisputeCreateResponse;
import com.humanproxy.api.domain.payment.dto.LatpeedWebhookPayload;
import com.humanproxy.api.domain.payment.dto.LatpeedWebhookResponse;
import com.humanproxy.api.domain.payment.dto.LedgerEntry;
import com.humanproxy.api.domain.payment.dto.SettlementSummary;
import com.humanproxy.api.domain.payment.repository.PaymentRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PaymentsService {

  private final PaymentRepository paymentRepository;

  public PaymentsService(PaymentRepository paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  public LatpeedWebhookResponse latpeedWebhook(LatpeedWebhookPayload payload) {
    String eventId = payload == null || payload.eventId() == null ? "" : payload.eventId();
    boolean accepted = paymentRepository.saveWebhookEvent(eventId);
    return new LatpeedWebhookResponse(accepted ? "accepted" : "duplicate", eventId);
  }

  public List<LedgerEntry> walletLedger() {
    return paymentRepository.findLedgerEntries();
  }

  public List<SettlementSummary> settlements() {
    return paymentRepository.findSettlements();
  }

  public DisputeCreateResponse createDispute(DisputeCreateRequest request) {
    String disputeId = paymentRepository.createDispute(request.taskId());
    return new DisputeCreateResponse("OPEN", disputeId);
  }
}
