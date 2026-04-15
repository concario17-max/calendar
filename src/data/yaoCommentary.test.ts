import { describe, expect, it } from 'vitest';
import { YAO_COMMENTARY_BY_NUM, getYaoCommentary } from './yaoCommentary';

describe('yao commentary registry', () => {
  it('keeps a numeric slot for 33', () => {
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 33)).toBe(true);
  });

  it('keeps the summary content for 33', () => {
    const commentary = getYaoCommentary(33);

    expect(commentary).toContain('핵심 요약');
    expect(commentary).toContain('전자기적 원인');
  });
});
