import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getGuaCommentary, getYaoCommentary } from '../data';
import { useCalendarLogic } from './useCalendarLogic';

type BonusGuaItem = {
  num: number;
  guaData: { header: string; meta: string } | null;
};

type BonusYaoItem = {
  num: number;
  yaoData: { titleLine: string; short: string; body: string } | null;
};

type CalendarLogicWithBonus = ReturnType<typeof useCalendarLogic> & {
  isBonusDay?: boolean;
  bonusDay?: {
    key: string;
    month: number;
    day: number;
    guaNums: number[];
    yaoNums: number[];
  } | null;
  bonusGuaItems?: BonusGuaItem[];
  bonusYaoItems?: BonusYaoItem[];
};

describe('useCalendarLogic', () => {
  it('maps April 15, 2026 to gua 6 and yao 33', () => {
    const { result } = renderHook(() => useCalendarLogic());

    act(() => {
      result.current.setSelectedDate(new Date(2026, 3, 15));
    });

    const current = result.current as CalendarLogicWithBonus;

    expect(current.isBonusDay).toBe(false);
    expect(current.bonusDay ?? null).toBeNull();
    expect(current.bonusGuaItems ?? []).toHaveLength(0);
    expect(current.bonusYaoItems ?? []).toHaveLength(0);
    expect(current.guaNum).toBe(6);
    expect(current.yaoNum).toBe(33);
    expect(getGuaCommentary(current.guaNum)).toBeDefined();
    expect(getYaoCommentary(current.yaoNum)).toBeDefined();
  });

  it('flags April 5, 2026 as a bonus day and returns split bonus lists', () => {
    const { result } = renderHook(() => useCalendarLogic());

    act(() => {
      result.current.setSelectedDate(new Date(2026, 3, 5));
    });

    const current = result.current as CalendarLogicWithBonus;

    expect(current.isBonusDay).toBe(true);
    expect(current.bonusDay).toMatchObject({ key: '4-5', month: 4, day: 5 });
    expect(current.bonusDay?.guaNums).toHaveLength(4);
    expect(current.bonusDay?.yaoNums).toHaveLength(24);
    expect(current.bonusGuaItems).toBeDefined();
    expect(current.bonusYaoItems).toBeDefined();
    expect(current.bonusGuaItems).toHaveLength(current.bonusDay?.guaNums.length ?? 0);
    expect(current.bonusYaoItems).toHaveLength(current.bonusDay?.yaoNums.length ?? 0);

    const [firstGuaItem, secondGuaItem] = current.bonusGuaItems ?? [];
    const [firstYaoItem, secondYaoItem] = current.bonusYaoItems ?? [];

    expect(firstGuaItem.num).toBe(current.bonusDay?.guaNums[0]);
    expect(firstYaoItem.num).toBe(current.bonusDay?.yaoNums[0]);
    expect(secondGuaItem.num).toBe(current.bonusDay?.guaNums[1]);
    expect(secondYaoItem.num).toBe(current.bonusDay?.yaoNums[1]);
    expect(firstGuaItem.guaData).not.toBeNull();
    expect(secondGuaItem.guaData).not.toBeNull();
    expect(firstYaoItem.yaoData).not.toBeNull();
    expect(secondYaoItem.yaoData).not.toBeNull();
  });
});
