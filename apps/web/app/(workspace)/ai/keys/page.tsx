import { DataTable, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';

export default function AiKeysPage() {
  return (
    <PageFrame
      badge="AI 도입자"
      title="API Key 관리"
      description="키 발급, 회전, 사용 이력을 관리합니다. 원문 키는 한 번만 표시됩니다."
      navItems={aiNav}
      currentPath="/ai/keys"
      actions={[{ href: '/ai/keys', label: '키 새로고침', variant: 'subtle' }]}
    >
      <Surface title="활성 키 목록">
        <DataTable
          columns={[
            { key: 'prefix', label: 'Prefix' },
            { key: 'status', label: '상태' },
            { key: 'lastUsed', label: '마지막 사용' },
            { key: 'expires', label: '만료일' }
          ]}
          rows={[
            {
              id: 'k1',
              values: {
                prefix: 'hp_live_a9f2',
                status: <StatusPill label="ACTIVE" tone="ok" />,
                lastUsed: '2026-03-04 15:42',
                expires: '2026-06-30'
              }
            },
            {
              id: 'k2',
              values: {
                prefix: 'hp_live_7a11',
                status: <StatusPill label="ACTIVE" tone="ok" />,
                lastUsed: '2026-03-03 22:01',
                expires: '2026-05-15'
              }
            },
            {
              id: 'k3',
              values: {
                prefix: 'hp_live_old1',
                status: <StatusPill label="REVOKED" tone="danger" />,
                lastUsed: '2026-02-21 10:11',
                expires: '-'
              }
            }
          ]}
        />
      </Surface>

      <Surface title="키 운영 원칙">
        <ul className="checklist">
          <li>배포 환경마다 키를 분리합니다.</li>
          <li>회전 주기를 60일 이하로 유지합니다.</li>
          <li>서명 검증 실패 시 즉시 키 노출 여부를 점검합니다.</li>
        </ul>
      </Surface>
    </PageFrame>
  );
}
