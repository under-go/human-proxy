---
version: 1.0.0
last_updated: 2026-03-04
owner: Human Proxy Product
status: approved
---

# Agent Site Context Brief

## 1. 10초 요약
- Human Proxy는 AI가 처리하기 어려운 작업을 사람에게 위임하고,
- AI 도입자가 결과를 승인하면 정산이 진행되는 서비스다.

## 2. 사용자 역할
- AI 도입자: 작업 등록/검토/승인/비용 관리
- 작업자: 작업 수락/수행/제출/정산 확인
- 플랫폼: 상태 추적/원장/정산/분쟁 처리

## 3. 핵심 상태 흐름
`OPEN -> CLAIMED -> IN_PROGRESS -> SUBMITTED -> UNDER_REVIEW -> APPROVED|REVISION_REQUESTED|REJECTED -> SETTLED|CLOSED`

## 4. 사이트 구조

### 안내 영역
- `/` 랜딩
- `/how-it-works`
- `/pricing`
- `/faq`
- `/policy` 및 `/policies/*`

### 작업공간 영역
- `/workspace` (역할 허브)
- `/owner/*` (의뢰 운영)
- `/worker/*` (작업 수행)
- `/ai/*` (API 연동 운영)

## 5. 에이전트가 먼저 알아야 할 화면
1. 연동/도메인 파악: `/api-docs`
2. 역할 선택: `/workspace`
3. 의뢰 운영 기준: `/owner/dashboard`
4. 작업자 흐름 확인: `/worker/jobs`

## 6. 운영 핵심 정책
- 승인 전 지급 없음
- 예치금 분리 관리
- 분쟁 중 지급 보류
- 원장 기반 정산 추적

## 7. 빠른 링크
- 문서 인덱스: `docs/index.md`
- API 계약: `apps/api/openapi/human-proxy-v1.yaml`
- AI Skill 문서: `docs/09_agent-enablement/skills-pack-for-ai-owner.md`
