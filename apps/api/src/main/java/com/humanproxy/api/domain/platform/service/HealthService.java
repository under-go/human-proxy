package com.humanproxy.api.domain.platform.service;

import com.humanproxy.api.domain.platform.repository.HealthRepository;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class HealthService {

  private final HealthRepository healthRepository;

  public HealthService(HealthRepository healthRepository) {
    this.healthRepository = healthRepository;
  }

  public Map<String, String> health() {
    return healthRepository.readHealth();
  }
}
