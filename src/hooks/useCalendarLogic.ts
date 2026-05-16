import { useMemo, useState } from 'react';
import { GUA_TEXT, SOUL_TEXT, YAO_TEXT, getBonusGuaCommentary, getBonusYaoCommentary } from '../data';
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

    return bonusDay.guaNums.map((num) => buildBonusGuaItem(num));
  }, [bonusDay]);

  const bonusYaoItems = useMemo<BonusYaoItem[]>(() => {
    if (!bonusDay) return [];

    return bonusDay.yaoNums.map((num) => buildBonusYaoItem(num));
  }, [bonusDay]);

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

function buildBonusGuaItem(num: number): BonusGuaItem {
  const commentary = getBonusGuaCommentary(num);

  if (commentary) {
    return {
      num,
      commentary,
      guaData: splitGua(commentary),
    };
  }

  const fallbackCommentary = `${num}. (보너스 괘사 해설 누락)`;
  return {
    num,
    commentary: undefined,
    commentaryMissing: true,
    guaData: splitGua(fallbackCommentary),
  };
}

function buildBonusYaoItem(num: number): BonusYaoItem {
  const commentary = getBonusYaoCommentary(num);

  if (commentary) {
    return {
      num,
      commentary,
      yaoData: splitYao(commentary),
    };
  }

  const fallbackCommentary = `${num}. (보너스 효사 해설 누락)`;
  return {
    num,
    commentary: undefined,
    commentaryMissing: true,
    yaoData: splitYao(fallbackCommentary),
  };
}
