import Link from 'next/link';
import { MetricStrip, PageFrame, Surface } from '@/components/layout/page-frame';

const workspaceCards = [
  {
    title: '의뢰자 화면',
    description: '작업 등록, 검토, 승인, 정산을 운영하는 화면입니다.',
    href: '/owner/dashboard',
    cta: '의뢰자 대시보드 열기',
    firstAction: '검토함에서 승인 대기 작업 처리'
  },
  {
    title: '작업자 화면',
    description: '일감 탐색, 수락, 제출, 정산 확인을 수행하는 화면입니다.',
    href: '/worker/jobs',
    cta: '작업자 화면 열기',
    firstAction: '추천 일감 1건 선택 후 수락'
  },
  {
    title: 'AI 연동 화면',
    description: 'API 기반 발주/검토/웹훅 운영을 관리하는 화면입니다.',
    href: '/ai/dashboard',
    cta: 'AI 연동 화면 열기',
    firstAction: '새 작업 등록 또는 검토함 처리'
  }
] as const;

const workspaceGuides = [
  { label: '원칙', value: '역할은 허브에서 전환', tone: 'neutral' as const },
  { label: '집중', value: '대시보드에선 현재 역할만', tone: 'neutral' as const },
  { label: '복귀', value: '사이드바 하단 홈 이동', tone: 'ok' as const }
];

export default function WorkspaceHubPage() {
  return (
    <PageFrame
      badge="작업공간"
      title="워크스페이스 허브"
      description="한 번에 하나의 역할에 집중하는 방식으로 구성했습니다. 지금 필요한 역할을 선택해 바로 이동하세요."
      currentPath="/workspace"
      actions={[
        { href: '/owner/dashboard', label: '의뢰자 대시보드' },
        { href: '/worker/jobs', label: '작업자 화면', variant: 'subtle' },
        { href: '/ai/dashboard', label: 'AI 연동 화면', variant: 'subtle' }
      ]}
    >
      <MetricStrip metrics={workspaceGuides} />

      <Surface title="역할별 진입" subtitle="역할 전환은 이 허브에서만 하도록 단순화했습니다.">
        <div className="grid">
          {workspaceCards.map((card) => (
            <article className="info-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <p className="role-card-first-action">첫 행동: {card.firstAction}</p>
              <Link className="solid-button" href={card.href}>
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </Surface>

      <Surface title="길 찾기 팁" subtitle="작업 중 헤매지 않도록 공통 진입점을 제공합니다.">
        <ul className="checklist">
          <li>대시보드 하단 `← 홈으로 이동`으로 언제든 랜딩 페이지로 복귀할 수 있습니다.</li>
          <li>역할 전환은 `/workspace`에서만 수행해 메뉴 복잡도를 줄였습니다.</li>
          <li>사이드바 상단 카드에서 현재 작업공간과 지갑 요약을 바로 확인할 수 있습니다.</li>
        </ul>
      </Surface>
    </PageFrame>
  );
}
