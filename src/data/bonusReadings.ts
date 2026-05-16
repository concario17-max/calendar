import { BONUS_GUA_COMMENTARY_NUMS } from './bonusGuaCommentary';
import { BONUS_YAO_COMMENTARY_NUMS } from './bonusYaoCommentary';
import type { BonusDayReading, BonusMonthDayKey } from '../types';

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
  '4-2': createBonusReading('4-2', BONUS_GUA_COMMENTARY_NUMS, BONUS_YAO_COMMENTARY_NUMS),
  '4-3': createBonusReading('4-3', BONUS_GUA_COMMENTARY_NUMS, BONUS_YAO_COMMENTARY_NUMS),
  '4-4': createBonusReading('4-4', BONUS_GUA_COMMENTARY_NUMS, BONUS_YAO_COMMENTARY_NUMS),
  '4-5': createBonusReading('4-5', BONUS_GUA_COMMENTARY_NUMS, BONUS_YAO_COMMENTARY_NUMS),
  '4-6': createBonusReading('4-6', BONUS_GUA_COMMENTARY_NUMS, BONUS_YAO_COMMENTARY_NUMS),
};
