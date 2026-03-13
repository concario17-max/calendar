import { describe, it, expect } from 'vitest';
import { calcGuaNum, calcYaoNum } from './dateUtils';

describe('dateUtils Precision I Ching Logic', () => {
  describe('calcYaoNum (Static Date Mapping)', () => {
    // 2026 is non-leap. Cycle starts 2025-04-07 to 2026-04-01.
    it('should return 25 for April 7th (Start Date)', () => {
      const date = new Date(2025, 3, 7); 
      expect(calcYaoNum(date)).toBe(25);
    });

    it('should return 365 for March 13, 2026 (User Current Date)', () => {
      const date = new Date(2026, 2, 13); 
      expect(calcYaoNum(date)).toBe(365);
    });

    it('should return 378 for March 26, 2026', () => {
      const date = new Date(2026, 2, 26); 
      expect(calcYaoNum(date)).toBe(378);
    });

    it('should return 384 for April 1, 2026', () => {
      const date = new Date(2026, 3, 1); 
      expect(calcYaoNum(date)).toBe(384);
    });

    it('should return null for April 2nd to April 6th', () => {
      expect(calcYaoNum(new Date(2026, 3, 2))).toBe(null);
      expect(calcYaoNum(new Date(2026, 3, 6))).toBe(null);
    });

    it('should handle leap year 2024 shift (User Exception)', () => {
      // 2024 is leap. Cycle 2023-04-07 to 2024-04-01 contains 2.29.
      // 3/13/2024 should be 366 (shifted by +1)
      const dateMar13Leap = new Date(2024, 2, 13);
      expect(calcYaoNum(dateMar13Leap)).toBe(366);
    });
  });

  describe('calcGuaNum', () => {
    it('should return 5 for yaoNum 25', () => {
      expect(calcGuaNum(25)).toBe(5);
    });

    it('should return 1 for yaoNum 1', () => {
      expect(calcGuaNum(1)).toBe(1);
    });

    it('should return null if yaoNum is null', () => {
      expect(calcGuaNum(null)).toBe(null);
    });
  });
});
