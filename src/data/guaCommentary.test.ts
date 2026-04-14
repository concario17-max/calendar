import { describe, expect, it } from 'vitest';
import { GUA_5_COMMENTARY_BY_NUM, getGuaCommentary } from './guaCommentary';

describe('gua commentary registry', () => {
  it('keeps a numeric seed slot for 5', () => {
    expect(Object.prototype.hasOwnProperty.call(GUA_5_COMMENTARY_BY_NUM, 5)).toBe(true);
  });

  it('returns the recovered 5 commentary text', () => {
    expect(getGuaCommentary(5)).toContain('05.수괘의 진실: 신의 섭리를 수행하는 쓰임과 믿음의 길');
  });
});
