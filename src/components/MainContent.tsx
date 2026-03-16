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
      {/* I Ching section */}
      <IChingSection yaoNum={yaoNum} guaData={guaData} yaoData={yaoData} />

      {/* Calendar of the Soul section */}
      <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />

      {/* Journal modal trigger */}
      <div className="flex justify-center pt-8 border-t border-warm-gray-200/30 dark:border-warm-gray-800/30">
        <button
          onClick={onOpenJournal}
          className="bg-ray-dark dark:bg-white text-white dark:text-ray-dark hover:bg-elegant-gold dark:hover:bg-elegant-gold px-10 py-5 rounded-2xl font-bold shadow-2xl shadow-ray-dark/20 dark:shadow-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center max-w-sm active:scale-95 active-scale font-display"
        >
          <span className="material-icons opacity-80 text-xl">auto_awesome</span>
          <span className="tracking-tight">Add Journal Entry</span>
        </button>
      </div>
    </main>
  );
};
