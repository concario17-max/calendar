import React, { useState } from 'react';
import type { CommentarySource, GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { Header } from './Header';
import { IChingSection } from './IChingSection';

interface BonusGuaItem {
  id: string;
  label: string;
  dateLabel: string;
  commentary?: string;
  num: number;
  guaData: GuaData;
}

interface BonusYaoItem {
  id: string;
  label: string;
  dateLabel: string;
  commentary?: string;
  num: number;
  yaoData: YaoData;
}

interface MainContentProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  commentarySource?: CommentarySource;
  onCommentarySourceChange?: (source: CommentarySource) => void;
  yaoNum: number | null;
  guaNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
  bonusGuaItems?: BonusGuaItem[];
  bonusYaoItems?: BonusYaoItem[];
}

export const MainContent: React.FC<MainContentProps> = ({
  selectedDate,
  onDateChange,
  commentarySource,
  onCommentarySourceChange,
  yaoNum,
  guaNum,
  guaData,
  yaoData,
  hitSoulGroup,
  soulSections,
  bonusGuaItems = [],
  bonusYaoItems = [],
}) => {
  const [localCommentarySource, setLocalCommentarySource] = useState<CommentarySource>('yao');
  const activeCommentarySource = commentarySource ?? localCommentarySource;
  const handleCommentarySourceChange = onCommentarySourceChange ?? setLocalCommentarySource;

  return (
    <main className="reading-system curated-shell archive-shell relative flex min-h-dvh w-full flex-col overflow-x-hidden overflow-y-auto bg-shell-canvas text-on-surface lg:h-[100dvh] lg:overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[var(--shell-content-width)] flex-1 flex-col gap-[var(--shell-stack-gap)]">
        <Header
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          commentarySource={activeCommentarySource}
          onCommentarySourceChange={handleCommentarySourceChange}
        />

        <div className="curated-shell__frame flex min-h-0 flex-1 flex-col overflow-visible lg:overflow-hidden">
          <IChingSection
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            commentarySource={activeCommentarySource}
            yaoNum={yaoNum}
            guaNum={guaNum}
            guaData={guaData}
            yaoData={yaoData}
            hitSoulGroup={hitSoulGroup}
            soulSections={soulSections}
            bonusGuaItems={bonusGuaItems}
            bonusYaoItems={bonusYaoItems}
          />
        </div>
      </div>
    </main>
  );
};
