package com.humanproxy.api.domain.job.repository;

import com.humanproxy.api.domain.job.dto.OpenJobSummary;
import com.humanproxy.api.domain.job.dto.SubmissionPayload;
import java.util.List;

public interface WorkerJobRepository {

  List<OpenJobSummary> findOpenJobs();

  void markAccepted(String taskId);

  void saveSubmission(String taskId, SubmissionPayload payload);

  void markWithdrawn(String taskId);
}
