package com.humanproxy.api.domain.platform.controller;

import com.humanproxy.api.domain.platform.orchestrator.HealthOrchestrator;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
public class HealthController {

  private final HealthOrchestrator orchestrator;

  public HealthController(HealthOrchestrator orchestrator) {
    this.orchestrator = orchestrator;
  }

  @GetMapping("/health")
  public Map<String, String> health() {
    return orchestrator.health();
  }
}
