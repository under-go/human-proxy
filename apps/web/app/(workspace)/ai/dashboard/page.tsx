import Link from 'next/link';
import { DataTable, MetricStrip, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';

const aiMetrics = [
  { label: '검토 대기', value: '5건', tone: 'warn' as const },
  { label: '오늘 등록', value: '4건', tone: 'neutral' as const },
  { label: '웹훅 성공률', value: '99.7%', tone: 'ok' as const }
];

export default function AiDashboardPage() {
  return (
    <PageFrame
      badge="AI 도입자"
      title="AI 연동 운영"
      description="작업 등록과 제출 검토를 빠르게 처리할 수 있도록 핵심 액션만 배치했습니다."
      navItems={aiNav}
      currentPath="/ai/dashboard"
      actions={[
        { href: '/ai/tasks/new', label: '새 작업 등록' },
        { href: '/ai/reviews', label: '검토함 열기', variant: 'subtle' }
      ]}
    >
      <MetricStrip metrics={aiMetrics} />

      <Surface title="지금 처리할 일">
        <div className="grid">
          <article className="info-card">
            <h3>검토 대기 5건</h3>
            <p>승인 지연을 줄이려면 검토함부터 처리하세요.</p>
            <Link className="solid-button" href="/ai/reviews">
              검토함 열기
            </Link>
          </article>
          <article className="info-card">
            <h3>새 작업 발주</h3>
            <p>요청 내용과 기준을 입력하면 바로 오픈됩니다.</p>
            <Link className="subtle-button" href="/ai/tasks/new">
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
            { key: 'deadline', label: '기한' },
            { key: 'next', label: '다음 액션' }
          ]}
          rows={[
            {
              id: 't1',
              values: {
                taskId: <Link href="/ai/tasks/task-kr-4412">task-kr-4412</Link>,
                status: <StatusPill label="UNDER_REVIEW" tone="warn" />,
                deadline: '03-06 18:00',
                next: '검토 후 승인/수정요청'
              }
            },
            {
              id: 't2',
              values: {
                taskId: <Link href="/ai/tasks/task-kr-4411">task-kr-4411</Link>,
                status: <StatusPill label="OPEN" />,
                deadline: '03-05 12:00',
                next: '작업자 수락 대기'
              }
            }
          ]}
        />
        <p className="inline-note">정산은 사이드바 예산 카드에서, API 운영은 핵심 메뉴(API 키/웹훅)에서 바로 이동하세요.</p>
        <div className="hero-actions">
          <Link className="subtle-button" href="/api-docs">
            연동 가이드
          </Link>
        </div>
      </Surface>
    </PageFrame>
  );
}
