package com.humanproxy.api.domain.task.controller;

import com.humanproxy.api.domain.task.dto.ReviewDecision;
import com.humanproxy.api.domain.task.dto.TaskCreateRequest;
import com.humanproxy.api.domain.task.dto.TaskCreateResponse;
import com.humanproxy.api.domain.task.orchestrator.AgentTaskOrchestrator;
import com.humanproxy.api.shared.dto.ApiMessage;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/agent")
public class AgentTaskController {

  private final AgentTaskOrchestrator orchestrator;

  public AgentTaskController(AgentTaskOrchestrator orchestrator) {
    this.orchestrator = orchestrator;
  }

  @PostMapping("/tasks")
  public ResponseEntity<TaskCreateResponse> createTask(@Valid @RequestBody TaskCreateRequest request) {
    return ResponseEntity.ok(orchestrator.createTask(request));
  }

  @GetMapping("/tasks/{taskId}")
  public ResponseEntity<?> getTask(@PathVariable String taskId) {
    return orchestrator
        .getTask(taskId)
        .<ResponseEntity<?>>map(ResponseEntity::ok)
        .orElseGet(
            () -> ResponseEntity.status(404).body(new ApiMessage("TASK_NOT_FOUND", "Task not found")));
  }

  @PostMapping("/tasks/{taskId}/review")
  public ResponseEntity<ApiMessage> reviewTask(
      @PathVariable String taskId, @Valid @RequestBody ReviewDecision decision) {
    return ResponseEntity.ok(orchestrator.reviewTask(taskId, decision));
  }

  @PostMapping("/webhooks/subscriptions")
  public ResponseEntity<Map<String, String>> subscribeWebhook(
      @RequestBody Map<String, String> request) {
    return ResponseEntity.ok(orchestrator.subscribeWebhook(request));
  }
}
