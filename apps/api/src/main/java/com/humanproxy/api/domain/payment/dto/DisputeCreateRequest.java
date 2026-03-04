package com.humanproxy.api.domain.payment.dto;

import jakarta.validation.constraints.NotBlank;

public record DisputeCreateRequest(@NotBlank String taskId, @NotBlank String reason, String detail) {}
