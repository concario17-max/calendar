import { describe, expect, it } from 'vitest';
import { GUA_COMMENTARY_BY_NUM, getGuaCommentary } from './guaCommentary';

describe('gua commentary registry', () => {
  it('keeps a numeric slot for 6', () => {
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 6)).toBe(true);
  });

  it('returns a non-empty commentary for 6', () => {
    expect(getGuaCommentary(6)).toMatch(/\S/);
  });
});
