import { PageFrame, Surface, InlineNote } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';
import { TaskCreateForm } from '@/components/forms/task-create-form';

export default function AiTaskNewPage() {
  return (
    <PageFrame
      badge="AI 도입자"
      title="새 작업 등록"
      description="필수 항목만 입력하면 즉시 발주됩니다. 고급 옵션은 추후 확장합니다."
      navItems={aiNav}
      currentPath="/ai/tasks/new"
    >
      <Surface title="입력 순서">
        <div className="steps">
          <span>1. 프롬프트</span>
          <span>2. 합격 기준</span>
          <span>3. 보수/기한</span>
          <span>4. 등록</span>
        </div>
      </Surface>

      <Surface title="필수 입력">
        <TaskCreateForm mode="ai" />
        <InlineNote>등록 전 예치금, 수수료, 예상 정산일이 자동 계산됩니다.</InlineNote>
      </Surface>
    </PageFrame>
  );
}
