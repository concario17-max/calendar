import React from 'react';
import type { CommentarySource, GuaData, YaoData, SoulSection, SoulGroup } from '../types';
import { IChingSection } from './IChingSection';

interface MainContentProps {
  commentarySource: CommentarySource;
  setCommentarySource: (source: CommentarySource) => void;
  yaoNum: number | null;
  guaNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

export const MainContent: React.FC<MainContentProps> = ({
  commentarySource,
  setCommentarySource,
  yaoNum,
  guaNum,
  guaData,
  yaoData,
  hitSoulGroup,
  soulSections,
}) => {
  return (
    <main className="mx-auto flex w-full max-w-[96rem] flex-col px-3 sm:px-4 md:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 pb-24 animate-fade-in-up relative z-10 safe-bottom">
      <IChingSection
        commentarySource={commentarySource}
        onCommentarySourceChange={setCommentarySource}
        yaoNum={yaoNum}
        guaNum={guaNum}
        guaData={guaData}
        yaoData={yaoData}
        hitSoulGroup={hitSoulGroup}
        soulSections={soulSections}
      />
    </main>
  );
};
