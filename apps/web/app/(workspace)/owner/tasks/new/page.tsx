import { PageFrame, Surface, InlineNote } from '@/components/layout/page-frame';
import { ownerNav } from '@/components/layout/role-nav';
import { TaskCreateForm } from '@/components/forms/task-create-form';

export default function OwnerTaskNewPage() {
  return (
    <PageFrame
      badge="의뢰자"
      title="새 작업 만들기"
      description="목표와 기준을 먼저 적고, 보수와 기한을 입력하면 작업이 생성됩니다."
      navItems={ownerNav}
      currentPath="/owner/tasks/new"
    >
      <Surface title="필수 입력">
        <TaskCreateForm mode="owner" />
        <InlineNote>예치 잔액이 부족하면 등록 시점에 충전 화면으로 안내됩니다.</InlineNote>
      </Surface>
    </PageFrame>
  );
}
