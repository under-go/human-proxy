import { PageFrame, Surface } from '@/components/layout/page-frame';
import { workerNav } from '@/components/layout/role-nav';

export default function WorkerProfilePage() {
  return (
    <PageFrame
      badge="작업자"
      title="프로필 및 지급 정보"
      description="작업 가능 카테고리, 알림, 지급 수단을 관리합니다."
      navItems={workerNav}
      currentPath="/worker/profile"
    >
      <Surface title="기본 정보">
        <form className="form-grid" action="#" method="post">
          <div className="field">
            <label htmlFor="worker-name">표시 이름</label>
            <input id="worker-name" type="text" defaultValue="Worker Kim" />
          </div>
          <div className="field">
            <label htmlFor="worker-categories">작업 선호 카테고리</label>
            <select id="worker-categories" defaultValue="research">
              <option value="research">research</option>
              <option value="labeling">labeling</option>
              <option value="verification">verification</option>
            </select>
          </div>
          <button className="solid-button" type="submit">
            저장
          </button>
        </form>
      </Surface>
    </PageFrame>
  );
}
