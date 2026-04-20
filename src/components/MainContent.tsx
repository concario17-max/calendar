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
    <main className="curated-shell relative flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-surface text-on-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,59,41,0.06),transparent_34%),radial-gradient(circle_at_top_right,rgba(115,92,0,0.05),transparent_26%),linear-gradient(180deg,rgba(250,249,244,0.96)_0%,rgba(245,244,239,0.9)_100%)]" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Header
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          commentarySource={commentarySource}
          onCommentarySourceChange={setCommentarySource}
        />

        <div className="curated-shell__frame flex min-h-0 flex-1 overflow-hidden">
        <IChingSection
          selectedDate={selectedDate}
          onDateChange={onDateChange}
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
