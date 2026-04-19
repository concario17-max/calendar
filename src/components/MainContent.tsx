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
    <main className="mx-auto flex min-h-0 w-full max-w-[96rem] flex-1 flex-col px-3 pt-2 pb-24 relative z-10 animate-fade-in-up safe-bottom sm:px-4 sm:pt-3 md:px-6 md:pt-4 lg:px-8">
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
