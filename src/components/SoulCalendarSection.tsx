import React from 'react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

function formatSoulTitle(soulSections: SoulSection[], hitSoulGroup?: SoulGroup): string {
  const visibleSections = soulSections.slice(0, 2);
  const normalizeRange = (range: string): string => range.trim().replace(/일$/, '');

  if (visibleSections.length > 0) {
    return visibleSections.map((section) => `${section.week}주(${normalizeRange(section.range)})`).join(' / ');
  }

  return hitSoulGroup ? hitSoulGroup.weeksLabel.replace(/일/g, '') : '영혼의 달력';
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ hitSoulGroup, soulSections }) => {
  const soulTitle = formatSoulTitle(soulSections, hitSoulGroup);

  return (
    <section className="relative min-w-0 animate-fade-in-up stagger-2 border-t border-[#d3c1a3]/55 pb-6 pt-3 md:pb-8 md:pt-4">
      <div className="space-y-3 text-left">
        <div className="space-y-1">
          <p className="inline-flex items-center rounded-full border border-[#d7c7a9]/50 bg-[#f4eadc]/55 px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.22em] text-[#9a8a75]">
            슈타이너의 영혼의 달력
          </p>
          <h2 className="max-w-[40ch] font-headline text-[1.35rem] font-semibold leading-[1.12] tracking-[-0.03em] text-current md:text-[1.66rem]">
            {soulTitle}
          </h2>
        </div>
      </div>
    </section>
  );
};
