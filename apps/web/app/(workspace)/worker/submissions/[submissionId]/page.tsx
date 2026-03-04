import { PageFrame, Surface, InlineNote } from '@/components/layout/page-frame';
import { workerNav } from '@/components/layout/role-nav';
import { WorkerSubmissionForm } from '@/components/forms/worker-submission-form';

export default async function WorkerSubmissionPage({
  params
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;

  return (
    <PageFrame
      badge="작업자"
      title={`제출 작성 · ${submissionId}`}
      description="결과와 증빙을 입력한 뒤 체크리스트를 확인하고 제출하세요."
      navItems={workerNav}
      currentPath="/worker/jobs"
    >
      <Surface title="제출 폼">
        <WorkerSubmissionForm taskId={submissionId} />
        <InlineNote>제출 후 상태는 SUBMITTED → UNDER_REVIEW로 자동 전환됩니다.</InlineNote>
      </Surface>

      <Surface title="제출 전 체크">
        <ul className="checklist">
          <li>요구사항 누락 없음</li>
          <li>금지사항 위반 없음</li>
          <li>증빙 링크 접근 가능</li>
        </ul>
      </Surface>
    </PageFrame>
  );
}
