import { describe, expect, it } from 'vitest';
import { YAO_COMMENTARY_BY_NUM, getYaoCommentary } from './yaoCommentary';

describe('yao commentary registry', () => {
  it('includes entries from both source files in folder order', () => {
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 25)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 97)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(YAO_COMMENTARY_BY_NUM, 193)).toBe(true);
  });

  it('preserves the intro paragraph for 25', () => {
    const commentary = getYaoCommentary(25);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('25. ')).toBe(true);
    expect(commentary).toContain('[[list]]');
  });

  it('keeps the refreshed third-bundle commentary readable', () => {
    const commentary = getYaoCommentary(193);

    expect(commentary).toBeDefined();
    expect(commentary?.startsWith('193. ')).toBe(true);
    expect(commentary).toContain('코벨');
  });

  it('emits semantic list markers for 25', () => {
    const commentary = getYaoCommentary(25);

    expect(commentary).toContain('[[list]]');
    expect(commentary).toContain('[[item]]');
    expect(commentary).toContain('[[/list]]');
  });
});
