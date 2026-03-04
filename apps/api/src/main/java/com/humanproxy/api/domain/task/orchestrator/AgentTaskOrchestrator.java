package com.humanproxy.api.domain.task.orchestrator;

import com.humanproxy.api.domain.task.dto.ReviewDecision;
import com.humanproxy.api.domain.task.dto.TaskCreateRequest;
import com.humanproxy.api.domain.task.dto.TaskCreateResponse;
import com.humanproxy.api.domain.task.dto.TaskSummary;
import com.humanproxy.api.domain.task.service.TaskService;
import com.humanproxy.api.shared.dto.ApiMessage;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class AgentTaskOrchestrator {

  private final TaskService taskService;

  public AgentTaskOrchestrator(TaskService taskService) {
    this.taskService = taskService;
  }

  public TaskCreateResponse createTask(TaskCreateRequest request) {
    return taskService.createTask(request);
  }

  public Optional<TaskSummary> getTask(String taskId) {
    return taskService.getTask(taskId);
  }

  public ApiMessage reviewTask(String taskId, ReviewDecision decision) {
    return taskService.reviewTask(taskId, decision);
  }

  public Map<String, String> subscribeWebhook(Map<String, String> request) {
    return taskService.subscribeWebhook(request);
  }
}
