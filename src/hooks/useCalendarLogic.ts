import { useState, useMemo } from 'react';
import { GUA_TEXT, YAO_TEXT, SOUL_TEXT, getGuaCommentary, getYaoCommentary } from '../data';
import { 
  parseNumberedBlocks, parseSoulGroups, 
  calcYaoNum, calcGuaNum, splitGua, splitYao, 
  isInRangeMD, parseWeekSectionsFromGroupBlock
} from '../utils/logic';
import type { CommentarySource, CommentarySources } from '../types';

export function useCalendarLogic() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [commentarySource, setCommentarySource] = useState<CommentarySource>('yao');
  
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

  const yaoNum = calcYaoNum(selectedDate);
  const guaNum = calcGuaNum(yaoNum);

  const rawGua = guaNum !== null ? GUA_MAP.get(guaNum) : undefined;
  const rawYao = yaoNum !== null ? YAO_MAP.get(yaoNum) : undefined;

  const guaData = rawGua ? splitGua(rawGua) : null;
  const yaoData = rawYao ? splitYao(rawYao) : null;

  const guaCommentary = getGuaCommentary(guaNum);
  const yaoCommentary = getYaoCommentary(yaoNum);
  const commentarySources: CommentarySources = useMemo(
    () => ({
      gua: guaCommentary ?? '',
      yao: yaoCommentary ?? '',
    }),
    [guaCommentary, yaoCommentary],
  );

  // Soul Calendar
  const m = selectedDate.getMonth() + 1;
  const d = selectedDate.getDate();
  const hitSoulGroup = SOUL_GROUPS.find(g => g.ranges.some(r => isInRangeMD(m, d, r)));
  const soulSections = hitSoulGroup ? parseWeekSectionsFromGroupBlock(hitSoulGroup.block) : [];

  return {
    selectedDate,
    setSelectedDate,
    commentarySource,
    setCommentarySource,
    commentarySources,
    yaoNum,
    guaNum,
    guaData,
    yaoData,
    hitSoulGroup,
    soulSections
  };
}
