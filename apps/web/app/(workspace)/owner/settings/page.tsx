import { PageFrame, Surface } from '@/components/layout/page-frame';
import { ownerNav } from '@/components/layout/role-nav';

export default function OwnerSettingsPage() {
  return (
    <PageFrame
      badge="의뢰자"
      title="설정"
      description="알림 채널, 정산 알림 주기, 정책 동의 이력을 관리합니다."
      navItems={ownerNav}
      currentPath="/owner/settings"
    >
      <Surface title="기본 설정">
        <form className="form-grid" action="#" method="post">
          <div className="field">
            <label htmlFor="notify">알림 채널</label>
            <select id="notify" defaultValue="email">
              <option value="email">이메일</option>
              <option value="sms">SMS</option>
              <option value="both">이메일 + SMS</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="digest">정산 리포트 주기</label>
            <select id="digest" defaultValue="weekly">
              <option value="daily">매일</option>
              <option value="weekly">매주</option>
              <option value="monthly">매월</option>
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
