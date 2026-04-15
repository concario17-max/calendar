import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getGuaCommentary, getYaoCommentary } from '../data';
import { useCalendarLogic } from './useCalendarLogic';

describe('useCalendarLogic', () => {
  it('maps April 15, 2026 to gua 6 and yao 33', () => {
    const { result } = renderHook(() => useCalendarLogic());

    act(() => {
      result.current.setSelectedDate(new Date(2026, 3, 15));
    });

    expect(result.current.guaNum).toBe(6);
    expect(result.current.yaoNum).toBe(33);
    expect(getGuaCommentary(result.current.guaNum)).toBeDefined();
    expect(getYaoCommentary(result.current.yaoNum)).toBeDefined();
  });
});
