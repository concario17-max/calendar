import React from 'react';
import type { GuaData, YaoData, SoulSection, SoulGroup } from '../types';
import { IChingSection } from './IChingSection';
import { SoulCalendarSection } from './SoulCalendarSection';

interface MainContentProps {
  selectedDate: Date;
  yaoNum: number | null;
  guaNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
  onOpenJournal: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  selectedDate,
  yaoNum,
  guaNum,
  guaData,
  yaoData,
  hitSoulGroup,
  soulSections,
  onOpenJournal,
}) => {
  const heroDate = selectedDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-28 md:pb-24 mt-2 sm:mt-4 space-y-12 md:space-y-16 animate-fade-in-up relative z-10 safe-bottom">
      <section className="relative overflow-hidden rounded-[2.4rem] border border-elegant-gold/15 bg-white/82 dark:bg-ray-dark/84 backdrop-blur-xl shadow-xl p-6 sm:p-8 md:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-60"></div>
        <div className="absolute -top-24 right-[-2rem] w-64 h-64 rounded-full bg-elegant-gold/10 blur-3xl"></div>
        <div className="absolute -bottom-24 left-[-4rem] w-72 h-72 rounded-full bg-warm-gray-200/30 dark:bg-white/5 blur-3xl"></div>

        <div className="relative grid gap-6 md:grid-cols-[1.35fr_0.95fr] md:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-elegant-gold/20 bg-elegant-gold/8 px-4 py-1.5 text-[11px] sm:text-xs tracking-[0.18em] text-elegant-gold">
              오늘의 관측
            </div>
            <p className="text-sm sm:text-base text-warm-gray-600 dark:text-warm-gray-300 tracking-[-0.02em]">
              {heroDate}
            </p>
            <h2 className="text-[1.85rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.08] font-display font-semibold tracking-[-0.05em] text-warm-gray-900 dark:text-warm-gray-50 text-balance">
              {yaoData?.titleLine.split('\n')[0] ?? '오늘의 흐름을 기다리는 중입니다.'}
            </h2>
            <p className="max-w-2xl text-[15px] sm:text-[17px] leading-7 sm:leading-8 text-ray-body/85 dark:text-warm-gray-200/88 tracking-[-0.015em]">
              {yaoData?.short ?? '선택한 날짜에 맞는 역경과 영혼의 달력 본문을 이곳에서 함께 읽을 수 있습니다.'}
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-warm-gray-200/80 dark:border-warm-gray-800/80 bg-warm-gray-50/86 dark:bg-warm-gray-900/70 p-5 sm:p-6 shadow-inner">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[1.4rem] border border-warm-gray-200/80 dark:border-warm-gray-800/80 bg-white/80 dark:bg-ray-dark/65 px-4 py-4">
                <div className="text-[11px] tracking-[0.16em] text-warm-gray-500 dark:text-warm-gray-400 mb-2">
                  YAO
                </div>
                <div className="text-2xl sm:text-[2rem] font-display font-semibold tracking-[-0.05em] text-warm-gray-900 dark:text-warm-gray-50">
                  {yaoNum ?? '—'}
                </div>
              </div>
              <div className="rounded-[1.4rem] border border-warm-gray-200/80 dark:border-warm-gray-800/80 bg-white/80 dark:bg-ray-dark/65 px-4 py-4">
                <div className="text-[11px] tracking-[0.16em] text-warm-gray-500 dark:text-warm-gray-400 mb-2">
                  GUA
                </div>
                <div className="text-2xl sm:text-[2rem] font-display font-semibold tracking-[-0.05em] text-warm-gray-900 dark:text-warm-gray-50">
                  {guaNum ?? '—'}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[1.4rem] bg-ray-dark text-white dark:bg-white dark:text-ray-dark px-4 py-4">
              <div className="text-[11px] tracking-[0.16em] text-white/60 dark:text-ray-dark/60 mb-2">
                SOUL CALENDAR
              </div>
              <div className="text-base sm:text-lg font-display tracking-[-0.03em]">
                {hitSoulGroup?.weeksLabel ?? '주차 정보 없음'}
              </div>
              <p className="text-sm leading-6 text-white/72 dark:text-ray-dark/70 mt-2 tracking-[-0.01em]">
                오늘의 역경과 영혼의 달력 흐름을 한 장면처럼 먼저 보여주는 요약 영역입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <IChingSection yaoNum={yaoNum} guaData={guaData} yaoData={yaoData} />
      <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />

      <div className="flex justify-center pt-4 sm:pt-6 border-t border-warm-gray-200/35 dark:border-warm-gray-800/35">
        <button
          onClick={onOpenJournal}
          className="bg-ray-dark dark:bg-white text-white dark:text-ray-dark hover:bg-elegant-gold dark:hover:bg-elegant-gold px-10 py-5 rounded-[1.6rem] font-medium shadow-2xl shadow-ray-dark/20 dark:shadow-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center max-w-sm active:scale-95 active-scale font-display tracking-[-0.02em]"
        >
          <span className="material-icons opacity-80 text-xl">auto_awesome</span>
          <span>저널 기록 남기기</span>
        </button>
      </div>
    </main>
  );
};
