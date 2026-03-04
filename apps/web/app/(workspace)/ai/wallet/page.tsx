import { DataTable, MetricStrip, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';

export default function AiWalletPage() {
  return (
    <PageFrame
      badge="AI 도입자"
      title="지갑 및 원장"
      description="예치금, 정산 대기, 원장 변동을 작업 단위로 추적합니다."
      navItems={aiNav}
      currentPath="/ai/wallet"
      actions={[{ href: '/pricing', label: '수수료 정책 보기', variant: 'subtle' }]}
    >
      <MetricStrip
        metrics={[
          { label: '사용가능', value: '₩1,240,000' },
          { label: '예치중', value: '₩318,000', tone: 'warn' },
          { label: '정산대기', value: '₩92,400' },
          { label: '이번주 예상 지급', value: '₩266,800', tone: 'ok' }
        ]}
      />

      <Surface title="원장 내역">
        <DataTable
          columns={[
            { key: 'time', label: '일시' },
            { key: 'type', label: '유형' },
            { key: 'amount', label: '금액' },
            { key: 'status', label: '상태' }
          ]}
          rows={[
            {
              id: 'l1',
              values: {
                time: '2026-03-04 11:13',
                type: 'ESCROW_HOLD',
                amount: '-₩38,000',
                status: <StatusPill label="LOCKED" tone="warn" />
              }
            },
            {
              id: 'l2',
              values: {
                time: '2026-03-03 09:01',
                type: 'TOPUP',
                amount: '+₩500,000',
                status: <StatusPill label="COMPLETED" tone="ok" />
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
