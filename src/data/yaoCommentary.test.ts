import { describe, expect, it } from 'vitest';
import { YAO_COMMENTARY_BY_NUM, getYaoCommentary } from './yaoCommentary';

describe('yao commentary registry', () => {
  it('covers the refreshed yao key set with the known gaps', () => {
    const keys = Object.keys(YAO_COMMENTARY_BY_NUM)
      .map((key) => Number(key))
      .sort((left, right) => left - right);

    expect(keys).toEqual(
      Array.from({ length: 360 }, (_, index) => index + 25).filter(
        (num) => num < 61 || num > 66,
      ).filter((num) => num !== 191),
    );
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 25)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 61)).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 66)).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 191)).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 384)).toBe(true);
  });

  it('preserves the intro paragraph for 25', () => {
    const commentary = getYaoCommentary(25);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('25. ')).toBe(true);
    expect(commentary).toContain('[[list]]');
  });

  it('keeps the refreshed edge commentary readable', () => {
    const commentary = getYaoCommentary(384);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('384. ')).toBe(true);
    expect(commentary).toContain('[[list]]');
  });

  it('emits semantic list markers for 25', () => {
    const commentary = getYaoCommentary(25);

    expect(commentary).toContain('[[list]]');
    expect(commentary).toContain('[[item]]');
    expect(commentary).toContain('[[/list]]');
  });
});
