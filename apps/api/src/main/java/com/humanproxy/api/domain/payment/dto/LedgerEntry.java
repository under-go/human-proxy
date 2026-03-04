package com.humanproxy.api.domain.payment.dto;

public record LedgerEntry(String type, long amountKrw, String status) {}
