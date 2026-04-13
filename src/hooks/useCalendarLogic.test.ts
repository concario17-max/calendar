import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCalendarLogic } from './useCalendarLogic';

describe('useCalendarLogic', () => {
  it('maps April 7 to gua 5 and yao 25', () => {
    const { result } = renderHook(() => useCalendarLogic());

    act(() => {
      result.current.setSelectedDate(new Date(2026, 3, 7));
    });

    expect(result.current.guaNum).toBe(5);
    expect(result.current.yaoNum).toBe(25);
    expect(result.current.commentarySources.gua.length).toBeGreaterThan(0);
    expect(result.current.commentarySources.yao.length).toBeGreaterThan(0);
  });
});
