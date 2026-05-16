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

export type CommentarySource = 'gua' | 'yao' | 'soul';

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

export type MonthDayKey = `${number}-${number}`;
export type BonusMonthDayKey = '4-2' | '4-3' | '4-4' | '4-5' | '4-6';

export interface BonusDayReading {
  key: BonusMonthDayKey;
  month: number;
  day: number;
  guaNums: number[];
  yaoNums: number[];
}

export interface BonusGuaItem {
  num: number;
  commentary?: string;
  commentaryMissing?: boolean;
  guaData: GuaData;
}

export interface BonusYaoItem {
  num: number;
  commentary?: string;
  commentaryMissing?: boolean;
  yaoData: YaoData;
}
