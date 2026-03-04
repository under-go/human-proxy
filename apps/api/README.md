# apps/api (Spring Boot)

Planned responsibilities:
- Auth/API key
- Task/submission/review
- Payment/ledger/settlement
- Dispute and notifications

Code structure:
- `com.humanproxy.api.domain.task/*`
- `com.humanproxy.api.domain.job/*`
- `com.humanproxy.api.domain.payment/*`
- `com.humanproxy.api.domain.platform/*`
- `com.humanproxy.api.shared/*`

Layer rule (inside each domain):
- `controller -> orchestrator -> service -> repository`

Database modeling:
- Baseline schema SQL: `src/main/resources/db/migration/V1__baseline_schema.sql`
- Core tables: accounts/tasks/submissions/reviews/ledger/settlements/disputes

Testing stack:
- JUnit5 + Mockito
- SpringBootTest + Testcontainers
- OpenAPI + Contract tests

Commands:
- `./gradlew test --no-daemon`

Security env baseline:
- `HP_AGENT_SIGNING_SECRET`
- `HP_AGENT_ALLOWED_API_KEYS` (comma-separated)
- `HP_AGENT_TIMESTAMP_SKEW_SECONDS`
- `HP_LATPEED_SIGNING_SECRET`
