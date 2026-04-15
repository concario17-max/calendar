export interface DateSpec {
  start: { m: number; d: number };
  end: { m: number; d: number };
}

export interface SoulGroup {
  titleLine: string;
  weeksLabel: string;
  weekA: number | null;
  weekB: number | null;
  ranges: DateSpec[];
  block: string;
}

export interface SoulSection {
  week: number;
  range: string;
  text: string;
}

export type CommentarySource = 'gua' | 'yao';

export interface YaoData {
  titleLine: string;
  short: string;
  body: string;
  commentary?: string;
}

export interface GuaData {
  header: string;
  meta: string;
}
