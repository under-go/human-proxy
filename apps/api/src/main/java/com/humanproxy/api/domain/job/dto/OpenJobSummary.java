package com.humanproxy.api.domain.job.dto;

import java.time.OffsetDateTime;

public record OpenJobSummary(String taskId, long rewardKrw, OffsetDateTime deadlineAt) {}
