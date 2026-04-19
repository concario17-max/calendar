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
        <div className="group space-y-3 text-left">
          <h2 className="font-display text-[1.64rem] font-semibold leading-[1.22] tracking-[-0.02em] text-current md:text-[2.06rem]">
            Rudolf Steiner&apos;s Calendar of the Soul
          </h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-elegant-gold/35" />
            <span className="block max-w-[34rem] py-2 pl-6 font-display text-[1.02rem] font-medium italic leading-[1.85] tracking-[-0.01em] text-elegant-gold md:text-[1.16rem]">
              {hitSoulGroup ? hitSoulGroup.weeksLabel : '해당 날짜 항목 없음'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
