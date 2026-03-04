'use client';

import { useState } from 'react';

export function WorkerJobActions({ taskId }: { taskId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'ok' | 'danger'; text: string } | null>(null);

  async function acceptJob() {
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(`/api/jobs/${taskId}/accept`, { method: 'POST' });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setFeedback({
          tone: 'danger',
          text: data?.message ?? '작업 수락에 실패했습니다. 잠시 후 다시 시도해주세요.'
        });
        return;
      }

      setFeedback({
        tone: 'ok',
        text: data?.message ?? '작업 수락 완료. 제출 화면에서 결과를 등록하세요.'
      });
    } catch {
      setFeedback({ tone: 'danger', text: '작업 수락 요청 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button className="solid-button" type="button" onClick={acceptJob} disabled={isSubmitting}>
        {isSubmitting ? '수락 중...' : '작업 수락'}
      </button>
      {feedback ? (
        <p className="form-feedback" data-tone={feedback.tone}>
          {feedback.text}
        </p>
      ) : null}
    </>
  );
}
