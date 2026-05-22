export type ReadingDataBundle = {
  GUA_TEXT: string;
  YAO_TEXT: string;
  SOUL_TEXT: string;
  getGuaCommentary: (num: number | null) => string | undefined;
  getYaoCommentary: (num: number | null) => string | undefined;
  getBonusGuaCommentary: (num: number | null) => string | undefined;
  getBonusYaoCommentary: (num: number | null) => string | undefined;
};

let readingDataBundlePromise: Promise<ReadingDataBundle> | null = null;

export async function loadReadingDataBundle(): Promise<ReadingDataBundle> {
  if (!readingDataBundlePromise) {
    readingDataBundlePromise = Promise.all([
      import('../data/guaData'),
      import('../data/yaoData'),
      import('../data/soulData'),
      import('../data/guaCommentary'),
      import('../data/yaoCommentary'),
      import('../data/bonusGuaCommentary'),
      import('../data/bonusYaoCommentary'),
    ]).then(
      ([guaData, yaoData, soulData, guaCommentary, yaoCommentary, bonusGuaCommentary, bonusYaoCommentary]) => ({
        GUA_TEXT: guaData.GUA_TEXT,
        YAO_TEXT: yaoData.YAO_TEXT,
        SOUL_TEXT: soulData.SOUL_TEXT,
        getGuaCommentary: guaCommentary.getGuaCommentary,
        getYaoCommentary: yaoCommentary.getYaoCommentary,
        getBonusGuaCommentary: bonusGuaCommentary.getBonusGuaCommentary,
        getBonusYaoCommentary: bonusYaoCommentary.getBonusYaoCommentary,
      }),
    );
  }

  return readingDataBundlePromise.catch((error: unknown) => {
    readingDataBundlePromise = null;
    throw error;
  });
}
