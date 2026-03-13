import { describe, it, expect } from 'vitest';
import { applySentenceBalance, generateGuidedQuestion } from './logic';

describe('textUtils', () => {
  describe('applySentenceBalance', () => {
    it('should insert <br> at the best space for long parenthesized text', () => {
      const text = 'This is a test (with a very long sentence that needs to be balanced for visual symmetry).';
      const balanced = applySentenceBalance(text);
      expect(balanced).toContain('<br>');
      expect(balanced).toContain('(');
      expect(balanced).toContain(')');
    });

    it('should not break short parenthesized text', () => {
      const text = 'Short (text here).';
      const balanced = applySentenceBalance(text);
      expect(balanced).not.toContain('<br>');
    });
  });

  describe('generateGuidedQuestion', () => {
    it('should generate a question containing the title', () => {
      const title = '338. The Great Beginning';
      const question = generateGuidedQuestion(title);
      expect(question).toContain('The Great Beginning');
      expect(question).toMatch(/[?]$/);
    });

    it('should clean Chinese characters from title', () => {
      const title = '20. 震 (Thunder)';
      const question = generateGuidedQuestion(title);
      expect(question).not.toContain('震');
      expect(question).toContain('Thunder');
    });
  });
});
