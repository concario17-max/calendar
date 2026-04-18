import React from 'react';
import type { CommentarySource, GuaData, YaoData, SoulSection, SoulGroup } from '../types';
import { IChingSection } from './IChingSection';
import { Header } from './Header';

interface MainContentProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
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
  selectedDate,
  onDateChange,
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
    <main className="mx-auto flex w-full max-w-[96rem] flex-col px-3 sm:px-4 md:px-6 lg:px-8 pt-5 sm:pt-6 md:pt-8 pb-24 animate-fade-in-up relative z-10 safe-bottom">
      <div className="mb-4 sm:mb-5 md:mb-6">
        <Header
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          commentarySource={commentarySource}
          onCommentarySourceChange={setCommentarySource}
        />
      </div>

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
