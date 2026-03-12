import { useState, useMemo } from 'react';
import { GUA_TEXT, YAO_TEXT, SOUL_TEXT } from '../data';
import { 
  parseNumberedBlocks, parseSoulGroups, calcDayIndex, inRange, 
  calcYaoNum, calcGuaNum, splitGua, splitYao, 
  isInRangeMD, parseWeekSectionsFromGroupBlock
} from '../utils/logic';

export function useCalendarLogic() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const { GUA_MAP, YAO_MAP, SOUL_GROUPS } = useMemo(() => {
    try {
      return {
        GUA_MAP: parseNumberedBlocks(GUA_TEXT),
        YAO_MAP: parseNumberedBlocks(YAO_TEXT),
        SOUL_GROUPS: parseSoulGroups(SOUL_TEXT)
      };
    } catch {
      return { GUA_MAP: new Map(), YAO_MAP: new Map(), SOUL_GROUPS: [] };
    }
  }, []);

  const dayIndex = calcDayIndex(selectedDate);
  const isValidRange = inRange(dayIndex);
  
  const yaoNum = isValidRange ? calcYaoNum(dayIndex) : null;
  const guaNum = isValidRange ? calcGuaNum(dayIndex) : null;

  const rawGua = guaNum !== null ? GUA_MAP.get(guaNum) : undefined;
  const rawYao = yaoNum !== null ? YAO_MAP.get(yaoNum) : undefined;

  const guaData = rawGua ? splitGua(rawGua) : null;
  const yaoData = rawYao ? splitYao(rawYao) : null;

  // Soul Calendar
  const m = selectedDate.getMonth() + 1;
  const d = selectedDate.getDate();
  const hitSoulGroup = SOUL_GROUPS.find(g => g.ranges.some(r => isInRangeMD(m, d, r)));
  const soulSections = hitSoulGroup ? parseWeekSectionsFromGroupBlock(hitSoulGroup.block) : [];

  return {
    selectedDate,
    setSelectedDate,
    dayIndex,
    isValidRange,
    yaoNum,
    guaNum,
    guaData,
    yaoData,
    hitSoulGroup,
    soulSections
  };
}
