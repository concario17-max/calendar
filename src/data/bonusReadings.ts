import type { BonusDayReading, BonusMonthDayKey } from '../types';

const EMPTY_NUMS: readonly number[] = [];
const APRIL_FIVE_GUA_NUMS = [24, 25, 26, 27];
const APRIL_FIVE_YAO_NUMS = Array.from({ length: 24 }, (_, index) => 26 + index);

function createBonusReading(
  key: BonusMonthDayKey,
  guaNums: readonly number[],
  yaoNums: readonly number[],
): BonusDayReading {
  const [monthText, dayText] = key.split('-');

  return {
    key,
    month: Number(monthText),
    day: Number(dayText),
    guaNums: [...guaNums],
    yaoNums: [...yaoNums],
  };
}

export const BONUS_DAY_READINGS: Record<BonusMonthDayKey, BonusDayReading> = {
  '4-2': createBonusReading('4-2', EMPTY_NUMS, EMPTY_NUMS),
  '4-3': createBonusReading('4-3', EMPTY_NUMS, EMPTY_NUMS),
  '4-4': createBonusReading('4-4', EMPTY_NUMS, EMPTY_NUMS),
  '4-5': createBonusReading('4-5', APRIL_FIVE_GUA_NUMS, APRIL_FIVE_YAO_NUMS),
  '4-6': createBonusReading('4-6', EMPTY_NUMS, EMPTY_NUMS),
};
