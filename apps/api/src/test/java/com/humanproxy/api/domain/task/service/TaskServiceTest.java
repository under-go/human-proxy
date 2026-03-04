package com.humanproxy.api.domain.task.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.humanproxy.api.domain.task.dto.ReviewDecision;
import com.humanproxy.api.domain.task.dto.TaskCreateRequest;
import com.humanproxy.api.domain.task.dto.TaskCreateResponse;
import com.humanproxy.api.domain.task.dto.TaskReward;
import com.humanproxy.api.domain.task.dto.TaskSpec;
import com.humanproxy.api.domain.task.dto.TaskSummary;
import com.humanproxy.api.domain.task.model.TaskStatus;
import com.humanproxy.api.domain.task.repository.InMemoryTaskRepository;
import com.humanproxy.api.domain.task.repository.InMemoryWebhookSubscriptionRepository;
import com.humanproxy.api.shared.dto.ApiMessage;
import java.time.OffsetDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TaskServiceTest {

  private TaskService taskService;

  @BeforeEach
  void setUp() {
    taskService =
        new TaskService(new InMemoryTaskRepository(), new InMemoryWebhookSubscriptionRepository());
  }

  @Test
  void createTaskShouldPersistSummaryWithMetadata() {
    TaskCreateRequest request =
        new TaskCreateRequest(
            new TaskSpec(
                "서울 3개 지점 운영시간 조사",
                "지점별 운영시간 표",
                "research",
                OffsetDateTime.parse("2026-03-10T18:00:00+09:00")),
            new TaskReward(30000, 4500));

    TaskCreateResponse response = taskService.createTask(request);
    TaskSummary summary = taskService.getTask(response.taskId()).orElseThrow();

    assertEquals(TaskStatus.OPEN, summary.status());
    assertEquals(30000, summary.reward().amountKrw());
    assertEquals("research", summary.metadata().get("category"));
    assertEquals("서울 3개 지점 운영시간 조사", summary.metadata().get("prompt"));
  }

  @Test
  void reviewTaskShouldUpdateStatusWhenDecisionIsValid() {
    TaskCreateResponse created =
        taskService.createTask(
            new TaskCreateRequest(
                new TaskSpec(
                    "지점 대기시간 확인",
                    "텍스트 요약",
                    "field",
                    OffsetDateTime.parse("2026-03-12T09:00:00+09:00")),
                new TaskReward(12000, 1000)));

    ApiMessage message =
        taskService.reviewTask(
            created.taskId(),
            new ReviewDecision("APPROVED", "QUALITY_OK", "기준 충족"));

    TaskSummary summary = taskService.getTask(created.taskId()).orElseThrow();

    assertEquals("REVIEW_APPLIED", message.code());
    assertEquals(TaskStatus.APPROVED, summary.status());
  }

  @Test
  void reviewTaskShouldRejectInvalidDecision() {
    TaskCreateResponse created =
        taskService.createTask(
            new TaskCreateRequest(
                new TaskSpec(
                    "테스트 작업",
                    "테스트 결과",
                    "verification",
                    OffsetDateTime.parse("2026-03-13T09:00:00+09:00")),
                new TaskReward(9000, 500)));

    ApiMessage message =
        taskService.reviewTask(created.taskId(), new ReviewDecision("INVALID", null, null));

    assertEquals("REVIEW_DECISION_INVALID", message.code());
    assertTrue(message.message().contains("Unsupported review decision"));
  }
}
