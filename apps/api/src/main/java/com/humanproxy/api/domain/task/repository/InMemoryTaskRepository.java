package com.humanproxy.api.domain.task.repository;

import com.humanproxy.api.domain.task.model.TaskEntity;
import com.humanproxy.api.domain.task.model.TaskStatus;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryTaskRepository implements TaskRepository {

  private final Map<String, TaskEntity> tasks = new ConcurrentHashMap<>();

  @Override
  public void save(TaskEntity task) {
    tasks.put(task.taskId(), task);
  }

  @Override
  public Optional<TaskEntity> findById(String taskId) {
    return Optional.ofNullable(tasks.get(taskId));
  }

  @Override
  public List<TaskEntity> findByStatus(TaskStatus status) {
    return tasks.values().stream().filter((task) -> task.status() == status).toList();
  }

  @Override
  public void updateStatus(String taskId, TaskStatus status) {
    tasks.computeIfPresent(
        taskId,
        (key, task) -> new TaskEntity(task.taskId(), status, task.reward(), task.deadlineAt(), task.metadata()));
  }
}
