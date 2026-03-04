package com.humanproxy.api.domain.payment.repository;

import com.humanproxy.api.domain.payment.dto.LedgerEntry;
import com.humanproxy.api.domain.payment.dto.SettlementSummary;
import java.util.List;

public interface PaymentRepository {

  boolean saveWebhookEvent(String eventId);

  List<LedgerEntry> findLedgerEntries();

  List<SettlementSummary> findSettlements();

  String createDispute(String taskId);
}
