package com.humanproxy.api.domain.payment.controller;

import com.humanproxy.api.domain.payment.dto.DisputeCreateRequest;
import com.humanproxy.api.domain.payment.dto.DisputeCreateResponse;
import com.humanproxy.api.domain.payment.dto.LatpeedWebhookPayload;
import com.humanproxy.api.domain.payment.dto.LatpeedWebhookResponse;
import com.humanproxy.api.domain.payment.dto.LedgerEntry;
import com.humanproxy.api.domain.payment.dto.SettlementSummary;
import com.humanproxy.api.domain.payment.orchestrator.PaymentsOrchestrator;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class PaymentsController {

  private final PaymentsOrchestrator orchestrator;

  public PaymentsController(PaymentsOrchestrator orchestrator) {
    this.orchestrator = orchestrator;
  }

  @PostMapping("/payments/latpeed/webhook")
  public ResponseEntity<LatpeedWebhookResponse> latpeedWebhook(
      @RequestBody LatpeedWebhookPayload payload) {
    return ResponseEntity.ok(orchestrator.latpeedWebhook(payload));
  }

  @GetMapping("/wallet/ledger")
  public ResponseEntity<List<LedgerEntry>> walletLedger() {
    return ResponseEntity.ok(orchestrator.walletLedger());
  }

  @GetMapping("/settlements")
  public ResponseEntity<List<SettlementSummary>> settlements() {
    return ResponseEntity.ok(orchestrator.settlements());
  }

  @PostMapping("/disputes")
  public ResponseEntity<DisputeCreateResponse> createDispute(
      @Valid @RequestBody DisputeCreateRequest request) {
    return ResponseEntity.ok(orchestrator.createDispute(request));
  }
}
