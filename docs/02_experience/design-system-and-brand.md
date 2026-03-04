---
version: 1.3.0
last_updated: 2026-03-04
owner: Human Proxy Design
status: approved
---

# Design System and Brand

관련 문서: `content-tone-and-copy-guidelines.md`에서 메시지 톤을 정의하고, 이 문서에서는 화면/시각 시스템 적용 기준을 다룹니다.

## 1. 브랜드 원칙
- 방향성: `신뢰 + 단순 + 생활형 친근함`
- 첫 인상 목표: "바로 이해되는 서비스"
- 기준 톤: 깔끔하고 밝은 한국형 실무 제품 감성(당근마켓 계열)
- 메시지 원칙: 과장보다 실무 맥락과 행동 유도에 집중

## 2. 시각 토큰
- Typography
  - Base: `Pretendard Variable` (`Pretendard` fallback)
  - Body: line-height `1.6`
  - Numeric emphasis: `JetBrains Mono`
- Color
  - Primary: `#FF6F0F`
  - Primary Strong: `#E66008`
  - Primary Soft: `#FFF3EB`
  - Neutral: `#F6F7F9`, `#FFFFFF`, `#EBEEF2`, `#111827`, `#6B7280`
- Radius/Shadow
  - Radius: `16/12/10`
  - Shadow: light depth only (`--shadow-soft`, `--shadow-card`)

## 3. 정보 밀도 규칙
- 랜딩은 "이해" 목적만 수행한다.
- Hero는 1문장 가치제안 + CTA 3개 이내.
- 랜딩에서 상세 정책/기술 설명을 장문으로 노출하지 않는다.
- 상세 정보는 `/how-it-works`, `/policy`, `/api-docs`로 분리한다.
- 역할 운영 화면은 `/workspace` 허브를 공통 진입점으로 사용한다.

## 4. CTA 계층 규칙
- Primary CTA: 페이지의 가장 중요한 다음 행동 1개
- Secondary CTA: 보조 행동 1개
- Tertiary CTA: 참고/상세 이동 링크
- 대시보드 상단에 최소 `Primary + Secondary`를 고정한다.
- 모든 작업공간 화면에서 `작업공간 홈(/workspace)` 복귀 경로를 상시 제공한다.

## 5. 컴포넌트 규약
- Core: `PageFrame`, `Surface`, `DataTable`, `StatusPill`
- Utility: `Checklist`, `InlineNote`, `TokenList`, `MetricStrip`
- 신규 페이지는 Core 조합으로 시작하고, 커스텀 레이아웃은 근거가 있을 때만 추가한다.

## 6. UX 카피 규칙
- 버튼은 행동형 동사로 작성한다.
  - 예: `의뢰 시작하기`, `검토함 열기`, `작업 수락`
- 문구는 "현재 상태 + 다음 행동"을 같이 전달한다.

## 7. 접근성/품질
- WCAG AA 대비
- 키보드 포커스 가시성 유지
- 모바일(<=720px)에서 CTA 가시성 우선

## 8. 이번 반영 범위
- 랜딩 정보 밀도 축소
- 역할별 CTA 강화
- 대시보드 CTA 명확화
