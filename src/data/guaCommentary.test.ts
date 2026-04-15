import { describe, expect, it } from 'vitest';
import { GUA_COMMENTARY_BY_NUM, getGuaCommentary } from './guaCommentary';

describe('gua commentary registry', () => {
  it('keeps a numeric slot for 5', () => {
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 5)).toBe(true);
  });

  it('preserves the intro paragraph for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toContain(
      '쓰임이라는 건 신이 지구 차원에서 실행하고자 하는 의지에 따라 나 자신을 허용하는 상태를 의미해.'
    );
  });

  it('emits semantic list markers for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toContain('[[list]]');
    expect(commentary).toContain('[[item]] 이해가 개입되지 않아도 실행하는 용기');
  });
});
