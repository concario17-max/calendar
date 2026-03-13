import { describe, it, expect } from 'vitest';
import { calcDayIndex, getCycleStartUtc, toUtcDateOnly, calcGuaNum, calcYaoNum, inRange } from './dateUtils';

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

  describe('calcYaoNum', () => {
    it('should return 25 for dayIndex 0 (March 25th)', () => {
      expect(calcYaoNum(0)).toBe(25);
    });

    it('should return 384 for dayIndex 359', () => {
      expect(calcYaoNum(359)).toBe(384);
    });

    it('should wrap around and return 1 for dayIndex 360', () => {
      expect(calcYaoNum(360)).toBe(1);
    });

    it('should return 5 for dayIndex 364 (March 24th)', () => {
      expect(calcYaoNum(364)).toBe(5);
    });
  });

  describe('calcGuaNum', () => {
    it('should return 5 for yaoNum 25', () => {
      expect(calcGuaNum(25)).toBe(5);
    });

    it('should return 64 for yaoNum 384', () => {
      expect(calcGuaNum(384)).toBe(64);
    });

    it('should return 1 for yaoNum 1', () => {
      expect(calcGuaNum(1)).toBe(1);
    });

    it('should return 1 for yaoNum 6', () => {
      expect(calcGuaNum(6)).toBe(1);
    });

    it('should return 2 for yaoNum 7', () => {
      expect(calcGuaNum(7)).toBe(2);
    });
  });

  describe('inRange', () => {
    it('should return true for dayIndex within 0-364', () => {
      expect(inRange(0)).toBe(true);
      expect(inRange(364)).toBe(true);
    });

    it('should return false for out of range dayIndex', () => {
      expect(inRange(-1)).toBe(false);
      expect(inRange(365)).toBe(false);
    });
  });
});
