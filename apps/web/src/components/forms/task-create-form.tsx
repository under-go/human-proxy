'use client';

import { FormEvent, useMemo, useState } from 'react';
import { buildTaskCreatePayload, type TaskCreateFormMode } from '@/lib/task-create-payload';

type TaskCreateFormProps = {
  mode: TaskCreateFormMode;
};

type FormState = {
  prompt: string;
  expectedOutput: string;
  category: string;
  prohibited: string;
  amountKrw: string;
  feeKrw: string;
  deadlineAtLocal: string;
};

function defaultDeadlineLocal() {
  const now = new Date();
  now.setHours(now.getHours() + 24);
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function createDefaultState(mode: TaskCreateFormMode): FormState {
  return {
    prompt: '',
    expectedOutput: '',
    category: mode === 'owner' ? 'field' : 'research',
    prohibited: '',
    amountKrw: mode === 'owner' ? '40000' : '30000',
    feeKrw: mode === 'owner' ? '6000' : '4500',
    deadlineAtLocal: defaultDeadlineLocal()
  };
}

export function TaskCreateForm({ mode }: TaskCreateFormProps) {
  const [form, setForm] = useState<FormState>(() => createDefaultState(mode));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'ok' | 'danger'; text: string } | null>(null);

  const labels = useMemo(
    () =>
      mode === 'owner'
        ? {
            prompt: '목표',
            expectedOutput: '합격 기준',
            submit: '의뢰 등록하기'
          }
        : {
            prompt: '프롬프트',
            expectedOutput: '합격 기준',
            submit: '작업 등록하기'
          },
    [mode]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.prompt.trim() || !form.expectedOutput.trim()) {
      setFeedback({ tone: 'danger', text: '필수 입력값을 먼저 채워주세요.' });
      return;
    }
    if (!form.deadlineAtLocal) {
      setFeedback({ tone: 'danger', text: '기한을 입력해주세요.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const payload = buildTaskCreatePayload({
        mode,
        prompt: form.prompt,
        expectedOutput: form.expectedOutput,
        category: form.category,
        deadlineAtLocal: form.deadlineAtLocal,
        amountKrw: form.amountKrw,
        feeKrw: form.feeKrw,
        prohibited: form.prohibited
      });

      if (payload.reward.amountKrw < 1) {
        setFeedback({ tone: 'danger', text: '보수는 1원 이상이어야 합니다.' });
        return;
      }

      const response = await fetch('/api/agent/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': `task-create-${crypto.randomUUID()}`
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json().catch(() => null)) as
        | { taskId?: string; message?: string; code?: string }
        | null;

      if (!response.ok) {
        const message = data?.message ?? '작업 등록에 실패했습니다. 잠시 후 다시 시도해주세요.';
        setFeedback({ tone: 'danger', text: message });
        return;
      }

      const taskId = data?.taskId ?? 'N/A';
      setFeedback({ tone: 'ok', text: `작업이 등록되었습니다. taskId: ${taskId}` });
      setForm(createDefaultState(mode));
    } catch {
      setFeedback({ tone: 'danger', text: '작업 등록 중 오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor={`${mode}-prompt`}>{labels.prompt}</label>
        <textarea
          id={`${mode}-prompt`}
          placeholder={
            mode === 'owner'
              ? '무엇을 해결하고 싶은지, 작업자가 어떤 맥락으로 움직여야 하는지 적어주세요.'
              : '작업자가 수행해야 할 일을 구체적으로 작성하세요.'
          }
          value={form.prompt}
          onChange={(event) => setForm((prev) => ({ ...prev, prompt: event.target.value }))}
        />
      </div>

      <div className="field">
        <label htmlFor={`${mode}-expected-output`}>{labels.expectedOutput}</label>
        <textarea
          id={`${mode}-expected-output`}
          placeholder="어떤 결과면 승인할지 체크 가능한 문장으로 입력하세요."
          value={form.expectedOutput}
          onChange={(event) => setForm((prev) => ({ ...prev, expectedOutput: event.target.value }))}
        />
      </div>

      {mode === 'owner' ? (
        <div className="field">
          <label htmlFor="owner-prohibited">금지사항</label>
          <textarea
            id="owner-prohibited"
            placeholder="하면 안 되는 내용을 명확하게 적어주세요."
            value={form.prohibited}
            onChange={(event) => setForm((prev) => ({ ...prev, prohibited: event.target.value }))}
          />
        </div>
      ) : null}

      <div className="field">
        <label htmlFor={`${mode}-category`}>카테고리</label>
        <select
          id={`${mode}-category`}
          value={form.category}
          onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
        >
          <option value="research">research</option>
          <option value="field">field</option>
          <option value="verification">verification</option>
          <option value="labeling">labeling</option>
        </select>
      </div>

      <div className="two-col">
        <div className="field">
          <label htmlFor={`${mode}-reward`}>보수(원)</label>
          <input
            id={`${mode}-reward`}
            type="number"
            min={1}
            step={100}
            value={form.amountKrw}
            onChange={(event) => setForm((prev) => ({ ...prev, amountKrw: event.target.value }))}
          />
        </div>
        <div className="field">
          <label htmlFor={`${mode}-fee`}>수수료(원)</label>
          <input
            id={`${mode}-fee`}
            type="number"
            min={0}
            step={100}
            value={form.feeKrw}
            onChange={(event) => setForm((prev) => ({ ...prev, feeKrw: event.target.value }))}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${mode}-deadline`}>기한</label>
        <input
          id={`${mode}-deadline`}
          type="datetime-local"
          value={form.deadlineAtLocal}
          onChange={(event) => setForm((prev) => ({ ...prev, deadlineAtLocal: event.target.value }))}
        />
      </div>

      <div className="hero-actions">
        <button className="solid-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : labels.submit}
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
