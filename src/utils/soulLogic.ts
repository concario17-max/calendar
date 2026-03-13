import type { DateSpec, SoulGroup, SoulSection } from '../types';
import { normalizeNewlines } from './textUtils';

/**
 * 숫자 사이의 공백을 제거함
 */
export function cleanNumberSpaces(s: string): string {
  return s.replace(/(\d)\s+(?=\d)/g, '$1');
}

/**
 * 날짜 범위를 파싱함
 */
export function parseDateSpec(specRaw: string): DateSpec | null {
  const spec = cleanNumberSpaces(String(specRaw || '').trim())
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/\s*-\s*/g, '-');

  let m = spec.match(/^(\d{1,2})월\s*(\d{1,2})$/);
  if (m) return { start: { m: +m[1], d: +m[2] }, end: { m: +m[1], d: +m[2] } };

  m = spec.match(/^(\d{1,2})월\s*(\d{1,2})-(\d{1,2})$/);
  if (m) return { start: { m: +m[1], d: +m[2] }, end: { m: +m[1], d: +m[3] } };

  m = spec.match(/^(\d{1,2})월\s*(\d{1,2})-(\d{1,2})월\s*(\d{1,2})$/);
  if (m) return { start: { m: +m[1], d: +m[2] }, end: { m: +m[3], d: +m[4] } };

  return null;
}

/**
 * 월/일을 연초 기준 일수로 변환함 (윤년 미고려)
 */
export function mdToOrdinal(m: number, d: number): number {
  const dim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let ord = 0;
  for (let i = 1; i < m; i++) ord += dim[i - 1];
  return ord + d;
}

/**
 * 특정 날짜가 범위 내에 있는지 확인함
 */
export function isInRangeMD(targetM: number, targetD: number, range: DateSpec): boolean {
  const t = mdToOrdinal(targetM, targetD);
  const s = mdToOrdinal(range.start.m, range.start.d);
  const e = mdToOrdinal(range.end.m, range.end.d);
  if (s <= e) return t >= s && t <= e;
  return (t >= s) || (t <= e);
}

/**
 * 제목 줄에서 주차 라벨을 추출함
 */
export function extractWeeksLabel(titleLine: string): { label: string; a: number | null; b: number | null } {
  const l = String(titleLine || '').trim();
  const m = l.match(/Weeks\s+(\d{1,2})\s+and\s+(\d{1,2})/i);
  if (m) return { label: `Weeks ${m[1]} & ${m[2]}`, a: +m[1], b: +m[2] };
  const m2 = l.match(/Weeks\s+(\d{1,2})/i);
  if (m2) return { label: `Weeks ${m2[1]}`, a: +m2[1], b: null };
  return { label: l || '노출', a: null, b: null };
}

const isGroupTitle = (line: string) => /CoTS\s+Verses\s+for\s+Weeks/i.test(String(line || '').trim());

const isDateLine = (line: string) => {
  const l = String(line || '').trim();
  if (!l.includes('(') || !l.includes(')')) return false;
  const inside = l.slice(l.indexOf('(') + 1, l.lastIndexOf(')'));
  return /월/.test(inside);
};

/**
 * 영혼의 달력 그룹들을 파싱함
 */
export function parseSoulGroups(text: string): SoulGroup[] {
  const t = normalizeNewlines(text);
  const lines = t.split('\n');
  const titleIdxs = lines.reduce((acc: number[], line, i) => {
    if (isGroupTitle(line)) acc.push(i);
    return acc;
  }, []);

  return titleIdxs.map((start, i) => {
    const end = (i + 1 < titleIdxs.length) ? titleIdxs[i + 1] : lines.length;
    return parseSingleGroup(lines, start, end);
  });
}

function parseSingleGroup(lines: string[], start: number, end: number): SoulGroup {
  const titleLine = lines[start].trim();
  const block = lines.slice(start, end).join('\n').trim();
  const ranges = lines.slice(start, end)
    .filter(isDateLine)
    .map(line => {
      const l = line.trim();
      return parseDateSpec(l.slice(l.indexOf('(') + 1, l.lastIndexOf(')')));
    })
    .filter((r): r is DateSpec => r !== null);

  const wk = extractWeeksLabel(titleLine);
  return { titleLine, weeksLabel: wk.label, weekA: wk.a, weekB: wk.b, ranges, block };
}

/**
 * 그룹 블록 내에서 주차별 섹션을 분리함
 */
export function parseWeekSectionsFromGroupBlock(block: string): SoulSection[] {
  const t = normalizeNewlines(block);
  const lines = t.split('\n');
  const headerRe = /^\s*(\d{1,2})\s*주\s*\(([^)]+)\)\s*$/;
  
  const heads = lines.reduce((acc: { idx: number; week: number; range: string }[], line, i) => {
    const m = line.match(headerRe);
    if (m) acc.push({ idx: i, week: +m[1], range: m[2].trim() });
    return acc;
  }, []);

  if (heads.length === 0) return [];

  return heads.map((h, i) => {
    const end = (i + 1 < heads.length) ? heads[i + 1].idx : lines.length;
    const bodyText = lines.slice(h.idx + 1, end).join('\n')
      .replace(/^\s*\n+/, '')
      .replace(/\n+\s*$/, '')
      .trim();
    return { week: h.week, range: h.range, text: bodyText };
  });
}
