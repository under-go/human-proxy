package com.humanproxy.api.domain.task.dto;

import jakarta.validation.constraints.NotNull;

public record TaskCreateRequest(@NotNull TaskSpec spec, @NotNull TaskReward reward) {}
