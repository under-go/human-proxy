package com.humanproxy.api.domain.job.repository;

import com.humanproxy.api.domain.job.dto.OpenJobSummary;
import com.humanproxy.api.domain.job.dto.SubmissionPayload;
import com.humanproxy.api.domain.task.model.TaskStatus;
import com.humanproxy.api.domain.task.repository.TaskRepository;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryWorkerJobRepository implements WorkerJobRepository {

  private final TaskRepository taskRepository;
  private final Map<String, SubmissionPayload> submissions = new ConcurrentHashMap<>();

  public InMemoryWorkerJobRepository(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  @Override
  public List<OpenJobSummary> findOpenJobs() {
    List<OpenJobSummary> dynamicJobs =
        taskRepository.findByStatus(TaskStatus.OPEN).stream()
            .map(
                (task) -> new OpenJobSummary(task.taskId(), task.reward().amountKrw(), task.deadlineAt()))
            .toList();

    if (!dynamicJobs.isEmpty()) {
      return dynamicJobs;
    }
    return List.of(
        new OpenJobSummary(
            "example-task-1", 10000, OffsetDateTime.parse("2026-03-10T09:00:00+09:00")));
  }

  @Override
  public void markAccepted(String taskId) {
    taskRepository.updateStatus(taskId, TaskStatus.CLAIMED);
  }

  @Override
  public void saveSubmission(String taskId, SubmissionPayload payload) {
    submissions.put(taskId, payload);
    taskRepository.updateStatus(taskId, TaskStatus.SUBMITTED);
  }

  @Override
  public void markWithdrawn(String taskId) {
    taskRepository.updateStatus(taskId, TaskStatus.OPEN);
  }
}
