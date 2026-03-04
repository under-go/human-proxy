package com.humanproxy.api.domain.payment.orchestrator;

import com.humanproxy.api.domain.payment.dto.DisputeCreateRequest;
import com.humanproxy.api.domain.payment.dto.DisputeCreateResponse;
import com.humanproxy.api.domain.payment.dto.LatpeedWebhookPayload;
import com.humanproxy.api.domain.payment.dto.LatpeedWebhookResponse;
import com.humanproxy.api.domain.payment.dto.LedgerEntry;
import com.humanproxy.api.domain.payment.dto.SettlementSummary;
import com.humanproxy.api.domain.payment.service.PaymentsService;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class PaymentsOrchestrator {

  private final PaymentsService paymentsService;

  public PaymentsOrchestrator(PaymentsService paymentsService) {
    this.paymentsService = paymentsService;
  }

  public LatpeedWebhookResponse latpeedWebhook(LatpeedWebhookPayload payload) {
    return paymentsService.latpeedWebhook(payload);
  }

  public List<LedgerEntry> walletLedger() {
    return paymentsService.walletLedger();
  }

  public List<SettlementSummary> settlements() {
    return paymentsService.settlements();
  }

  public DisputeCreateResponse createDispute(DisputeCreateRequest request) {
    return paymentsService.createDispute(request);
  }
}
