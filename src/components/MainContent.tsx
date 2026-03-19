import React from 'react';
import type { GuaData, YaoData, SoulSection, SoulGroup } from '../types';
import { IChingSection } from './IChingSection';
import { SoulCalendarSection } from './SoulCalendarSection';

interface MainContentProps {
  yaoNum: number | null;
  guaNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

export const MainContent: React.FC<MainContentProps> = ({
  yaoNum, guaData, yaoData, hitSoulGroup, soulSections
}) => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 mt-4 space-y-16 animate-fade-in-up relative z-10 safe-bottom">
      <IChingSection yaoNum={yaoNum} guaData={guaData} yaoData={yaoData} />

      <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
    </main>
  );
};
