# Human Proxy Documentation Index

읽는 순서: **Overview → Product → Experience → Architecture → Payments → Quality → Governance → Growth**

> 본 인덱스는 `현재 KR v1 구현/운영`에 필요한 문서만 유지합니다.  
> 장기 계획/날짜성 실행기록/변동성 높은 운영 런북은 제거되었습니다.

## Overview
- [Project Charter](./00_overview/project-charter.md)
  - Human Proxy KR v1의 목표, 범위, 성공 기준을 정의합니다.
- [Glossary](./00_overview/glossary.md)
  - 팀/AI Agent/운영이 공통으로 사용하는 용어를 표준화합니다.

## Product
- [Personas and Journeys](./01_product/personas-and-journeys.md)
  - AI 도입자/의뢰자/작업자의 핵심 여정을 설계합니다.
- [Service Scope MVP](./01_product/service-scope-mvp.md)
  - MVP 포함/제외 범위와 우선순위를 명시합니다.
- [Task Policy Whitelist](./01_product/task-policy-whitelist.md)
  - 초기 허용 업무와 금지 업무, 심사 원칙을 정의합니다.
- [Pricing and Fee Policy](./01_product/pricing-and-fee-policy.md)
  - 거래 수수료, 최소 보수, 환불/분쟁 시 비용 정책을 정의합니다.

## Experience
- [Frontend IA and Wireframes KR v1](./02_experience/frontend-ia-and-wireframes-kr-v1.md)
  - 사용자군별 페이지 구조, 핵심 화면 와이어프레임, 상태 UX를 정의합니다.
- [UX AI Side](./02_experience/ux-ai-side.md)
  - AI 도입자 관점의 대시보드/작업/검토/웹훅 경험을 정의합니다.
- [UX Human Owner Side](./02_experience/ux-human-owner-side.md)
  - 비개발 의뢰자 관점의 작업 발주/검토/비용 관리 경험을 정의합니다.
- [UX Human Worker Side](./02_experience/ux-human-worker-side.md)
  - 작업자 관점의 탐색/수락/제출/정산 경험을 정의합니다.
- [Design System and Brand](./02_experience/design-system-and-brand.md)
  - 한국 타깃 신뢰형 브랜드 톤과 UI 시스템 원칙을 정의합니다.
- [Content Tone and Copy Guidelines](./02_experience/content-tone-and-copy-guidelines.md)
  - 정책/가이드/상태 메시지의 카피라이팅 기준을 정의합니다.

## Architecture
- [Domain Model and State Machine](./03_architecture/domain-model-and-state-machine.md)
  - 핵심 엔티티와 작업 상태 전이 규칙을 정의합니다.
- [API Contracts](./03_architecture/api-contracts.md)
  - 인증 헤더/엔드포인트/오류코드 표준을 명시합니다.
- [Auth, Security and Abuse Prevention](./03_architecture/auth-security-and-abuse-prevention.md)
  - 인증/권한/남용 방지/감사 전략을 정의합니다.
- [Data Model and Storage](./03_architecture/data-model-and-storage.md)
  - 원장 정합성 중심의 데이터 저장 전략을 정의합니다.

## Payments
- [Latpeed Integration](./04_payments/latpeed-integration.md)
  - Latpeed 충전/출금/웹훅 연동 표준을 정의합니다.
- [Escrow Ledger and Settlement](./04_payments/escrow-ledger-and-settlement.md)
  - 내부 예치 원장과 주간 정산 배치 흐름을 정의합니다.
- [Dispute, Refund and Risk Ops](./04_payments/dispute-refund-and-risk-ops.md)
  - 분쟁/환불/리스크 대응 운영 절차를 정의합니다.
- [Compliance and KYC Baseline](./04_payments/compliance-and-kyc-baseline.md)
  - 한국 v1 제한출시의 최소 본인확인/리스크 대응 기준만 정의합니다.

## Platform (Core Only)
- [Monorepo Layout](./05_platform-engineering/monorepo-layout.md)
  - 코드베이스 경계와 소유권 구조를 명시합니다.

## Quality
- [QA Strategy and Test Pyramid](./06_quality/qa-strategy-test-pyramid.md)
  - 테스트 피라미드와 품질 문턱값을 정의합니다.
- [Unit, Integration and Contract Tests](./06_quality/unit-integration-contract-tests.md)
  - 레이어별 테스트 책임과 도구를 명시합니다.
- [E2E Strategy](./06_quality/e2e-strategy.md)
  - 핵심 사용자 플로우 E2E 시나리오를 정의합니다.

## Governance
- [Engineering Principles](./07_governance/engineering-principles.md)
  - 팀의 기술 의사결정 원칙을 정의합니다.
- [AI Agent Collaboration Policy](./07_governance/ai-agent-collaboration-policy.md)
  - AI Agent 작업 절차와 승인 기준을 정의합니다.
- [Coding Conventions](./07_governance/coding-conventions.md)
  - 언어/리포 공통 코딩 컨벤션을 정의합니다.
- [Definition of Done](./07_governance/definition-of-done.md)
  - 완료 기준과 릴리즈 가능 조건을 정의합니다.

## Growth
- [SEO Strategy KR](./08_growth/seo-strategy-kr.md)
  - 한국 검색 생태계 중심 SEO 전략을 정의합니다.
- [LEO Strategy for LLM](./08_growth/leo-strategy-llm.md)
  - LLM 검색/인용 최적화를 위한 문서 구조를 정의합니다.

## Agent Enablement
- [Integration Quickstart](./09_agent-enablement/integration-quickstart.md)
  - AI 도입자가 Human Proxy를 빠르게 연동하기 위한 최소 실행 경로를 제공합니다.
- [Skills Pack for AI 도입자](./09_agent-enablement/skills-pack-for-ai-owner.md)
  - 작업 등록/추적/검토/정산 모니터링을 Skill 단위로 정의합니다.
- [Agent Site Context Brief](./09_agent-enablement/agent-site-context-brief.md)
  - 에이전트가 사이트 구조와 핵심 정책을 빠르게 파악할 수 있는 요약본입니다.
- [Agent System Prompt Template](./09_agent-enablement/agent-system-prompt-template.md)
  - 운영용 에이전트 시스템 프롬프트 템플릿을 제공합니다.
