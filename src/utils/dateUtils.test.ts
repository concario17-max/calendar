import { describe, it, expect } from 'vitest';
import { calcDayIndex, getCycleStartUtc, toUtcDateOnly } from './dateUtils';

describe('dateUtils', () => {
  const CONFIG = {
    START_MONTH: 3, // logic.ts와 맞춤 (0-indexed 3 is April? No, 1-indexed 3 is March)
    START_DAY: 25,
  };

  describe('toUtcDateOnly', () => {
    it('should return correct UTC timestamp for given y, m, d', () => {
      const ts = toUtcDateOnly(2024, 4, 7);
      expect(new Date(ts).toISOString()).toBe('2024-04-07T00:00:00.000Z');
    });
  });

  describe('getCycleStartUtc', () => {
    it('should return start date of the same year if target is after start date', () => {
      const target = new Date(2024, 3, 26); // April 26, 2024 (Month is 0-indexed)
      const startUtc = getCycleStartUtc(target, CONFIG.START_MONTH, CONFIG.START_DAY);
      expect(new Date(startUtc).toISOString()).toBe('2024-03-25T00:00:00.000Z');
    });

    it('should return start date of the previous year if target is before start date', () => {
      const target = new Date(2024, 2, 24); // March 24, 2024
      const startUtc = getCycleStartUtc(target, CONFIG.START_MONTH, CONFIG.START_DAY);
      expect(new Date(startUtc).toISOString()).toBe('2023-03-25T00:00:00.000Z');
    });
  });

  describe('calcDayIndex', () => {
    it('should return 0 for the start date', () => {
      const target = new Date(2024, 2, 25); // March 25, 2024
      const index = calcDayIndex(target, CONFIG.START_MONTH, CONFIG.START_DAY);
      expect(index).toBe(0);
    });

    it('should calculate across year boundaries correctly', () => {
      const start = Date.UTC(2024, 2, 25);
      const targetUtc = Date.UTC(2025, 2, 24);
      const target = new Date(targetUtc);
      const index = calcDayIndex(target, CONFIG.START_MONTH, CONFIG.START_DAY);
      const expected = Math.floor((targetUtc - start) / 86400000);
      expect(index).toBe(expected);
    });
  });
});
