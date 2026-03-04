import { buildTaskCreatePayload } from './task-create-payload';

describe('buildTaskCreatePayload', () => {
  it('owner 모드에서 금지사항을 프롬프트에 병합한다', () => {
    const payload = buildTaskCreatePayload({
      mode: 'owner',
      prompt: '서울 3개 지점 운영시간 조사',
      expectedOutput: '표 형식 결과',
      category: 'research',
      deadlineAtLocal: '2026-03-10T18:00',
      amountKrw: '30000',
      feeKrw: '4500',
      prohibited: '추정 데이터 작성 금지'
    });

    expect(payload.spec.prompt).toContain('서울 3개 지점 운영시간 조사');
    expect(payload.spec.prompt).toContain('[금지사항]');
    expect(payload.spec.prompt).toContain('추정 데이터 작성 금지');
    expect(payload.reward.amountKrw).toBe(30000);
    expect(payload.reward.feeKrw).toBe(4500);
    expect(payload.spec.deadlineAt).toBe(new Date('2026-03-10T18:00').toISOString());
  });

  it('ai 모드에서는 금지사항을 병합하지 않는다', () => {
    const payload = buildTaskCreatePayload({
      mode: 'ai',
      prompt: '점포 3개 현장 사진 수집',
      expectedOutput: '사진 3장 + 메모',
      category: 'field',
      deadlineAtLocal: '2026-03-11T09:30',
      amountKrw: '12000',
      feeKrw: '0',
      prohibited: '무시되어야 함'
    });

    expect(payload.spec.prompt).toBe('점포 3개 현장 사진 수집');
    expect(payload.reward.amountKrw).toBe(12000);
    expect(payload.reward.feeKrw).toBe(0);
  });

  it('보수/수수료 숫자 변환 실패 시 0으로 처리한다', () => {
    const payload = buildTaskCreatePayload({
      mode: 'ai',
      prompt: '테스트',
      expectedOutput: '테스트',
      category: 'verification',
      deadlineAtLocal: '2026-03-12T11:00',
      amountKrw: 'abc',
      feeKrw: '-10'
    });

    expect(payload.reward.amountKrw).toBe(0);
    expect(payload.reward.feeKrw).toBe(0);
  });
});
