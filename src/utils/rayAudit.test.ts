import { describe, it, expect } from 'vitest';
import { 
  cleanNumberSpaces, parseDateSpec, isInRangeMD 
} from './soulLogic';
import { calcGuaNum, calcYaoNum } from './dateUtils';
import { normalizeNewlines, parseNumberedBlocks } from './textUtils';

describe('Ray Global Audit: Boundary & Performance', () => {
  
  describe('Soul Calendar Boundary Tests', () => {
    it('cleanNumberSpaces should handle various empty/null-like inputs', () => {
      expect(cleanNumberSpaces('')).toBe('');
      expect(cleanNumberSpaces('1 2 3')).toBe('123');
    });

    it('parseDateSpec should return null for garbage input', () => {
      expect(parseDateSpec('invalid-date')).toBeNull();
      expect(parseDateSpec('')).toBeNull();
    });

    it('isInRangeMD should handle year wrap-around', () => {
      const range = { start: { m: 12, d: 25 }, end: { m: 1, d: 5 } };
      expect(isInRangeMD(1, 1, range)).toBe(true);
      expect(isInRangeMD(12, 30, range)).toBe(true);
      expect(isInRangeMD(6, 1, range)).toBe(false);
    });
  });

  describe('I Ching Logic Precision', () => {
    it('calcYaoNum should handle critical date 4/1 and 4/7 strictly', () => {
      expect(calcYaoNum(new Date(2026, 3, 1))).toBe(384);
      expect(calcYaoNum(new Date(2026, 3, 2))).toBeNull();
      expect(calcYaoNum(new Date(2026, 3, 6))).toBeNull();
      expect(calcYaoNum(new Date(2025, 3, 7))).toBe(25);
    });

    it('calcGuaNum should follow the mathematical 6-yao sequence', () => {
      expect(calcGuaNum(1)).toBe(1);
      expect(calcGuaNum(6)).toBe(1);
      expect(calcGuaNum(7)).toBe(2);
      expect(calcGuaNum(384)).toBe(64);
    });
  });

  describe('Text Parsing Robustness', () => {
    it('parseNumberedBlocks should handle massive input without regression', () => {
      const largeText = Array.from({ length: 100 }, (_, i) => `${i + 1}. Block ${i + 1}`).join('\n\n');
      const map = parseNumberedBlocks(largeText);
      expect(map.size).toBe(100);
      expect(map.get(1)).toContain('Block 1');
      expect(map.get(100)).toContain('Block 100');
    });

    it('normalizeNewlines should be idempotent', () => {
      const text = "a\r\nb\rc";
      const normalized = normalizeNewlines(text);
      expect(normalizeNewlines(normalized)).toBe(normalized);
    });
  });

});
