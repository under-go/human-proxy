export type TaskCreateFormMode = 'ai' | 'owner';

export type TaskCreateFormInput = {
  mode: TaskCreateFormMode;
  prompt: string;
  expectedOutput: string;
  category: string;
  deadlineAtLocal: string;
  amountKrw: string;
  feeKrw: string;
  prohibited?: string;
};

export type TaskCreatePayload = {
  spec: {
    prompt: string;
    expectedOutput: string;
    category: string;
    deadlineAt: string;
  };
  reward: {
    amountKrw: number;
    feeKrw: number;
  };
};

function sanitizeText(value: string) {
  return value.trim();
}

function parsePositiveInteger(raw: string, fallback: number) {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }
  return parsed;
}

export function buildTaskCreatePayload(input: TaskCreateFormInput): TaskCreatePayload {
  const prompt = sanitizeText(input.prompt);
  const prohibited = sanitizeText(input.prohibited ?? '');
  const mergedPrompt =
      input.mode === 'owner' && prohibited
        ? `${prompt}\n\n[금지사항]\n${prohibited}`
        : prompt;
  const deadlineIso = new Date(input.deadlineAtLocal).toISOString();

  return {
    spec: {
      prompt: mergedPrompt,
      expectedOutput: sanitizeText(input.expectedOutput),
      category: sanitizeText(input.category),
      deadlineAt: deadlineIso
    },
    reward: {
      amountKrw: parsePositiveInteger(input.amountKrw, 0),
      feeKrw: parsePositiveInteger(input.feeKrw, 0)
    }
  };
}
