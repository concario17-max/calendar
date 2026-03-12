import type { DateSpec, SoulGroup, SoulSection, YaoData, GuaData } from '../types';

/**
 * 줄바꿈 문자 정규화 (\r\n -> \n)
 */
export function normalizeNewlines(text: string): string {
  return String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/**
 * 숫자 사이의 공백 제거
 */
export function cleanNumberSpaces(s: string): string {
  return s.replace(/(\d)\s+(\d)/g, '$1$2');
}

/**
 * 번호가 매겨진 텍스트 블록 파싱 (Map 반환)
 */
export function parseNumberedBlocks(text: string): Map<number, string> {
  const t = normalizeNewlines(text);
  const re = /^(\d+)\.\s/mg;
  const starts: { num: number; idx: number }[] = [];
  let m: RegExpExecArray | null;
  
  while ((m = re.exec(t)) !== null) {
    starts.push({ num: Number(m[1]), idx: m.index });
  }
  
  const map = new Map<number, string>();
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const end = (i + 1 < starts.length) ? starts[i + 1].idx : t.length;
    map.set(start.num, t.slice(start.idx, end).trim());
  }
  return map;
}

/**
 * 효(Yao) 블록 분할
 */
export function splitYao(block: string): YaoData {
  const b = normalizeNewlines(block);
  const lines = b.split('\n');
  let titleLine = (lines[0] || '').trim();

  // "338. ... . 바파" 구조 분할 처리 (정규식 개선)
  titleLine = titleLine.replace(/^(\d+\.\s+.*?\.)\s+(.*)$/, '$1\n$2');

  const rest = lines.slice(1).join('\n').trim();
  const paras = rest.split(/\n\s*\n/g).map((s: string) => s.trim()).filter(Boolean);
  return { 
    titleLine, 
    short: paras[0] || '', 
    body: paras.slice(1).join('\n\n') 
  };
}

/**
 * 괘(Gua) 블록 분할
 */
export function splitGua(block: string): GuaData {
  const b = normalizeNewlines(block);
  const lines = b.split('\n');
  let meta = lines.slice(1).join('\n').trim();
  // 불필요한 공백 제거
  meta = meta.replace(/(^|\n)[ \t]+(?=\()/g, '$1');
  return { 
    header: (lines[0] || '').trim(), 
    meta 
  };
}

/**
 * 영혼의 달력 날짜 스펙 파싱
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
 * 월/일을 연간 서수로 변환 (윤년 무시)
 */
export function mdToOrdinal(m: number, d: number): number {
  const dim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let ord = 0;
  for (let i = 1; i < m; i++) ord += dim[i - 1];
  return ord + d;
}

/**
 * 대상 날짜가 범위 내에 있는지 확인
 */
export function isInRangeMD(targetM: number, targetD: number, range: DateSpec): boolean {
  const t = mdToOrdinal(targetM, targetD);
  const s = mdToOrdinal(range.start.m, range.start.d);
  const e = mdToOrdinal(range.end.m, range.end.d);
  if (s <= e) return t >= s && t <= e;
  return (t >= s) || (t <= e);
}

/**
 * 주차 라벨 추출
 */
export function extractWeeksLabel(titleLine: string): { label: string; a: number | null; b: number | null } {
  const l = String(titleLine || '').trim();
  const m = l.match(/Weeks\s+(\d{1,2})\s+and\s+(\d{1,2})/i);
  if (m) return { label: `Weeks ${m[1]} & ${m[2]}`, a: +m[1], b: +m[2] };
  const m2 = l.match(/Weeks\s+(\d{1,2})/i);
  if (m2) return { label: `Weeks ${m2[1]}`, a: +m2[1], b: null };
  return { label: l || '노출', a: null, b: null };
}

/**
 * 영혼의 달력 그룹 파싱
 */
export function parseSoulGroups(text: string): SoulGroup[] {
  const t = normalizeNewlines(text);
  const lines = t.split('\n');
  const isGroupTitle = (line: string) => /CoTS\s+Verses\s+for\s+Weeks/i.test(String(line || '').trim());
  const isDateLine = (line: string) => {
    const l = String(line || '').trim();
    if (!l.includes('(') || !l.includes(')')) return false;
    const inside = l.slice(l.indexOf('(') + 1, l.lastIndexOf(')'));
    return /월/.test(inside);
  };

  const titleIdxs: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (isGroupTitle(lines[i])) titleIdxs.push(i);
  }

  const groups: SoulGroup[] = [];
  for (let i = 0; i < titleIdxs.length; i++) {
    const start = titleIdxs[i];
    const end = (i + 1 < titleIdxs.length) ? titleIdxs[i + 1] : lines.length;

    const titleLine = String(lines[start]).trim();
    const block = lines.slice(start, end).join('\n').trim();

    const ranges: DateSpec[] = [];
    for (let j = start; j < end; j++) {
      if (!isDateLine(lines[j])) continue;
      const l = String(lines[j]).trim();
      const inside = l.slice(l.indexOf('(') + 1, l.lastIndexOf(')'));
      const range = parseDateSpec(inside);
      if (range) ranges.push(range);
    }

    const wk = extractWeeksLabel(titleLine);
    groups.push({ titleLine, weeksLabel: wk.label, weekA: wk.a, weekB: wk.b, ranges, block });
  }
  return groups;
}

/**
 * 그룹 블록에서 주차별 섹션 파싱
 */
export function parseWeekSectionsFromGroupBlock(block: string): SoulSection[] {
  const t = normalizeNewlines(block);
  const lines = t.split('\n');
  const headerRe = /^\s*(\d{1,2})\s*주\s*\(([^)]+)\)\s*$/;
  const heads: { idx: number; week: number; range: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(headerRe);
    if (m) heads.push({ idx: i, week: +m[1], range: m[2].trim() });
  }
  if (heads.length === 0) return [];

  const sections: SoulSection[] = [];
  for (let i = 0; i < heads.length; i++) {
    const h = heads[i];
    const end = (i + 1 < heads.length) ? heads[i + 1].idx : lines.length;
    const bodyLines = lines.slice(h.idx + 1, end);
    const body = bodyLines.join('\n').replace(/^\s*\n+/, '').replace(/\n+\s*$/, '');
    sections.push({ week: h.week, range: h.range, text: body.trim() });
  }
  return sections;
}
