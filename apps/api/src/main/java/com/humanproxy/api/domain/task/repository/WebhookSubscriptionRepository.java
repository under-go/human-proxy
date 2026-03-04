package com.humanproxy.api.domain.task.repository;

public interface WebhookSubscriptionRepository {

  void subscribe(String url);
}
