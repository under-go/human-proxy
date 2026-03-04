package com.humanproxy.api.domain.payment.repository;

import com.humanproxy.api.domain.payment.dto.LedgerEntry;
import com.humanproxy.api.domain.payment.dto.SettlementSummary;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryPaymentRepository implements PaymentRepository {

  private final Set<String> webhookEventIds = ConcurrentHashMap.newKeySet();
  private final List<LedgerEntry> ledgerEntries =
      new CopyOnWriteArrayList<>(
          new ArrayList<>(
              List.of(
                  new LedgerEntry("TOPUP", 50000, "COMPLETED"),
                  new LedgerEntry("ESCROW_HOLD", -10000, "LOCKED"))));
  private final List<SettlementSummary> settlements =
      new CopyOnWriteArrayList<>(
          new ArrayList<>(List.of(new SettlementSummary("weekly-2026w10", "PENDING"))));
  private final Map<String, String> disputes = new ConcurrentHashMap<>();

  @Override
  public boolean saveWebhookEvent(String eventId) {
    return webhookEventIds.add(eventId);
  }

  @Override
  public List<LedgerEntry> findLedgerEntries() {
    return ledgerEntries;
  }

  @Override
  public List<SettlementSummary> findSettlements() {
    return settlements;
  }

  @Override
  public String createDispute(String taskId) {
    String disputeId = "dsp-" + UUID.randomUUID();
    disputes.put(disputeId, taskId);
    ledgerEntries.add(new LedgerEntry("DISPUTE_HOLD", 0, "OPEN"));
    return disputeId;
  }
}
