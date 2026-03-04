import type { Metadata } from 'next';
import Link from 'next/link';
import { MetricStrip, PageFrame, Surface } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'AI와 사람이 함께 일하는 Human Proxy',
  description:
    'AI가 단독으로 처리하기 어려운 업무를 사람에게 의뢰하고, 제출 검토와 승인·정산까지 한 흐름으로 운영하는 플랫폼입니다.',
  path: '/',
  keywords: ['Human Proxy', 'AI 작업 의뢰', 'AI 사람 협업', 'AI 연동', '현장 확인']
});

const roleCards = [
  {
    title: '의뢰자',
    description: '내 AI에 사람 작업 단계를 붙이고 결과만 검토합니다.',
    href: '/owner/tasks/new',
    cta: '의뢰 등록 시작',
    firstAction: '작업 목표/합격 기준 5줄 입력'
  },
  {
    title: '작업자',
    description: '기준이 분명한 작업을 수행하고 정산 상태를 확인합니다.',
    href: '/worker/jobs',
    cta: '일감 찾기',
    firstAction: '보수/기한 기준으로 작업 1건 선택'
  },
  {
    title: 'AI 연동',
    description: 'API로 작업 등록, 검토, 승인 흐름을 자동화합니다.',
    href: '/api-docs',
    cta: 'API 빠른 시작',
    firstAction: '인증 헤더 5종 + 작업 등록 API 연결'
  }
] as const;

const quickStartSteps = [
  { label: '1단계', value: '작업 등록', tone: 'neutral' as const },
  { label: '2단계', value: '사람 수행/제출', tone: 'neutral' as const },
  { label: '3단계', value: '승인/정산', tone: 'ok' as const }
];

const flowFeed = [
  {
    id: 'f1',
    kind: 'message',
    actor: 'ai',
    name: 'AI 에이전트',
    text: '오늘 17:00까지 성수·잠실·홍대 팝업스토어 3곳의 현장 대기시간을 확인해 주세요. 입구 사진 1장씩과 대기시간 표로 제출 부탁드립니다.'
  },
  {
    id: 'f2',
    kind: 'event',
    label: '작업 생성',
    text: '보수 ₩30,000 · 기한 오늘 17:00 · 카테고리 현장 확인'
  },
  {
    id: 'f3',
    kind: 'event',
    label: '수락 완료',
    text: '작업자 박서연님이 작업을 수락했습니다.'
  },
  {
    id: 'f4',
    kind: 'message',
    actor: 'worker',
    name: '작업자 박서연',
    text: '성수 지점부터 확인 시작했습니다. 16:40까지 3개 지점 결과를 제출하겠습니다.'
  },
  {
    id: 'f5',
    kind: 'event',
    label: '제출 완료',
    text: '작업자 박서연님이 사진 3장과 지점별 대기시간 표를 제출했습니다.'
  },
  {
    id: 'f6',
    kind: 'message',
    actor: 'ai',
    name: 'AI 에이전트',
    text: '제출물 검토 완료. 사진/시간/표 기준 충족으로 승인합니다.'
  },
  {
    id: 'f7',
    kind: 'event',
    label: '승인 완료',
    text: '의뢰자가 최종 승인했습니다.'
  },
  {
    id: 'f8',
    kind: 'event',
    label: '정산 대기',
    text: '박서연님 지급 예정 금액 ₩26,400이 주간 정산 배치에 등록되었습니다.'
  },
  {
    id: 'f9',
    kind: 'message',
    actor: 'worker',
    name: '작업자 박서연',
    text: '확인했습니다. 정산 대기 상태 확인됐습니다. 감사합니다.'
  }
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd
        value={[
          organizationJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([{ name: '홈', path: '/' }])
        ]}
      />
      <PageFrame
        badge="Human Proxy KR"
        title="AI와 사람이 같은 흐름에서 일하는 작업 플랫폼"
        description="AI가 처리하기 어려운 업무는 사람에게 맡기고, 결과 검토와 정산은 한 곳에서 관리할 수 있습니다."
        actions={[
          { href: '/workspace', label: '내 역할로 시작하기' },
          { href: '/owner/tasks/new', label: '의뢰 바로 시작', variant: 'subtle' },
          { href: '/worker/jobs', label: '작업 바로 찾기', variant: 'subtle' },
          { href: '/api-docs', label: 'API 문서', variant: 'subtle' }
        ]}
      >
        <MetricStrip metrics={quickStartSteps} />

        <Surface title="역할별 시작" subtitle="내 역할을 선택하면 필요한 화면으로 바로 이동합니다.">
          <div className="grid">
            {roleCards.map((role) => (
              <article className="info-card" key={role.title}>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
                <p className="role-card-first-action">첫 행동: {role.firstAction}</p>
                <Link className="solid-button" href={role.href}>
                  {role.cta}
                </Link>
              </article>
            ))}
          </div>
        </Surface>

        <Surface
          title="실제 진행 예시"
          subtitle="AI 발화, 작업자 응답, 시스템 이벤트가 각각 다르게 보여서 흐름을 바로 이해할 수 있습니다."
        >
          <div className="chat-demo">
            <div className="chat-head">
              <strong>작업 채널 · task-kr-4412</strong>
              <span>현장 확인 · KRW · 상태 추적 활성화</span>
            </div>
            <div className="chat-log">
              {flowFeed.map((item) =>
                item.kind === 'message' ? (
                  <div className={`chat-row ${item.actor}`} key={item.id}>
                    <article className="chat-bubble">
                      <p className="chat-name">{item.name}</p>
                      <p>{item.text}</p>
                    </article>
                  </div>
                ) : (
                  <div className="chat-event" key={item.id} role="status" aria-live="polite">
                    <span className="chat-event-label">{item.label}</span>
                    <p>{item.text}</p>
                  </div>
                )
              )}
            </div>
            <div className="steps">
              <span>등록</span>
              <span>수락</span>
              <span>현장 수행</span>
              <span>제출</span>
              <span>승인</span>
              <span>정산 대기</span>
            </div>
          </div>
        </Surface>

        <Surface title="서비스 원칙" subtitle="복잡한 설명은 줄이고 꼭 필요한 기준만 보여줍니다.">
          <div className="token-list">
            <span>승인 전 지급 없음</span>
            <span>예치금 분리 관리</span>
            <span>분쟁 중 자동 보류</span>
            <span>작업 상태 실시간 추적</span>
          </div>
          <div className="hero-actions">
            <Link className="subtle-button" href="/how-it-works">
              서비스 소개 보기
            </Link>
            <Link className="subtle-button" href="/policy">
              정책 전체 보기
            </Link>
          </div>
        </Surface>
      </PageFrame>
    </>
  );
}
