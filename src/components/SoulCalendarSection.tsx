import React from 'react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

function formatSoulLine(soulSections: SoulSection[], hitSoulGroup?: SoulGroup): string {
  const visibleSections = soulSections.slice(0, 2);

  if (visibleSections.length > 0) {
    return visibleSections
      .map((section) => `${section.week}주(${section.range}일)`)
      .join(' / ');
  }

  return hitSoulGroup ? hitSoulGroup.weeksLabel : '해당 날짜 항목 없음';
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ hitSoulGroup, soulSections }) => {
  const soulLine = formatSoulLine(soulSections, hitSoulGroup);

  return (
    <section className="relative min-w-0 animate-fade-in-up stagger-2 pb-0.5 md:pb-1">
      <div className="space-y-3 text-left">
        <div className="space-y-0.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9a8a75]">Soul Calendar</p>
          <h2 className="max-w-[14ch] font-headline text-[1.18rem] font-semibold leading-[1.12] tracking-[-0.03em] text-current md:text-[1.42rem]">
            Rudolf Steiner&apos;s Calendar of the Soul
          </h2>
        </div>
        <div className="max-w-[34rem]">
          <span className="block font-body text-[0.88rem] font-medium italic leading-[1.78] tracking-[-0.01em] text-[#9a8a75] md:text-[0.94rem]">
            {soulLine}
          </span>
        </div>
      </div>
    </section>
  );
};
