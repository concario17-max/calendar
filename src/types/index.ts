export interface MonthDay {
  m: number;
  d: number;
}

export interface DateRange {
  start: MonthDay;
  end: MonthDay;
}

export type DateSpec = DateRange;

export interface SoulGroup {
  titleLine: string;
  weeksLabel: string;
  weekA: number | null;
  weekB: number | null;
  ranges: DateRange[];
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
export const BONUS_MONTH_DAY_KEYS = ['4-2', '4-3', '4-4', '4-5', '4-6'] as const;
export type BonusMonthDayKey = (typeof BONUS_MONTH_DAY_KEYS)[number];

export interface BonusDayReading {
  key: BonusMonthDayKey;
  month: number;
  day: number;
  guaNums: number[];
  yaoNums: number[];
}

export interface BonusItemBase {
  num: number;
  commentary?: string;
  commentaryMissing?: boolean;
}

export interface BonusGuaItem extends BonusItemBase {
  guaData: GuaData;
}

export interface BonusYaoItem extends BonusItemBase {
  yaoData: YaoData;
}
