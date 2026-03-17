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
  onOpenJournal: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  yaoNum, guaData, yaoData, hitSoulGroup, soulSections, onOpenJournal
}) => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-28 md:pb-24 mt-4 space-y-16 animate-fade-in-up relative z-10 safe-bottom">
      <IChingSection yaoNum={yaoNum} guaData={guaData} yaoData={yaoData} />

      <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />

      <div className="flex justify-center pt-8 border-t border-warm-gray-200/30 dark:border-warm-gray-800/30">
        <button
          onClick={onOpenJournal}
          className="bg-gradient-to-b from-warm-gray-700 to-warm-gray-800 dark:from-warm-gray-100 dark:to-white text-white dark:text-ray-dark hover:from-warm-gray-600 hover:to-warm-gray-700 dark:hover:from-white dark:hover:to-white px-11 py-5 rounded-2xl font-bold shadow-[0_18px_40px_rgba(68,59,48,0.18)] dark:shadow-white/15 transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center max-w-sm active:scale-95 active-scale font-display border border-warm-gray-600/70 dark:border-warm-gray-200"
        >
          <span className="material-icons opacity-80 text-xl">auto_awesome</span>
          <span className="text-[0.98rem] tracking-[-0.01em]">Add Journal Entry</span>
        </button>
      </div>
    </main>
  );
};
