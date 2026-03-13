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
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-36 md:pb-48 mt-4 space-y-16 animate-fade-in-up relative z-10 safe-bottom">
      
      {/* 주역(I Ching) 섹션 */}
      <IChingSection yaoNum={yaoNum} guaData={guaData} yaoData={yaoData} />

      {/* 영혼의 달력 (Calendar of the Soul) 섹션 */}
      <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />

      {/* 일기 작성 모달 트리거 */}
      <div className="fixed bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none w-full max-w-4xl px-4 flex justify-center">
        <button 
          onClick={onOpenJournal}
          className="pointer-events-auto bg-ray-dark dark:bg-white text-white dark:text-ray-dark hover:bg-elegant-gold dark:hover:bg-elegant-gold px-8 py-4 rounded-full font-bold shadow-xl shadow-ray-dark/20 dark:shadow-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center max-w-sm active:scale-95 active:shadow-inner"
        >
          <span className="material-icons opacity-80 text-xl">auto_awesome</span>
          <span>Add Journal Entry</span>
        </button>
      </div>

    </main>
  );
};
