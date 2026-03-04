package com.humanproxy.api.domain.task.dto;

import jakarta.validation.constraints.NotBlank;

public record ReviewDecision(@NotBlank String decision, String reasonCode, String comment) {}
