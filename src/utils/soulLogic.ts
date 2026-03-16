import type { DateSpec, SoulGroup, SoulSection } from '../types';
import { normalizeNewlines } from './textUtils';

/**
 * Removes stray spaces between adjacent digits.
 */
export function cleanNumberSpaces(s: string): string {
  return s.replace(/(\d)\s+(?=\d)/g, '$1');
}

/**
 * Parses a month/day range from noisy source text.
 */
export function parseDateSpec(specRaw: string): DateSpec | null {
  const spec = cleanNumberSpaces(String(specRaw || '').trim())
    .replace(/[^\d]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const nums = spec.match(/\d{1,2}/g)?.map(Number) ?? [];

  if (nums.length === 2) {
    return { start: { m: nums[0], d: nums[1] }, end: { m: nums[0], d: nums[1] } };
  }

  if (nums.length === 3) {
    return { start: { m: nums[0], d: nums[1] }, end: { m: nums[0], d: nums[2] } };
  }

  if (nums.length >= 4) {
    return { start: { m: nums[0], d: nums[1] }, end: { m: nums[2], d: nums[3] } };
  }

  return null;
}

/**
 * Converts month/day into an ordinal day number for a non-leap year.
 */
export function mdToOrdinal(m: number, d: number): number {
  const dim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let ord = 0;
  for (let i = 1; i < m; i++) ord += dim[i - 1];
  return ord + d;
}

/**
 * Checks whether a target month/day falls inside the provided range.
 */
export function isInRangeMD(targetM: number, targetD: number, range: DateSpec): boolean {
  const t = mdToOrdinal(targetM, targetD);
  const s = mdToOrdinal(range.start.m, range.start.d);
  const e = mdToOrdinal(range.end.m, range.end.d);
  if (s <= e) return t >= s && t <= e;
  return t >= s || t <= e;
}

/**
 * Extracts a display label like "52주 · 1주" from a group heading.
 */
export function extractWeeksLabel(titleLine: string): { label: string; a: number | null; b: number | null } {
  const l = String(titleLine || '').trim();
  const m = l.match(/Weeks\s+(\d{1,2})\s+and\s+(\d{1,2})/i);
  if (m) return { label: `${m[1]}주 · ${m[2]}주`, a: +m[1], b: +m[2] };

  const m2 = l.match(/Weeks\s+(\d{1,2})/i);
  if (m2) return { label: `${m2[1]}주`, a: +m2[1], b: null };

  return { label: l || '주차 정보 없음', a: null, b: null };
}

const isGroupTitle = (line: string) => /CoTS\s+Verses\s+for\s+Weeks/i.test(String(line || '').trim());

const isDateLine = (line: string) => {
  const l = String(line || '').trim();
  if (!l.includes('(') || !l.includes(')')) return false;
  const inside = l.slice(l.indexOf('(') + 1, l.lastIndexOf(')'));
  return /\d/.test(inside);
};

/**
 * Parses all soul-calendar groups from the raw source text.
 */
export function parseSoulGroups(text: string): SoulGroup[] {
  const t = normalizeNewlines(text);
  const lines = t.split('\n');
  const titleIdxs = lines.reduce((acc: number[], line, i) => {
    if (isGroupTitle(line)) acc.push(i);
    return acc;
  }, []);

  return titleIdxs.map((start, i) => {
    const end = i + 1 < titleIdxs.length ? titleIdxs[i + 1] : lines.length;
    return parseSingleGroup(lines, start, end);
  });
}

function parseSingleGroup(lines: string[], start: number, end: number): SoulGroup {
  const titleLine = lines[start].trim();
  const block = lines.slice(start, end).join('\n').trim();
  const ranges = lines.slice(start, end)
    .filter(isDateLine)
    .map((line) => {
      const l = line.trim();
      return parseDateSpec(l.slice(l.indexOf('(') + 1, l.lastIndexOf(')')));
    })
    .filter((r): r is DateSpec => r !== null);

  const wk = extractWeeksLabel(titleLine);
  return { titleLine, weeksLabel: wk.label, weekA: wk.a, weekB: wk.b, ranges, block };
}

/**
 * Splits a group block into per-week sections.
 */
export function parseWeekSectionsFromGroupBlock(block: string): SoulSection[] {
  const t = normalizeNewlines(block);
  const lines = t.split('\n');
  const headerRe = /^\s*(\d{1,2})[^\d(]*\(([^)]+)\)(.*)$/;

  const heads = lines.reduce((acc: { idx: number; week: number; range: string; tail: string }[], line, i) => {
    const m = line.match(headerRe);
    if (m) acc.push({ idx: i, week: +m[1], range: m[2].trim(), tail: m[3].trim() });
    return acc;
  }, []);

  if (heads.length === 0) return [];

  return heads.map((h, i) => {
    const end = i + 1 < heads.length ? heads[i + 1].idx : lines.length;
    const bodyText = lines.slice(h.idx + 1, end).join('\n')
      .replace(/^\s*\n+/, '')
      .replace(/\n+\s*$/, '')
      .trim();

    const text = h.tail ? `${h.tail}\n${bodyText}`.trim() : bodyText;
    return { week: h.week, range: h.range, text };
  });
}
