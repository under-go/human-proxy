package com.humanproxy.api.domain.task.service;

import com.humanproxy.api.domain.task.dto.ReviewDecision;
import com.humanproxy.api.domain.task.dto.TaskCreateRequest;
import com.humanproxy.api.domain.task.dto.TaskCreateResponse;
import com.humanproxy.api.domain.task.dto.TaskSummary;
import com.humanproxy.api.domain.task.model.TaskEntity;
import com.humanproxy.api.domain.task.model.TaskStatus;
import com.humanproxy.api.domain.task.repository.TaskRepository;
import com.humanproxy.api.domain.task.repository.WebhookSubscriptionRepository;
import com.humanproxy.api.shared.dto.ApiMessage;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

  private final TaskRepository taskRepository;
  private final WebhookSubscriptionRepository webhookSubscriptionRepository;

  public TaskService(
      TaskRepository taskRepository, WebhookSubscriptionRepository webhookSubscriptionRepository) {
    this.taskRepository = taskRepository;
    this.webhookSubscriptionRepository = webhookSubscriptionRepository;
  }

  public TaskCreateResponse createTask(TaskCreateRequest request) {
    String taskId = UUID.randomUUID().toString();
    TaskEntity entity =
        new TaskEntity(
            taskId,
            TaskStatus.OPEN,
            request.reward(),
            request.spec().deadlineAt(),
            Map.of(
                "category", request.spec().category(),
                "prompt", request.spec().prompt(),
                "expectedOutput", request.spec().expectedOutput()));

    taskRepository.save(entity);
    return new TaskCreateResponse(taskId, TaskStatus.OPEN, OffsetDateTime.now());
  }

  public Optional<TaskSummary> getTask(String taskId) {
    return taskRepository.findById(taskId).map(this::toSummary);
  }

  public ApiMessage reviewTask(String taskId, ReviewDecision decision) {
    if (taskRepository.findById(taskId).isEmpty()) {
      return new ApiMessage("TASK_NOT_FOUND", "Task not found: " + taskId);
    }

    String decisionValue = decision.decision().trim().toUpperCase();
    TaskStatus targetStatus =
        switch (decisionValue) {
          case "APPROVED" -> TaskStatus.APPROVED;
          case "REVISION_REQUESTED" -> TaskStatus.REVISION_REQUESTED;
          case "REJECTED" -> TaskStatus.REJECTED;
          default -> null;
        };

    if (targetStatus == null) {
      return new ApiMessage("REVIEW_DECISION_INVALID", "Unsupported review decision: " + decision.decision());
    }

    taskRepository.updateStatus(taskId, targetStatus);
    return new ApiMessage("REVIEW_APPLIED", "Review applied: " + targetStatus.name());
  }

  public Map<String, String> subscribeWebhook(Map<String, String> request) {
    String url = request == null || request.get("url") == null ? "" : request.get("url");
    webhookSubscriptionRepository.subscribe(url);
    return Map.of("status", "subscribed", "url", url);
  }

  private TaskSummary toSummary(TaskEntity task) {
    return new TaskSummary(
        task.taskId(), task.status(), task.reward(), task.deadlineAt(), task.metadata());
  }
}
