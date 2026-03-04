# apps/web (Next.js)

## Purpose
- Public guidance pages (랜딩/정책/FAQ)
- Workspace product pages (의뢰자/작업자/AI 연동)

## Folder Structure
```text
apps/web/
  app/
    layout.tsx
    globals.css
    (public)/
      layout.tsx
      page.tsx
      how-it-works/
      pricing/
      faq/
      policy/
      policies/*
      login/
      signup/
      api-docs/
      status/
      trust/
    (workspace)/
      layout.tsx
      workspace/
      owner/*
      worker/*
      ai/*
  src/
    components/
      layout/
        site-header.tsx
        workspace-shell.tsx
        page-frame.tsx
        role-nav.ts
    lib/
      seo.ts
```

## Routing Rules
- URL은 route group 이름을 포함하지 않습니다.
  - `app/(public)/pricing/page.tsx` -> `/pricing`
  - `app/(workspace)/owner/dashboard/page.tsx` -> `/owner/dashboard`
- 안내 페이지는 `(public)` 아래에만 둡니다.
- 운영/대시보드 페이지는 `(workspace)` 아래에만 둡니다.
- `(public)`은 상단 헤더, `(workspace)`는 사이드바 셸을 사용합니다.

## Import Rules
- 공통 UI import는 alias를 사용합니다.
  - `@/components/layout/page-frame`
  - `@/components/layout/role-nav`
  - `@/components/layout/site-header`
- 상대경로 기반 깊은 import(`../../../`)는 새 코드에서 금지합니다.

## Testing stack
- Vitest + RTL
- Playwright (smoke + full E2E)

## Commands
- `npm ci`
- `npm run lint`
- `npm run test -- --run`
- `npm run build`
- `npm run e2e -- -g "@smoke"`

## Local API Bridge (폼 연동)
`/api/*` route handler가 백엔드(`apps/api`)로 요청을 프록시합니다.
환경 변수 샘플은 `.env.example`을 참고하세요.

- `HUMAN_PROXY_API_BASE_URL` (default: `http://127.0.0.1:8080`)
- `HUMAN_PROXY_AGENT_API_KEY` (default: `hp_test_key`)
- `HUMAN_PROXY_AGENT_SIGNING_SECRET` (default: `hp-dev-signing-secret`)
- `HUMAN_PROXY_WORKER_BEARER_TOKEN` (default: `demo-worker-token`)

백엔드와 함께 실행하면 `/owner/tasks/new`, `/ai/tasks/new`, `/worker/jobs/[taskId]`, `/worker/submissions/[submissionId]`에서
실제 API 호출이 동작합니다.
