import { describe, expect, it } from 'vitest';
import { GUA_COMMENTARY_BY_NUM, getGuaCommentary } from './guaCommentary';

describe('gua commentary registry', () => {
  it('keeps a numeric slot for 6', () => {
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 6)).toBe(true);
  });

  it('keeps the summary content for 6', () => {
    const commentary = getGuaCommentary(6);

    expect(commentary).toContain('핵심 요약');
    expect(commentary).toContain('진동의 왜곡');
  });
});
