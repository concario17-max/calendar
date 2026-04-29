import React from 'react';
import { useState } from 'react';
import type { CommentarySource, GuaData, SoulSection, SoulGroup, YaoData } from '../types';
import { Header } from './Header';
import { IChingSection } from './IChingSection';

interface MainContentProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
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
  yaoNum,
  guaNum,
  guaData,
  yaoData,
  hitSoulGroup,
  soulSections,
}) => {
  const [commentarySource, setCommentarySource] = useState<CommentarySource>('yao');

  return (
    <main className="reading-system curated-shell archive-shell relative flex min-h-dvh w-full flex-col overflow-x-hidden overflow-y-auto bg-shell-canvas text-on-surface md:h-[100dvh] md:overflow-hidden">
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Header
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          commentarySource={commentarySource}
          onCommentarySourceChange={setCommentarySource}
        />

        <div className="curated-shell__frame flex min-h-0 flex-1 flex-col overflow-visible md:overflow-hidden">
          <IChingSection
            commentarySource={commentarySource}
            yaoNum={yaoNum}
            guaNum={guaNum}
            guaData={guaData}
            yaoData={yaoData}
            hitSoulGroup={hitSoulGroup}
            soulSections={soulSections}
          />
        </div>
      </div>
    </main>
  );
};
