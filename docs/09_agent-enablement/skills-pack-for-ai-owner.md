---
version: 1.0.0
last_updated: 2026-03-04
owner: Human Proxy DX
status: approved
---

# Skills Pack for AI 도입자

## 1. 개요
- AI가 Human Proxy를 쓸 때 자주 반복되는 동작을 `Skill` 단위로 분리한다.
- 목표는 "작업 1건을 안정적으로 끝내는 자동 루프"를 만드는 것이다.

## 2. 추천 Skill 구성

### Skill A: `hp.create_task`
- 목적: 새로운 작업 등록
- 트리거: AI가 사람 수행이 필요한 과업을 인식했을 때
- API: `POST /v1/agent/tasks`
- 입력:
  - `prompt`
  - `expectedOutput`
  - `category`
  - `deadlineAt`
  - `reward.amountKrw`
  - `reward.feeKrw`
- 출력:
  - `taskId`
  - `status`

### Skill B: `hp.track_task_status`
- 목적: 작업 상태 추적
- 트리거: 등록 이후 주기적 모니터링 또는 웹훅 동기화
- API: `GET /v1/agent/tasks/{taskId}`
- 출력:
  - 현재 상태
  - 최신 제출 정보
  - 다음 필요 액션

### Skill C: `hp.review_task`
- 목적: 제출물 검토 후 승인/수정요청/거절
- 트리거: 상태가 `UNDER_REVIEW` 또는 `SUBMITTED`일 때
- API: `POST /v1/agent/tasks/{taskId}/review`
- 입력:
  - `decision` (`APPROVED` | `REVISION_REQUESTED` | `REJECTED`)
  - `reason`

### Skill D: `hp.subscribe_webhook`
- 목적: 이벤트 기반 상태 수신
- 트리거: 폴링 대신 자동화를 강화할 때
- API: `POST /v1/agent/webhooks/subscriptions`
- 입력:
  - `url`

### Skill E: `hp.monitor_settlement`
- 목적: 승인 이후 원장/정산 상태 모니터링
- API:
  - `GET /v1/wallet/ledger`
  - `GET /v1/settlements`

## 3. Skill 실행 순서 (권장)
1. `hp.create_task`
2. `hp.track_task_status` 또는 `hp.subscribe_webhook`
3. `hp.review_task`
4. `hp.monitor_settlement`

## 4. 운영 가드레일
- 인증 헤더 누락 시 재시도 전에 헤더 생성 로직부터 점검한다.
- `Idempotency-Key`는 같은 작업 생성 요청에 반드시 재사용한다.
- 검토 결정은 "합격 기준 체크 결과"와 함께 로그로 남긴다.
- 웹훅은 순서 보장을 가정하지 않고 이벤트 단위 멱등 처리한다.

## 5. 참고 파일
- 기계가독 Skill 정의: `agent-kit/skills/human-proxy-skills.yaml`
