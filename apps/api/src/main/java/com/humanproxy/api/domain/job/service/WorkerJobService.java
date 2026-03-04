package com.humanproxy.api.domain.job.service;

import com.humanproxy.api.domain.job.dto.OpenJobSummary;
import com.humanproxy.api.domain.job.dto.SubmissionPayload;
import com.humanproxy.api.domain.job.repository.WorkerJobRepository;
import com.humanproxy.api.shared.dto.ApiMessage;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class WorkerJobService {

  private final WorkerJobRepository workerJobRepository;

  public WorkerJobService(WorkerJobRepository workerJobRepository) {
    this.workerJobRepository = workerJobRepository;
  }

  public List<OpenJobSummary> listOpenJobs() {
    return workerJobRepository.findOpenJobs();
  }

  public ApiMessage acceptJob(String taskId) {
    workerJobRepository.markAccepted(taskId);
    return new ApiMessage("JOB_ACCEPTED", "Task accepted: " + taskId);
  }

  public ApiMessage submitJob(String taskId, SubmissionPayload payload) {
    workerJobRepository.saveSubmission(taskId, payload);
    return new ApiMessage("SUBMISSION_RECEIVED", "Submission stored for task " + taskId);
  }

  public ApiMessage withdrawJob(String taskId) {
    workerJobRepository.markWithdrawn(taskId);
    return new ApiMessage("JOB_WITHDRAWN", "Task withdrawn: " + taskId);
  }
}
