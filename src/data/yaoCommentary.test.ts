import { describe, expect, it } from 'vitest';
import { YAO_COMMENTARY_BY_NUM, getYaoCommentary } from './yaoCommentary';

describe('yao commentary registry', () => {
  it('keeps a numeric slot for 33', () => {
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 33)).toBe(true);
  });

  it('returns a non-empty commentary for 33', () => {
    expect(getYaoCommentary(33)).toMatch(/\S/);
  });
});
