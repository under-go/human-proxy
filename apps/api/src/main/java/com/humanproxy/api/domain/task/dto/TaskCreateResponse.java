package com.humanproxy.api.domain.task.dto;

import com.humanproxy.api.domain.task.model.TaskStatus;
import java.time.OffsetDateTime;

public record TaskCreateResponse(String taskId, TaskStatus status, OffsetDateTime createdAt) {}
