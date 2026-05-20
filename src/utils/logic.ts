export * from './textUtils';
export * from './dateUtils';
export * from './guaLogic';
export * from './yaoLogic';
export * from './soulLogic';

import { BONUS_MONTH_DAY_KEYS } from '../types';
import type { BonusMonthDayKey, MonthDayKey } from '../types';

export { BONUS_MONTH_DAY_KEYS };

export function createMonthDayKey(month: number, day: number): MonthDayKey {
  return `${month}-${day}`;
}

export function isBonusMonthDayKey(key: string): key is BonusMonthDayKey {
  return (BONUS_MONTH_DAY_KEYS as readonly string[]).includes(key);
}
