plugins {
  id("java")
  id("org.springframework.boot") version "3.4.5"
  id("io.spring.dependency-management") version "1.1.7"
}

group = "com.humanproxy"
version = "0.1.0"

java {
  toolchain {
    languageVersion.set(JavaLanguageVersion.of(21))
  }
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-validation")
  implementation("org.springframework.boot:spring-boot-starter-actuator")
  implementation("org.springframework.boot:spring-boot-starter-jdbc")
  implementation("org.flywaydb:flyway-core")

  runtimeOnly("org.postgresql:postgresql")
  runtimeOnly("org.flywaydb:flyway-database-postgresql")
  runtimeOnly("com.h2database:h2")

  testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
  useJUnitPlatform()
}
