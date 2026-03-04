package com.humanproxy.api.domain.task.model;

public enum TaskStatus {
  OPEN,
  CLAIMED,
  IN_PROGRESS,
  SUBMITTED,
  UNDER_REVIEW,
  APPROVED,
  REVISION_REQUESTED,
  REJECTED,
  SETTLED,
  CLOSED
}
