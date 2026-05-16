import { useMemo, useState } from 'react';
import { GUA_TEXT, SOUL_TEXT, YAO_TEXT } from '../data';
import { BONUS_DAY_READINGS } from '../data/bonusReadings';
import type { BonusGuaItem, BonusMonthDayKey, BonusYaoItem, SoulGroup } from '../types';
import {
  calcGuaNum,
  calcYaoNum,
  isInRangeMD,
  parseNumberedBlocks,
  parseSoulGroups,
  parseWeekSectionsFromGroupBlock,
  splitGua,
  splitYao,
} from '../utils/logic';

export function useCalendarLogic() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { GUA_MAP, YAO_MAP, SOUL_GROUPS } = useMemo<{
    GUA_MAP: Map<number, string>;
    YAO_MAP: Map<number, string>;
    SOUL_GROUPS: SoulGroup[];
  }>(() => {
    try {
      return {
        GUA_MAP: parseNumberedBlocks(GUA_TEXT),
        YAO_MAP: parseNumberedBlocks(YAO_TEXT),
        SOUL_GROUPS: parseSoulGroups(SOUL_TEXT),
      };
    } catch {
      return {
        GUA_MAP: new Map<number, string>(),
        YAO_MAP: new Map<number, string>(),
        SOUL_GROUPS: [],
      };
    }
  }, []);

  const yaoNum = calcYaoNum(selectedDate);
  const guaNum = calcGuaNum(yaoNum);

  const rawGua = guaNum !== null ? GUA_MAP.get(guaNum) : undefined;
  const rawYao = yaoNum !== null ? YAO_MAP.get(yaoNum) : undefined;

  const guaData = rawGua ? splitGua(rawGua) : null;
  const yaoData = rawYao ? splitYao(rawYao) : null;

  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const monthDayKey = `${month}-${day}`;
  const bonusDay = isBonusMonthDayKey(monthDayKey) ? BONUS_DAY_READINGS[monthDayKey] : null;
  const isBonusDay = bonusDay !== null;

  const bonusGuaItems = useMemo<BonusGuaItem[]>(() => {
    if (!bonusDay) return [];

    return bonusDay.guaNums.flatMap((num) => {
      const raw = GUA_MAP.get(num);
      if (!raw) return [];

      return [{ num, guaData: splitGua(raw) }];
    });
  }, [bonusDay, GUA_MAP]);

  const bonusYaoItems = useMemo<BonusYaoItem[]>(() => {
    if (!bonusDay) return [];

    return bonusDay.yaoNums.flatMap((num) => {
      const raw = YAO_MAP.get(num);
      if (!raw) return [];

      return [{ num, yaoData: splitYao(raw) }];
    });
  }, [bonusDay, YAO_MAP]);

  const hitSoulGroup = SOUL_GROUPS.find((group) => group.ranges.some((range) => isInRangeMD(month, day, range)));
  const soulSections = hitSoulGroup ? parseWeekSectionsFromGroupBlock(hitSoulGroup.block) : [];

  return {
    selectedDate,
    setSelectedDate,
    yaoNum,
    guaNum,
    guaData,
    yaoData,
    isBonusDay,
    bonusDay,
    bonusGuaItems,
    bonusYaoItems,
    hitSoulGroup,
    soulSections,
  };
}

function isBonusMonthDayKey(key: string): key is BonusMonthDayKey {
  return key === '4-2' || key === '4-3' || key === '4-4' || key === '4-5' || key === '4-6';
}
