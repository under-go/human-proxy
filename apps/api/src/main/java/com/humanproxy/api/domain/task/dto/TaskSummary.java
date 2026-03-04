package com.humanproxy.api.domain.task.dto;

import com.humanproxy.api.domain.task.model.TaskStatus;
import java.time.OffsetDateTime;
import java.util.Map;

public record TaskSummary(
    String taskId,
    TaskStatus status,
    TaskReward reward,
    OffsetDateTime deadlineAt,
    Map<String, Object> metadata) {}
