package com.humanproxy.api.domain.task.repository;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryWebhookSubscriptionRepository implements WebhookSubscriptionRepository {

  private final List<String> subscriptions = new CopyOnWriteArrayList<>();

  @Override
  public void subscribe(String url) {
    subscriptions.add(url);
  }
}
