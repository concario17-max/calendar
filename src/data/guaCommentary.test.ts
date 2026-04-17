import { describe, expect, it } from 'vitest';
import { GUA_COMMENTARY_BY_NUM, getGuaCommentary } from './guaCommentary';

describe('gua commentary registry', () => {
  it('includes the refreshed fourth-bundle entry', () => {
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 5)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 49)).toBe(true);
  });

  it('preserves the intro paragraph for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('05.')).toBe(true);
    expect(commentary).toContain('[[list]]');
  });

  it('keeps the refreshed fourth-bundle commentary readable', () => {
    const commentary = getGuaCommentary(49);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('49. ')).toBe(true);
    expect(commentary).toContain('[[list]]');
  });

  it('emits semantic list markers for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toContain('[[list]]');
    expect(commentary).toContain('[[item]]');
    expect(commentary).toContain('[[/list]]');
  });
});
