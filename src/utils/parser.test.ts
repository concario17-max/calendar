import { describe, expect, it } from 'vitest';
import {
  parseNumberedBlocks,
  parseSoulGroups,
  parseWeekSectionsFromGroupBlock,
  splitGua,
  splitYao,
} from './logic';

describe('parser', () => {
  describe('parseNumberedBlocks', () => {
    it('should parse numbered blocks into a Map', () => {
      const text = '1. First block\n2. Second block\n3. Third block';
      const map = parseNumberedBlocks(text);
      expect(map.size).toBe(3);
      expect(map.get(1)).toBe('1. First block');
      expect(map.get(2)).toBe('2. Second block');
    });
  });

  describe('splitYao', () => {
    it('should split yao block into titleLine, short, and body', () => {
      const block = '338. Title.\nSummary paragraph.\n\nBody paragraph 1.\n\nBody paragraph 2.';
      const result = splitYao(block);
      expect(result.titleLine).toBe('338. Title.');
      expect(result.short).toBe('Summary paragraph.');
      expect(result.body).toBe('Body paragraph 1.\n\nBody paragraph 2.');
    });

    it('should split special title format correctly', () => {
      const block = '338. Title. Extra Info\nSummary';
      const result = splitYao(block);
      expect(result.titleLine).toBe('338. Title.\nExtra Info');
    });
  });

  describe('splitGua', () => {
    it('should split gua block into header and meta', () => {
      const block = 'Gua Header\nMeta info (1)\n  (2)';
      const result = splitGua(block);
      expect(result.header).toBe('Gua Header');
      expect(result.meta).toBe('Meta info (1)\n(2)');
    });
  });

  describe('parseSoulGroups', () => {
    it('should parse complex soul calendar text into groups', () => {
      const text = `
CoTS Verses for Weeks 1 and 2
(4/7-20)
...
CoTS Verses for Weeks 3
(4/21-27)
...
`;
      const groups = parseSoulGroups(text);
      expect(groups.length).toBe(2);
      expect(groups[0].weeksLabel).toBe('1주 · 2주');
      expect(groups[1].weeksLabel).toBe('3주');
    });
  });

  describe('parseWeekSectionsFromGroupBlock', () => {
    it('should preserve trailing subtitle text after the date range', () => {
      const block = `
1주 (4월 7-13) 부활절 / 봄
첫 번째 본문

2주 (4월 14-20)
두 번째 본문
`.trim();

      const sections = parseWeekSectionsFromGroupBlock(block);
      expect(sections).toHaveLength(2);
      expect(sections[0]).toEqual({
        week: 1,
        range: '4월 7-13',
        text: '부활절 / 봄\n첫 번째 본문',
      });
    });
  });
});
