import type { CommentarySource } from '../types';

export type LearningImageLoader = () => Promise<string>;
export type LearningImageLoaderMap = Record<number, LearningImageLoader>;

export function buildLearningImageLoaderMap(modules: Record<string, LearningImageLoader>): LearningImageLoaderMap {
  const entries = Object.entries(modules)
    .map(([path, loader]) => {
      const match = path.match(/\/(\d+)\.[^.]+$/);
      if (!match) {
        return null;
      }

      return [Number(match[1]), loader] as const;
    })
    .filter((entry): entry is readonly [number, LearningImageLoader] => entry !== null);

  return Object.fromEntries(entries);
}

const yaoLearningImageModules = import.meta.glob('../../image/효사/*.png', {
  import: 'default',
}) as Record<string, LearningImageLoader>;
const guaLearningImageModules = import.meta.glob('../../image/괘사/*.png', {
  import: 'default',
}) as Record<string, LearningImageLoader>;
const bonusYaoLearningImageModules = import.meta.glob('../../보너스/효사/*.png', {
  import: 'default',
}) as Record<string, LearningImageLoader>;
const bonusGuaLearningImageModules = import.meta.glob('../../보너스/괘사/*.png', {
  import: 'default',
}) as Record<string, LearningImageLoader>;
const yaoLearningImageLoaderMap = buildLearningImageLoaderMap(yaoLearningImageModules);
const guaLearningImageLoaderMap = buildLearningImageLoaderMap(guaLearningImageModules);
const bonusYaoLearningImageLoaderMap = buildLearningImageLoaderMap(bonusYaoLearningImageModules);
const bonusGuaLearningImageLoaderMap = buildLearningImageLoaderMap(bonusGuaLearningImageModules);

export function getLearningImageLoader(
  source: CommentarySource,
  num: number | null,
  isBonusSelection: boolean,
): LearningImageLoader | null {
  if (num === null) {
    return null;
  }

  if (source === 'yao') {
    return isBonusSelection ? bonusYaoLearningImageLoaderMap[num] ?? null : yaoLearningImageLoaderMap[num] ?? null;
  }

  if (source === 'soul') {
    return null;
  }

  return isBonusSelection ? bonusGuaLearningImageLoaderMap[num] ?? null : guaLearningImageLoaderMap[num] ?? null;
}
