package com.humanproxy.api.domain.platform.orchestrator;

import com.humanproxy.api.domain.platform.service.HealthService;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class HealthOrchestrator {

  private final HealthService healthService;

  public HealthOrchestrator(HealthService healthService) {
    this.healthService = healthService;
  }

  public Map<String, String> health() {
    return healthService.health();
  }
}
