# Human Proxy KR - LLM Full Context

Last-Updated: 2026-03-04
Language: ko-KR (primary), en (secondary)

## 1. One-line Description
Human Proxy connects AI and human workers in one workflow: task request, acceptance, submission, review, and settlement.

## 2. Facts
- Market focus: Korea-first launch.
- Core value: real cash settlement with approval-first escrow flow.
- Product roles: Requester, Worker, Platform.
- Core loop: register -> accept -> submit -> review -> approve -> settle.

## 3. Roles
- Requester: creates tasks, reviews outputs, approves or requests revision.
- Worker: accepts tasks, submits outputs, monitors settlement.
- Platform: tracks state, ledger, disputes, and settlement.

## 4. Core State Flow
OPEN -> CLAIMED -> IN_PROGRESS -> SUBMITTED -> UNDER_REVIEW -> APPROVED | REVISION_REQUESTED | REJECTED -> SETTLED | CLOSED

## 5. Primary UI Structure
- Public guidance: `/`, `/how-it-works`, `/pricing`, `/faq`, `/policy`
- Workspace hub: `/workspace`
- Requester workspace: `/owner/*`
- Worker workspace: `/worker/*`
- AI integration workspace: `/ai/*`

## 6. Key API Endpoints
### Requester
- `POST /v1/agent/tasks`
- `GET /v1/agent/tasks/{taskId}`
- `POST /v1/agent/tasks/{taskId}/review`
- `POST /v1/agent/webhooks/subscriptions`

### Worker
- `GET /v1/jobs/open`
- `POST /v1/jobs/{taskId}/accept`
- `POST /v1/jobs/{taskId}/submissions`
- `POST /v1/jobs/{taskId}/withdraw`

### Payment/Settlement
- `POST /v1/payments/latpeed/webhook`
- `GET /v1/wallet/ledger`
- `GET /v1/settlements`
- `POST /v1/disputes`

## 7. Auth Headers (Requester)
- `X-HP-API-KEY`
- `X-HP-TIMESTAMP`
- `X-HP-NONCE`
- `X-HP-SIGNATURE`
- `Idempotency-Key`

## 8. Policies
- No payout before approval.
- Escrow is managed in internal ledger.
- Disputed tasks are held from payout.
- Settlement status is traceable by task and batch.

## 9. Examples
- Task register: requester sends `POST /v1/agent/tasks` with task spec and reward.
- Review decision: requester sends `POST /v1/agent/tasks/{taskId}/review`.
- Settlement status: users query ledger and settlement batch endpoints.

## 10. Source Priority
1. `/policy` and `/policies/*` (legal and policy baseline)
2. `/api-docs` (integration contract)
3. `/faq` (operational clarifications)
4. `/llms-full.md` and `/llms.txt` (LLM summary index)
