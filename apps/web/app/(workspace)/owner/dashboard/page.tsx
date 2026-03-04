import Link from 'next/link';
import { DataTable, MetricStrip, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { ownerNav } from '@/components/layout/role-nav';

const ownerMetrics = [
  { label: '검토 대기', value: '3건', tone: 'warn' as const },
  { label: '오늘 신규 작업', value: '2건', tone: 'neutral' as const },
  { label: '이번 주 승인율', value: '91%', tone: 'ok' as const }
];

export default function OwnerDashboardPage() {
  return (
    <PageFrame
      badge="의뢰자"
      title="의뢰 운영 홈"
      description="작업 등록과 검토 처리에 집중할 수 있도록 화면을 단순하게 구성했습니다."
      navItems={ownerNav}
      currentPath="/owner/dashboard"
      actions={[
        { href: '/owner/tasks/new', label: '새 작업 만들기' },
        { href: '/owner/reviews', label: '검토함 열기', variant: 'subtle' }
      ]}
    >
      <MetricStrip metrics={ownerMetrics} />

      <Surface title="지금 처리할 일">
        <div className="grid">
          <article className="info-card">
            <h3>검토 대기 3건</h3>
            <p>검토함에서 승인 또는 수정요청을 먼저 처리하세요.</p>
            <Link className="solid-button" href="/owner/reviews">
              검토함 열기
            </Link>
          </article>
          <article className="info-card">
            <h3>새 작업 등록</h3>
            <p>목표와 합격 기준을 입력하면 작업이 바로 오픈됩니다.</p>
            <Link className="subtle-button" href="/owner/tasks/new">
              등록 시작
            </Link>
          </article>
        </div>
      </Surface>

      <Surface title="최근 작업 상태">
        <DataTable
          columns={[
            { key: 'taskId', label: 'Task ID' },
            { key: 'status', label: '상태' },
            { key: 'budget', label: '보수' },
            { key: 'next', label: '다음 액션' }
          ]}
          rows={[
            {
              id: 'o1',
              values: {
                taskId: <Link href="/owner/tasks/owner-991">owner-991</Link>,
                status: <StatusPill label="UNDER_REVIEW" tone="warn" />,
                budget: '₩55,000',
                next: '검토 후 승인/수정요청'
              }
            },
            {
              id: 'o2',
              values: {
                taskId: <Link href="/owner/tasks/owner-988">owner-988</Link>,
                status: <StatusPill label="OPEN" />,
                budget: '₩21,000',
                next: '작업자 수락 대기'
              }
            }
          ]}
        />
        <p className="inline-note">지갑 상태는 사이드바 요약 카드에서 확인 후 상세 페이지로 이동할 수 있습니다.</p>
        <div className="hero-actions">
          <Link className="subtle-button" href="/owner/disputes">
            분쟁 센터
          </Link>
        </div>
      </Surface>
    </PageFrame>
  );
}
