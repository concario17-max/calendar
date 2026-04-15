import { describe, expect, it } from 'vitest';
import { GUA_COMMENTARY_BY_NUM, getGuaCommentary } from './guaCommentary';

describe('gua commentary registry', () => {
  it('includes entries from both source files in folder order', () => {
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 5)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 17)).toBe(true);
  });

  it('preserves the intro paragraph for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toContain('수괘');
  });

  it('emits semantic list markers for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toContain('[[list]]');
    expect(commentary).toContain('[[item]]');
    expect(commentary).toContain('[[/list]]');
  });
});
