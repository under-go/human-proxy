package com.humanproxy.api.domain.job.controller;

import com.humanproxy.api.domain.job.dto.OpenJobSummary;
import com.humanproxy.api.domain.job.dto.SubmissionPayload;
import com.humanproxy.api.domain.job.orchestrator.WorkerJobOrchestrator;
import com.humanproxy.api.shared.dto.ApiMessage;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/jobs")
public class WorkerJobController {

  private final WorkerJobOrchestrator orchestrator;

  public WorkerJobController(WorkerJobOrchestrator orchestrator) {
    this.orchestrator = orchestrator;
  }

  @GetMapping("/open")
  public ResponseEntity<List<OpenJobSummary>> openJobs() {
    return ResponseEntity.ok(orchestrator.openJobs());
  }

  @PostMapping("/{taskId}/accept")
  public ResponseEntity<ApiMessage> acceptJob(@PathVariable String taskId) {
    return ResponseEntity.ok(orchestrator.acceptJob(taskId));
  }

  @PostMapping("/{taskId}/submissions")
  public ResponseEntity<ApiMessage> submitJob(
      @PathVariable String taskId, @Valid @RequestBody SubmissionPayload payload) {
    return ResponseEntity.ok(orchestrator.submitJob(taskId, payload));
  }

  @PostMapping("/{taskId}/withdraw")
  public ResponseEntity<ApiMessage> withdrawJob(@PathVariable String taskId) {
    return ResponseEntity.ok(orchestrator.withdrawJob(taskId));
  }
}
