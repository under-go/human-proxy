import type { Metadata } from 'next';
import { PageFrame, Surface } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '환불 및 정산 보류 정책',
  description: '작업 상태와 분쟁 여부에 따른 환불 가능 범위와 정산 보류 조건을 안내합니다.',
  path: '/policies/refund',
  keywords: ['환불 정책', '정산 보류', '분쟁 환불']
});

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd
        value={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '정책', path: '/policy' },
          { name: '환불 및 정산 보류 정책', path: '/policies/refund' }
        ])}
      />
      <PageFrame
        badge="정책"
        title="환불 및 정산 보류 정책"
        description="작업 상태와 분쟁 여부에 따라 환불 가능 범위가 달라집니다."
      >
        <Surface title="핵심 조항" subtitle="작업 상태를 기준으로 환불/보류 조건을 판단합니다.">
          <article className="policy-section">
            <h2>1. 환불 가능 조건</h2>
            <ul>
              <li>작업 미수락 상태에서 의뢰자가 취소 요청한 경우</li>
              <li>운영 정책 위반으로 플랫폼이 작업을 강제 종료한 경우</li>
              <li>분쟁 판정으로 의뢰자 환불이 확정된 경우</li>
            </ul>
          </article>
          <article className="policy-section">
            <h2>2. 환불 불가/제한 조건</h2>
            <p>승인 완료 후 정산 배치에 포함된 건은 환불이 제한되거나 분쟁 절차로 이관됩니다.</p>
          </article>
        </Surface>
      </PageFrame>
    </>
  );
}
