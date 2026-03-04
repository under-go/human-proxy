import type { Metadata } from 'next';
import { PageFrame, Surface, Checklist } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '신뢰 기준 | 예치·검토·정산 투명성',
  description:
    '승인 전 지급 금지, 원장 기록, 분쟁 시 자동 보류 등 Human Proxy 신뢰 운영 원칙을 확인할 수 있습니다.',
  path: '/trust',
  keywords: ['Human Proxy 신뢰', '예치금', '원장 정합성', '분쟁 보류']
});

export default function TrustPage() {
  return (
    <>
      <JsonLd
        value={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '신뢰 기준', path: '/trust' }
        ])}
      />
      <PageFrame
        badge="신뢰 기준"
        title="예치·검토·정산의 투명성"
        description="사용자가 납부한 금액은 승인 전까지 예치 상태로 관리되며, 승인 이벤트 이후에만 정산이 실행됩니다."
      >
        <Surface title="보호 원칙">
          <Checklist
            items={[
              '승인 전 지급 금지',
              '원장 항목 append-only 보관',
              '동일 idempotency-key 중복 처리 방지',
              '활성 분쟁 상태에서 지급 자동 보류'
            ]}
          />
        </Surface>

        <Surface title="운영 가시성">
          <div className="info-grid">
            <article className="info-tile">
              <h3>정산 상태</h3>
              <p>대기/처리중/지급완료/실패를 작업별로 확인합니다.</p>
            </article>
            <article className="info-tile">
              <h3>분쟁 타임라인</h3>
              <p>접수부터 판정까지 단계와 SLA를 화면에 노출합니다.</p>
            </article>
            <article className="info-tile">
              <h3>정책 링크 고정</h3>
              <p>결제/승인 화면에서 환불·분쟁·수수료 정책을 즉시 열람할 수 있습니다.</p>
            </article>
          </div>
        </Surface>
      </PageFrame>
    </>
  );
}
