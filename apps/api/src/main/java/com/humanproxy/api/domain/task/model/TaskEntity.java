package com.humanproxy.api.domain.task.model;

import com.humanproxy.api.domain.task.dto.TaskReward;
import java.time.OffsetDateTime;
import java.util.Map;

public record TaskEntity(
    String taskId,
    TaskStatus status,
    TaskReward reward,
    OffsetDateTime deadlineAt,
    Map<String, Object> metadata) {}
