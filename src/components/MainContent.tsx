import React, { useState } from 'react';
import type { CommentarySource, GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { Header } from './Header';
import { IChingSection } from './IChingSection';

interface BonusGuaItem {
  id: string;
  label: string;
  dateLabel: string;
  num: number;
  guaData: GuaData;
}

interface BonusYaoItem {
  id: string;
  label: string;
  dateLabel: string;
  num: number;
  yaoData: YaoData;
}

interface MainContentProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
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
  yaoNum,
  guaNum,
  guaData,
  yaoData,
  hitSoulGroup,
  soulSections,
  bonusGuaItems = [],
  bonusYaoItems = [],
}) => {
  const [commentarySource, setCommentarySource] = useState<CommentarySource>('yao');
  const activeBonusGuaItems = commentarySource === 'gua' ? bonusGuaItems : [];
  const activeBonusYaoItems = commentarySource === 'yao' ? bonusYaoItems : [];

  return (
    <main className="reading-system curated-shell archive-shell relative flex min-h-dvh w-full flex-col overflow-x-hidden overflow-y-auto bg-shell-canvas text-on-surface lg:h-[100dvh] lg:overflow-hidden">
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Header
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          commentarySource={commentarySource}
          onCommentarySourceChange={setCommentarySource}
        />

        <div className="curated-shell__frame flex min-h-0 flex-1 flex-col overflow-visible lg:overflow-hidden">
          <IChingSection
            commentarySource={commentarySource}
            yaoNum={yaoNum}
            guaNum={guaNum}
            guaData={guaData}
            yaoData={yaoData}
            hitSoulGroup={hitSoulGroup}
            soulSections={soulSections}
            bonusGuaItems={activeBonusGuaItems}
            bonusYaoItems={activeBonusYaoItems}
          />
        </div>
      </div>
    </main>
  );
};
