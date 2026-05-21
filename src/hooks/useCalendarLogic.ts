import { useEffect, useMemo, useState } from 'react';
import { BONUS_DAY_READINGS } from '../data/bonusReadings';
import type { BonusGuaItem, BonusMonthDayKey, BonusYaoItem, SoulGroup } from '../types';
import { loadReadingDataBundle, type ReadingDataBundle } from '../utils/readingDataLoader';
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
  const [readingData, setReadingData] = useState<ReadingDataBundle | null>(null);

  useEffect(() => {
    let cancelled = false;

    void loadReadingDataBundle()
      .then((module) => {
        if (!cancelled) {
          setReadingData(module);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReadingData(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const { GUA_MAP, YAO_MAP, SOUL_GROUPS } = useMemo<{
    GUA_MAP: Map<number, string>;
    YAO_MAP: Map<number, string>;
    SOUL_GROUPS: SoulGroup[];
  }>(() => {
    if (!readingData) {
      return {
        GUA_MAP: new Map<number, string>(),
        YAO_MAP: new Map<number, string>(),
        SOUL_GROUPS: [],
      };
    }

    try {
      return {
        GUA_MAP: parseNumberedBlocks(readingData.GUA_TEXT),
        YAO_MAP: parseNumberedBlocks(readingData.YAO_TEXT),
        SOUL_GROUPS: parseSoulGroups(readingData.SOUL_TEXT),
      };
    } catch {
      return {
        GUA_MAP: new Map<number, string>(),
        YAO_MAP: new Map<number, string>(),
        SOUL_GROUPS: [],
      };
    }
  }, [readingData]);

  const yaoNum = calcYaoNum(selectedDate);
  const guaNum = calcGuaNum(yaoNum);

  const rawGua = guaNum !== null ? GUA_MAP.get(guaNum) : undefined;
  const rawYao = yaoNum !== null ? YAO_MAP.get(yaoNum) : undefined;

  const guaData = useMemo(() => (rawGua ? splitGua(rawGua) : null), [rawGua]);
  const yaoData = useMemo(() => (rawYao ? splitYao(rawYao) : null), [rawYao]);

  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const monthDayKey = `${month}-${day}`;
  const bonusDay = isBonusMonthDayKey(monthDayKey) ? BONUS_DAY_READINGS[monthDayKey] : null;
  const isBonusDay = bonusDay !== null;

  const bonusGuaItems = useMemo<BonusGuaItem[]>(() => {
    if (!bonusDay || !readingData) return [];

    return bonusDay.guaNums.map((num) => buildBonusGuaItem(num, readingData));
  }, [bonusDay, readingData]);

  const bonusYaoItems = useMemo<BonusYaoItem[]>(() => {
    if (!bonusDay || !readingData) return [];

    return bonusDay.yaoNums.map((num) => buildBonusYaoItem(num, readingData));
  }, [bonusDay, readingData]);

  const hitSoulGroup = useMemo(
    () => SOUL_GROUPS.find((group) => group.ranges.some((range) => isInRangeMD(month, day, range))),
    [SOUL_GROUPS, month, day],
  );
  const soulSections = useMemo(
    () => (hitSoulGroup ? parseWeekSectionsFromGroupBlock(hitSoulGroup.block) : []),
    [hitSoulGroup],
  );

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

function buildBonusGuaItem(num: number, readingData: ReadingDataBundle): BonusGuaItem {
  const commentary = readingData.getBonusGuaCommentary(num);

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

function buildBonusYaoItem(num: number, readingData: ReadingDataBundle): BonusYaoItem {
  const commentary = readingData.getBonusYaoCommentary(num);

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
