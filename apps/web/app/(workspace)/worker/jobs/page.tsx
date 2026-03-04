import Link from 'next/link';
import { MetricStrip, PageFrame, Surface } from '@/components/layout/page-frame';
import { workerNav } from '@/components/layout/role-nav';

const jobs = [
  {
    id: 'job-118',
    category: 'verification',
    reward: '₩18,000',
    deadline: '03-05 15:00',
    criteria: '현장 확인 사진 3장'
  },
  {
    id: 'job-117',
    category: 'research',
    reward: '₩31,000',
    deadline: '03-06 11:00',
    criteria: '출처 링크 3개 이상'
  },
  {
    id: 'job-114',
    category: 'labeling',
    reward: '₩24,000',
    deadline: '03-04 22:00',
    criteria: '라벨 정확도 95% 이상'
  }
] as const;

const workerMetrics = [
  { label: '추천 일감', value: '12건', tone: 'neutral' as const },
  { label: '오늘 마감', value: '4건', tone: 'warn' as const },
  { label: '최근 승인율', value: '94%', tone: 'ok' as const }
];

export default function WorkerJobsPage() {
  return (
    <PageFrame
      badge="작업자"
      title="작업 탐색"
      description="기준이 분명한 일감을 선택하고, 제출 이후 정산 상태까지 확인할 수 있습니다."
      navItems={workerNav}
      currentPath="/worker/jobs"
      actions={[
        { href: '/worker/earnings', label: '정산 현황 보기' },
        { href: '/faq', label: '도움말 보기', variant: 'subtle' }
      ]}
    >
      <MetricStrip metrics={workerMetrics} />

      <Surface title="빠른 필터" subtitle="초기 버전은 핵심 필터만 제공합니다.">
        <div className="token-list">
          <span>전체 카테고리</span>
          <span>보수 1만원 이상</span>
          <span>마감 48시간 이내</span>
        </div>
      </Surface>

      <Surface title="지금 추천 일감">
        <div className="grid">
          {jobs.map((job) => (
            <article className="info-card" key={job.id}>
              <h3>{job.id}</h3>
              <p>
                카테고리 <strong>{job.category}</strong>
              </p>
              <p>
                보수 <strong>{job.reward}</strong> · 마감 {job.deadline}
              </p>
              <p>합격 기준: {job.criteria}</p>
              <p>반려 시 수정요청 기준 제공</p>
              <Link className="solid-button" href={`/worker/jobs/${job.id}`}>
                이 작업 보기
              </Link>
            </article>
          ))}
        </div>
      </Surface>
    </PageFrame>
  );
}
