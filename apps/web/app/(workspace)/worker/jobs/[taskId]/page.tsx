import Link from 'next/link';
import { PageFrame, Surface, Checklist } from '@/components/layout/page-frame';
import { workerNav } from '@/components/layout/role-nav';
import { WorkerJobActions } from '@/components/forms/worker-job-actions';

export default async function WorkerJobDetailPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;

  return (
    <PageFrame
      badge="작업자"
      title={`작업 상세 · ${taskId}`}
      description="수락 전에 보수, 기한, 합격 기준을 먼저 확인하세요."
      navItems={workerNav}
      currentPath="/worker/jobs"
      actions={[{ href: '/worker/jobs', label: '목록으로', variant: 'subtle' }]}
    >
      <Surface title="작업 요약">
        <div className="token-list">
          <span>보수 ₩31,000</span>
          <span>마감 2026-03-06 11:00</span>
          <span>예상 소요 60분</span>
        </div>
      </Surface>

      <Surface title="합격 기준">
        <Checklist
          items={[
            '요청 항목을 표 형태로 정리',
            '출처 링크 최소 3개 포함',
            '오탈자/중복 없는 최종 텍스트 제출'
          ]}
        />
      </Surface>

      <Surface title="주의사항">
        <Checklist
          items={[
            '허위 정보 제출 금지',
            '외부 유료 자료 무단 인용 금지',
            '개인정보 포함 금지'
          ]}
        />
        <div className="hero-actions">
          <WorkerJobActions taskId={taskId} />
          <Link className="subtle-button" href="/policies/task-policy">
            정책 보기
          </Link>
          <Link className="subtle-button" href={`/worker/submissions/${taskId}`}>
            제출 화면 열기
          </Link>
        </div>
      </Surface>
    </PageFrame>
  );
}
