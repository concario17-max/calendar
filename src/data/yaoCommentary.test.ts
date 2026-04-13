import { describe, expect, it } from 'vitest';
import { YAO_COMMENTARY_BY_NUM, getYaoCommentary } from './yaoCommentary';

describe('yao commentary registry', () => {
  it('keeps a numeric seed slot for 31', () => {
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 31)).toBe(true);
  });

  it('returns the recovered 31 commentary text', () => {
    expect(getYaoCommentary(31)).toContain('31번 오폴로곤과 무상의 지혜');
  });
});
