import { describe, expect, it } from 'vitest';
import { GUA_COMMENTARY_BY_NUM, getGuaCommentary } from './guaCommentary';

describe('gua commentary registry', () => {
  it('covers the refreshed gua key set', () => {
    const keys = Object.keys(GUA_COMMENTARY_BY_NUM)
      .map((key) => Number(key))
      .sort((left, right) => left - right);

    expect(keys).toEqual(Array.from({ length: 60 }, (_, index) => index + 5));
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 5)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 11)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 28)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 64)).toBe(true);
  });

  it('preserves the intro paragraph for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('05.')).toBe(true);
    expect(commentary).toContain('[[list]]');
  });

  it('keeps the refreshed edge commentary readable', () => {
    const commentary = getGuaCommentary(64);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('64. ')).toBe(true);
    expect(commentary).toContain('[[list]]');
  });

  it('emits semantic list markers for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toContain('[[list]]');
    expect(commentary).toContain('[[item]]');
    expect(commentary).toContain('[[/list]]');
  });
});
