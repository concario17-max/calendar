import React from 'react';
import type { CommentarySource, CommentarySources, GuaData, YaoData, SoulSection, SoulGroup } from '../types';
import { IChingSection } from './IChingSection';

interface MainContentProps {
  commentarySource: CommentarySource;
  commentarySources: CommentarySources;
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
  commentarySources,
  setCommentarySource,
  yaoNum,
  guaData,
  yaoData,
  hitSoulGroup,
  soulSections,
}) => {
  return (
    <main className="w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-10 pt-8 sm:pt-10 md:pt-12 pb-24 space-y-16 animate-fade-in-up relative z-10 safe-bottom">
      <IChingSection
        commentarySource={commentarySource}
        commentarySources={commentarySources}
        onCommentarySourceChange={setCommentarySource}
        yaoNum={yaoNum}
        guaData={guaData}
        yaoData={yaoData}
        hitSoulGroup={hitSoulGroup}
        soulSections={soulSections}
      />
    </main>
  );
};
