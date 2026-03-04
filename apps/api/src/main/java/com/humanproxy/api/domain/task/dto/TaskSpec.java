package com.humanproxy.api.domain.task.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;

public record TaskSpec(
    @NotBlank String prompt,
    @NotBlank String expectedOutput,
    @NotBlank String category,
    @NotNull OffsetDateTime deadlineAt) {}
