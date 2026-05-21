import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCalendarLogic } from './useCalendarLogic';

vi.mock('../utils/readingDataLoader', () => ({
  loadReadingDataBundle: async () => ({
    GUA_TEXT: [
      '6. Example Gua',
      'Example gua meta',
      '',
      '1. Bonus Gua 1',
      'Bonus gua meta 1',
      '',
      '4. Bonus Gua 4',
      'Bonus gua meta 4',
    ].join('\n'),
    YAO_TEXT: [
      '33. Example Yao',
      'Example yao short',
      '',
      'Body text',
      '',
      '1. Bonus Yao 1',
      'Bonus yao short 1',
      '',
      'Bonus yao body 1',
      '',
      '24. Bonus Yao 24',
      'Bonus yao short 24',
      '',
      'Bonus yao body 24',
    ].join('\n'),
    SOUL_TEXT: ['CoTS Verses for Weeks 1 and 2', '1 (4/1-4/7)', 'Soul body'].join('\n'),
    getGuaCommentary: (num: number | null) =>
      num === 6
        ? ['6. Example Gua', '', 'Example gua commentary body'].join('\n')
        : typeof num === 'number' && num >= 1 && num <= 4
          ? [`${num}. Bonus Gua ${num}`, '', `Bonus gua commentary body ${num}`].join('\n')
          : undefined,
    getYaoCommentary: (num: number | null) =>
      num === 33
        ? ['33. Example Yao', 'Example yao short', 'Example yao body'].join('\n')
        : typeof num === 'number' && num >= 1 && num <= 24
          ? [`${num}. Bonus Yao ${num}`, `Bonus yao short ${num}`, '', `Bonus yao body ${num}`].join('\n')
          : undefined,
    getBonusGuaCommentary: (num: number | null) =>
      typeof num === 'number' && num >= 1 && num <= 4
        ? [`${num}. Bonus Gua ${num}`, '', `Bonus gua commentary body ${num}`].join('\n')
        : undefined,
    getBonusYaoCommentary: (num: number | null) =>
      typeof num === 'number' && num >= 1 && num <= 24
        ? [`${num}. Bonus Yao ${num}`, `Bonus yao short ${num}`, '', `Bonus yao body ${num}`].join('\n')
        : undefined,
  }),
}));

describe('useCalendarLogic', () => {
  it('resolves the leaf-loaded reading data before deriving the active entry', async () => {
    const { result } = renderHook(() => useCalendarLogic());

    expect(result.current.guaData).toBeNull();
    expect(result.current.yaoData).toBeNull();

    act(() => {
      result.current.setSelectedDate(new Date(2026, 3, 15));
    });

    await waitFor(() => {
      expect(result.current.guaData).not.toBeNull();
      expect(result.current.yaoData).not.toBeNull();
    });

    expect(result.current.isBonusDay).toBe(false);
    expect(result.current.bonusDay ?? null).toBeNull();
    expect(result.current.bonusGuaItems).toHaveLength(0);
    expect(result.current.bonusYaoItems).toHaveLength(0);
    expect(result.current.guaNum).toBe(6);
    expect(result.current.yaoNum).toBe(33);
    expect(result.current.guaData).toMatchObject({ header: expect.any(String), meta: expect.any(String) });
    expect(result.current.yaoData).toMatchObject({
      titleLine: expect.any(String),
      short: expect.any(String),
      body: expect.any(String),
    });
  });

  it('exposes the full bonus-day contract after the async leaf modules resolve', async () => {
    const { result } = renderHook(() => useCalendarLogic());

    act(() => {
      result.current.setSelectedDate(new Date(2026, 3, 5));
    });

    await waitFor(() => {
      expect(result.current.isBonusDay).toBe(true);
      expect(result.current.bonusDay).toMatchObject({ key: '4-5', month: 4, day: 5 });
      expect(result.current.bonusGuaItems).toHaveLength(4);
      expect(result.current.bonusYaoItems).toHaveLength(24);
    });

    expect(result.current.bonusDay?.guaNums).toEqual([1, 2, 3, 4]);
    expect(result.current.bonusDay?.yaoNums).toEqual(Array.from({ length: 24 }, (_, index) => index + 1));
    expect(result.current.bonusGuaItems?.map((item) => item.num)).toEqual([1, 2, 3, 4]);
    expect(result.current.bonusYaoItems?.map((item) => item.num)).toEqual(
      Array.from({ length: 24 }, (_, index) => index + 1),
    );
    expect(result.current.bonusGuaItems?.every((item) => item.guaData !== null)).toBe(true);
    expect(result.current.bonusYaoItems?.every((item) => item.yaoData !== null)).toBe(true);
  });
});
