---
version: 1.3.0
last_updated: 2026-03-04
owner: Human Proxy Product+Design+Frontend
status: approved
---

# Frontend IA and Wireframes KR v1

## 1. 목적
- URL 직접 진입 시 첫 화면(`/`)은 "제품 이해"에만 집중한다.
- 정보 과적재를 줄이고 역할별 첫 행동(CTA)을 명확히 제시한다.
- 상세 정책/기술 정보는 별도 페이지로 분리한다.

## 2. IA 원칙
- 전역 구조를 `안내 영역`과 `작업공간 영역`으로 분리한다.
- 안내 헤더: `서비스 소개`, `요금`, `FAQ`, `정책`
- 작업공간 전환: `/workspace` 허브에서만 수행한다.
- 작업공간 사이드바: `현재 작업공간`, `핵심 메뉴`, `지갑 요약`, `프로필`, `← 홈으로 이동`
- 랜딩: 가치제안 1문장 + 역할별 CTA
- 대시보드: 오늘 해야 할 일 + 다음 행동 CTA
- 상세: 작업 수행에 꼭 필요한 정보만

## 3. 라우트 구조

### 3.1 공용
- `/` 랜딩(설명 최소)
- `/workspace` 작업공간 허브(역할 선택)
- `/how-it-works`
- `/pricing`
- `/faq`
- `/policy`
- `/policies/terms`, `/policies/privacy`, `/policies/refund`, `/policies/task-policy`
- `/login`, `/signup`

### 3.2 AI
- `/ai/dashboard`
- `/ai/tasks`, `/ai/tasks/new`, `/ai/tasks/[taskId]`
- `/ai/reviews`, `/ai/wallet`
- 고급: `/ai/keys`, `/ai/webhooks`, `/ai/disputes`

### 3.3 AI 도입 담당자(의뢰자)
- `/owner/dashboard`
- `/owner/tasks/new`, `/owner/tasks/[taskId]`
- `/owner/reviews`, `/owner/wallet`
- 고급: `/owner/disputes`, `/owner/settings`

### 3.4 작업자
- `/worker/jobs`, `/worker/jobs/[taskId]`
- `/worker/submissions/[submissionId]`
- `/worker/earnings`
- 고급: `/worker/disputes`, `/worker/profile`

## 4. CTA 맵(핵심)
- `/`:
  - Primary `의뢰 시작하기` -> `/owner/tasks/new`
  - Secondary `작업 시작하기` -> `/worker/jobs`
  - Tertiary `AI 연동 시작` -> `/api-docs`
- `/workspace`:
  - Primary `오너 대시보드` -> `/owner/dashboard`
  - Secondary `작업자 화면` -> `/worker/jobs`
  - Tertiary `AI 연동 화면` -> `/ai/dashboard`
- `/ai/dashboard`:
  - Primary `새 작업 등록` -> `/ai/tasks/new`
  - Secondary `검토함 열기` -> `/ai/reviews`
- `/owner/dashboard`:
  - Primary `새 작업 만들기` -> `/owner/tasks/new`
  - Secondary `검토함 열기` -> `/owner/reviews`
- `/worker/jobs`:
  - Primary `추천 일감 보기` -> 목록 첫 카드
  - Secondary `정산 보기` -> `/worker/earnings`

## 5. 와이어프레임 (간소화)

### 5.1 랜딩 `/`
```text
[제품 목적 1문장]
[의뢰 시작하기] [작업 시작하기] [AI 연동 보기]
[역할 카드 3개: AI / AI 도입 담당자 / 작업자]
[신뢰 원칙 요약 + 정책 링크]
```

### 5.2 작업공간 허브 `/workspace`
```text
[작업공간 설명]
[오너 대시보드] [작업자 화면] [AI 연동 화면]
[길 찾기 팁: 역할 전환은 이 허브에서만 수행]
```

### 5.3 역할 대시보드
```text
[사이드바: 현재 작업공간 카드]
[사이드바: 핵심 메뉴]
[사이드바: 지갑 요약 카드]
[사이드바: 프로필 블록]
[사이드바 하단: ← 홈으로 이동]
[오늘 해야 할 일 3개]
[최근 작업 표/카드]
[고급 운영 링크]
```

### 5.4 작업 생성/수행
```text
[필수 입력]
[즉시 행동 CTA]
[보조 정책/정산 노트]
```

## 6. 사용자 플로우(구체)
- AI: 랜딩/직접진입 -> AI 대시보드 -> 새 작업 등록 -> 검토함 -> 승인 -> 정산 확인
- AI 도입 담당자: 랜딩 -> 의뢰 시작하기 -> 작업 생성 -> 검토함 -> 지갑
- 작업자: 랜딩 -> 작업 시작하기 -> 일감 상세 -> 수락 -> 제출 -> 정산

## 7. QA 인수 기준
- 랜딩 첫 화면에서 3개 역할 CTA를 스크롤 없이 확인 가능
- 각 대시보드 첫 화면에서 Primary/Secondary CTA가 명확히 구분됨
- 핵심 플로우에서 사용자가 다음 행동을 찾기 위해 메뉴 탐색을 강제받지 않음
