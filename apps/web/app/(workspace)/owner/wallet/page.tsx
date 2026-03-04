import { DataTable, MetricStrip, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { ownerNav } from '@/components/layout/role-nav';

export default function OwnerWalletPage() {
  return (
    <PageFrame
      badge="의뢰자"
      title="지갑 및 예치 원장"
      description="충전금, 예치금, 환불/정산 이력을 투명하게 제공합니다."
      navItems={ownerNav}
      currentPath="/owner/wallet"
      actions={[{ href: '/pricing', label: '수수료 정책', variant: 'subtle' }]}
    >
      <MetricStrip
        metrics={[
          { label: '사용가능', value: '₩810,000' },
          { label: '예치중', value: '₩205,000', tone: 'warn' },
          { label: '환불 대기', value: '₩40,000' },
          { label: '이번달 사용액', value: '₩1,220,000' }
        ]}
      />

      <Surface title="원장">
        <DataTable
          columns={[
            { key: 'time', label: '일시' },
            { key: 'type', label: '유형' },
            { key: 'amount', label: '금액' },
            { key: 'status', label: '상태' }
          ]}
          rows={[
            {
              id: 'ow1',
              values: {
                time: '2026-03-04 12:23',
                type: 'ESCROW_HOLD',
                amount: '-₩55,000',
                status: <StatusPill label="LOCKED" tone="warn" />
              }
            },
            {
              id: 'ow2',
              values: {
                time: '2026-03-03 09:10',
                type: 'TOPUP',
                amount: '+₩300,000',
                status: <StatusPill label="COMPLETED" tone="ok" />
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
