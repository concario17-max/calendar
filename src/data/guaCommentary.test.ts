import { describe, expect, it } from 'vitest';
import { GUA_COMMENTARY_BY_NUM, getGuaCommentary } from './guaCommentary';

describe('gua commentary registry', () => {
  it('includes the refreshed third-bundle entry', () => {
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 5)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(GUA_COMMENTARY_BY_NUM, 33)).toBe(true);
  });

  it('preserves the intro paragraph for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toContain('수괘');
  });

  it('keeps the refreshed third-bundle commentary readable', () => {
    const commentary = getGuaCommentary(33);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('33. ')).toBe(true);
    expect(commentary).toContain('둔괘');
  });

  it('emits semantic list markers for 5', () => {
    const commentary = getGuaCommentary(5);

    expect(commentary).toContain('[[list]]');
    expect(commentary).toContain('[[item]]');
    expect(commentary).toContain('[[/list]]');
  });
});
