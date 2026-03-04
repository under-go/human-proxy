package com.humanproxy.api.domain.job.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import com.humanproxy.api.domain.job.dto.SubmissionPayload;
import com.humanproxy.api.domain.job.repository.InMemoryWorkerJobRepository;
import com.humanproxy.api.domain.task.dto.TaskReward;
import com.humanproxy.api.domain.task.model.TaskEntity;
import com.humanproxy.api.domain.task.model.TaskStatus;
import com.humanproxy.api.domain.task.repository.InMemoryTaskRepository;
import java.time.OffsetDateTime;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WorkerJobServiceTest {

  private WorkerJobService workerJobService;
  private InMemoryTaskRepository taskRepository;
  private static final String TASK_ID = "task-test-1";

  @BeforeEach
  void setUp() {
    taskRepository = new InMemoryTaskRepository();
    taskRepository.save(
        new TaskEntity(
            TASK_ID,
            TaskStatus.OPEN,
            new TaskReward(10000, 1500),
            OffsetDateTime.parse("2026-03-20T10:00:00+09:00"),
            Map.of("category", "research")));

    workerJobService = new WorkerJobService(new InMemoryWorkerJobRepository(taskRepository));
  }

  @Test
  void listOpenJobsShouldExposeOpenTasks() {
    assertFalse(workerJobService.listOpenJobs().isEmpty());
    assertEquals(TASK_ID, workerJobService.listOpenJobs().getFirst().taskId());
  }

  @Test
  void acceptJobShouldMoveTaskToClaimed() {
    workerJobService.acceptJob(TASK_ID);
    assertEquals(TaskStatus.CLAIMED, taskRepository.findById(TASK_ID).orElseThrow().status());
  }

  @Test
  void submitJobShouldMoveTaskToSubmitted() {
    workerJobService.submitJob(TASK_ID, new SubmissionPayload("제출 텍스트", "https://example.com/1.png"));
    assertEquals(TaskStatus.SUBMITTED, taskRepository.findById(TASK_ID).orElseThrow().status());
  }

  @Test
  void withdrawJobShouldMoveTaskBackToOpen() {
    workerJobService.acceptJob(TASK_ID);
    workerJobService.withdrawJob(TASK_ID);
    assertEquals(TaskStatus.OPEN, taskRepository.findById(TASK_ID).orElseThrow().status());
  }
}
