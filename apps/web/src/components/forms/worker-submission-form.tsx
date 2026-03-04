'use client';

import { FormEvent, useState } from 'react';

export function WorkerSubmissionForm({ taskId }: { taskId: string }) {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'ok' | 'danger'; text: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) {
      setFeedback({ tone: 'danger', text: '제출 텍스트를 입력해주세요.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(`/api/jobs/${taskId}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          imageUrl: imageUrl.trim() || undefined
        })
      });

      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setFeedback({
          tone: 'danger',
          text: data?.message ?? '제출에 실패했습니다. 잠시 후 다시 시도해주세요.'
        });
        return;
      }

      setFeedback({
        tone: 'ok',
        text: data?.message ?? '제출이 완료되었습니다. 검토 상태를 기다려주세요.'
      });
      setText('');
      setImageUrl('');
    } catch {
      setFeedback({ tone: 'danger', text: '제출 요청 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="submission-text">제출 텍스트</label>
        <textarea
          id="submission-text"
          placeholder="요구사항을 반영한 최종 결과를 입력하세요."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="submission-image">증빙 이미지 URL</label>
        <input
          id="submission-image"
          type="url"
          placeholder="https://..."
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
      </div>
      <div className="hero-actions">
        <button className="solid-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '제출 중...' : '제출 완료'}
        </button>
      </div>

      {feedback ? (
        <p className="form-feedback" data-tone={feedback.tone}>
          {feedback.text}
        </p>
      ) : null}
    </form>
  );
}
