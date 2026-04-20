import React from 'react';
import type { GuaData, YaoData, SoulSection, SoulGroup } from '../types';
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
  return (
    <main className="mx-auto flex h-[100dvh] min-h-0 w-full max-w-[100rem] flex-1 flex-col overflow-hidden px-2 pt-0 relative z-10 safe-bottom sm:px-3 sm:pt-0 md:px-4 md:pt-0 lg:px-6 min-w-0 md:[&>section>div]:!grid-cols-[340px_minmax(0,1fr)]">
      <IChingSection
        selectedDate={selectedDate}
        onDateChange={onDateChange}
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
