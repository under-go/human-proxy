package com.humanproxy.api.domain.task.dto;

import jakarta.validation.constraints.Min;

public record TaskReward(@Min(1) long amountKrw, @Min(0) long feeKrw) {}
