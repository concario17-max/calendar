import { describe, expect, it } from 'vitest';
import { YAO_25_COMMENTARY_BY_NUM, getYaoCommentary } from './yaoCommentary';

describe('yao commentary registry', () => {
  it('keeps a numeric seed slot for 25', () => {
    expect(Object.prototype.hasOwnProperty.call(YAO_25_COMMENTARY_BY_NUM, 25)).toBe(true);
  });

  it('returns the recovered 25 commentary text', () => {
    expect(getYaoCommentary(25)).toContain('25. 모레흐와 불원소를 통한 아스트랄계의 변형과 해탈의 원리');
  });
});
