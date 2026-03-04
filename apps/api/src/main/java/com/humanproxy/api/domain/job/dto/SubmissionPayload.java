package com.humanproxy.api.domain.job.dto;

import jakarta.validation.constraints.NotBlank;

public record SubmissionPayload(@NotBlank String text, String imageUrl) {}
