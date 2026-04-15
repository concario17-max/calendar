import { describe, expect, it } from 'vitest';
import { YAO_COMMENTARY_BY_NUM, getYaoCommentary } from './yaoCommentary';

describe('yao commentary registry', () => {
  it('keeps a numeric slot for 25', () => {
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 25)).toBe(true);
  });

  it('preserves the intro paragraph for 25', () => {
    const commentary = getYaoCommentary(25);

    expect(commentary).toContain(
      '모레흐는 3월 25일 양자리 1도에 해당하는 존재로 불원소와 전기의 속성을 가지고 있어.'
    );
  });

  it('emits semantic list markers for 25', () => {
    const commentary = getYaoCommentary(25);

    expect(commentary).toContain('[[list]]');
    expect(commentary).toContain('[[item]] 모레흐는 아스트랄계의 부정성을 불원소로 변형하도록 돕는 존재다.');
  });
});
