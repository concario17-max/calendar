import React from 'react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ hitSoulGroup }) => {
  return (
    <section className="relative animate-fade-in-up stagger-2 pb-2 md:pb-4">
      <div className="mb-8 md:mb-9">
        <div className="group space-y-3 text-center">
          <h2 className="text-center text-[1.64rem] font-display font-semibold leading-[1.02] tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-b from-warm-gray-800 to-warm-gray-500 transition-transform duration-500 group-hover:translate-x-0.5 dark:from-white dark:to-warm-gray-400 md:text-[2.06rem]">
            Rudolf Steiner&apos;s Calendar of the Soul
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-elegant-gold opacity-50 transition-opacity group-hover:opacity-100" />
            <span className="text-[0.72rem] font-bold tracking-[0.24em] text-elegant-gold md:text-[0.78rem]">
              {hitSoulGroup ? hitSoulGroup.weeksLabel : '해당 날짜 항목 없음'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-elegant-gold opacity-50 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  );
};
