import type { CommentarySource } from '../types';

export type LearningImageLoader = () => Promise<string>;
export type LearningImageLoaderMap = Record<number, LearningImageLoader>;

const learningImagePendingCache = new Map<string, Promise<string>>();
const learningImageResolvedCache = new Map<string, string>();

function getLearningImageCacheKey(path: string): string {
  return path;
}

export function getCachedLearningImageUrl(path: string): string | null {
  return learningImageResolvedCache.get(getLearningImageCacheKey(path)) ?? null;
}

function createCachedLearningImageLoader(path: string, loader: LearningImageLoader): LearningImageLoader {
  return () => {
    const cacheKey = getLearningImageCacheKey(path);
    const cachedResolvedUrl = learningImageResolvedCache.get(cacheKey);

    if (cachedResolvedUrl) {
      return Promise.resolve(cachedResolvedUrl);
    }

    const cachedResult = learningImagePendingCache.get(cacheKey);

    if (cachedResult) {
      return cachedResult;
    }

    const resolvedResult = loader()
      .then((url) => {
        learningImageResolvedCache.set(cacheKey, url);
        learningImagePendingCache.delete(cacheKey);
        return url;
      })
      .catch((error) => {
        learningImagePendingCache.delete(cacheKey);
        learningImageResolvedCache.delete(cacheKey);
        throw error;
      });

    learningImagePendingCache.set(cacheKey, resolvedResult);
    return resolvedResult;
  };
}

export function buildLearningImageLoaderMap(modules: Record<string, LearningImageLoader>): LearningImageLoaderMap {
  const entries = Object.entries(modules)
    .map(([path, loader]) => {
      const match = path.match(/\/(\d+)\.[^.]+$/);
      if (!match) {
        return null;
      }

      return [Number(match[1]), createCachedLearningImageLoader(path, loader)] as const;
    })
    .filter((entry): entry is readonly [number, LearningImageLoader] => entry !== null);

  return Object.fromEntries(entries);
}

function buildLearningImagePathMap(modules: Record<string, LearningImageLoader>): Record<number, string> {
  const entries = Object.entries(modules)
    .map(([path]) => {
      const match = path.match(/\/(\d+)\.[^.]+$/);
      if (!match) {
        return null;
      }

      return [Number(match[1]), path] as const;
    })
    .filter((entry): entry is readonly [number, string] => entry !== null);

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
const yaoLearningImagePathMap = buildLearningImagePathMap(yaoLearningImageModules);
const guaLearningImagePathMap = buildLearningImagePathMap(guaLearningImageModules);
const bonusYaoLearningImagePathMap = buildLearningImagePathMap(bonusYaoLearningImageModules);
const bonusGuaLearningImagePathMap = buildLearningImagePathMap(bonusGuaLearningImageModules);

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

export function getLearningImageUrlFromCache(
  source: CommentarySource,
  num: number | null,
  isBonusSelection: boolean,
): string | null {
  if (num === null || source === 'soul') {
    return null;
  }

  if (source === 'yao') {
    return isBonusSelection
      ? getCachedLearningImageUrl(bonusYaoLearningImagePathMap[num] ?? '')
      : getCachedLearningImageUrl(yaoLearningImagePathMap[num] ?? '');
  }

  return isBonusSelection
    ? getCachedLearningImageUrl(bonusGuaLearningImagePathMap[num] ?? '')
    : getCachedLearningImageUrl(guaLearningImagePathMap[num] ?? '');
}
