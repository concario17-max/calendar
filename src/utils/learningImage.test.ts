import { describe, expect, it } from 'vitest';
import { buildLearningImageLoaderMap, getCachedLearningImageUrl } from './learningImage';

describe('learningImage cache helpers', () => {
  it('invokes the same loader only once for repeated in-session calls', async () => {
    let callCount = 0;
    const path = '/image/1.png';
    const loaderMap = buildLearningImageLoaderMap({
      [path]: async () => {
        callCount += 1;
        return 'data:image/png;base64,one';
      },
    });

    const loader = loaderMap[1];
    const first = loader();
    const second = loader();

    await expect(first).resolves.toBe('data:image/png;base64,one');
    await expect(second).resolves.toBe('data:image/png;base64,one');
    expect(callCount).toBe(1);
  });

  it('returns the resolved URL synchronously after the first load', async () => {
    const path = '/image/2.png';
    const resolvedUrl = 'data:image/png;base64,two';
    const loaderMap = buildLearningImageLoaderMap({
      [path]: async () => resolvedUrl,
    });

    expect(getCachedLearningImageUrl(path)).toBeNull();

    await expect(loaderMap[2]()).resolves.toBe(resolvedUrl);
    expect(getCachedLearningImageUrl(path)).toBe(resolvedUrl);
  });

  it('does not poison later retries after a failure', async () => {
    const path = '/image/3.png';
    let callCount = 0;
    const loaderMap = buildLearningImageLoaderMap({
      [path]: async () => {
        callCount += 1;

        if (callCount === 1) {
          throw new Error('failed to load learning image');
        }

        return 'data:image/png;base64,three';
      },
    });

    await expect(loaderMap[3]()).rejects.toThrow('failed to load learning image');
    expect(getCachedLearningImageUrl(path)).toBeNull();

    await expect(loaderMap[3]()).resolves.toBe('data:image/png;base64,three');
    expect(callCount).toBe(2);
    expect(getCachedLearningImageUrl(path)).toBe('data:image/png;base64,three');
  });
});
