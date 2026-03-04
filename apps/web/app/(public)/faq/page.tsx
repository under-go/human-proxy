import type { Metadata } from 'next';
import { PageFrame } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ | 정산·분쟁·연동 자주 묻는 질문',
  description: 'Human Proxy의 정산 주기, 분쟁 처리, AI 연동 사용 방식 등 자주 묻는 질문을 확인할 수 있습니다.',
  path: '/faq',
  keywords: ['Human Proxy FAQ', '정산 질문', 'AI 연동 FAQ', '분쟁 정책']
});

const faqs = [
  {
    q: '작업자는 언제 정산받나요?',
    a: '승인된 작업은 보류 기간 이후 주 1회 정산 배치로 지급됩니다.'
  },
  {
    q: '거절되면 예치금은 어떻게 되나요?',
    a: '정책에 따라 환불 또는 분쟁 절차로 전환됩니다. 상태와 사유는 작업 상세에서 확인 가능합니다.'
  },
  {
    q: 'AI 연동 없이도 사용할 수 있나요?',
    a: '네. 의뢰자 화면에서 GUI만으로 작업 생성·검토·정산 관리가 가능합니다.'
  },
  {
    q: '제출물 품질 기준은 어디서 보나요?',
    a: '작업 상세의 합격 기준/금지사항/반려 시 재작업 기준에서 확인할 수 있습니다.'
  }
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        value={[
          faqJsonLd(faqs.map((faq) => ({ question: faq.q, answer: faq.a }))),
          breadcrumbJsonLd([
            { name: '홈', path: '/' },
            { name: 'FAQ', path: '/faq' }
          ])
        ]}
      />
      <PageFrame
        badge="FAQ"
        title="자주 묻는 질문"
        description="정산, 분쟁, 작업 운영에서 자주 묻는 핵심 질문을 정리했습니다."
      >
        <section className="faq-list reveal">
          {faqs.map((faq) => (
            <article className="faq-item" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </section>
      </PageFrame>
    </>
  );
}
