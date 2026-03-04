package com.humanproxy.api.domain.job.orchestrator;

import com.humanproxy.api.domain.job.dto.OpenJobSummary;
import com.humanproxy.api.domain.job.dto.SubmissionPayload;
import com.humanproxy.api.domain.job.service.WorkerJobService;
import com.humanproxy.api.shared.dto.ApiMessage;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class WorkerJobOrchestrator {

  private final WorkerJobService workerJobService;

  public WorkerJobOrchestrator(WorkerJobService workerJobService) {
    this.workerJobService = workerJobService;
  }

  public List<OpenJobSummary> openJobs() {
    return workerJobService.listOpenJobs();
  }

  public ApiMessage acceptJob(String taskId) {
    return workerJobService.acceptJob(taskId);
  }

  public ApiMessage submitJob(String taskId, SubmissionPayload payload) {
    return workerJobService.submitJob(taskId, payload);
  }

  public ApiMessage withdrawJob(String taskId) {
    return workerJobService.withdrawJob(taskId);
  }
}
