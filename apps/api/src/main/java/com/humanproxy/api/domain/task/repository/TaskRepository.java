package com.humanproxy.api.domain.task.repository;

import com.humanproxy.api.domain.task.model.TaskEntity;
import com.humanproxy.api.domain.task.model.TaskStatus;
import java.util.List;
import java.util.Optional;

public interface TaskRepository {

  void save(TaskEntity task);

  Optional<TaskEntity> findById(String taskId);

  List<TaskEntity> findByStatus(TaskStatus status);

  void updateStatus(String taskId, TaskStatus status);
}
