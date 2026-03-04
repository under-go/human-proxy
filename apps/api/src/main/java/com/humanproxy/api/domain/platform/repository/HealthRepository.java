package com.humanproxy.api.domain.platform.repository;

import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class HealthRepository {

  public Map<String, String> readHealth() {
    return Map.of("status", "ok", "service", "human-proxy-api");
  }
}
