import React from 'react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

function extractSectionBadge(text: string): { badge: string | null; content: string } {
  const trimmed = text.trim();
  const lines = trimmed.split('\n').map((line) => line.trim()).filter(Boolean);
  const firstLine = lines[0] || '';

  if (lines.length < 2) {
    return { badge: null, content: trimmed };
  }

  return {
    badge: firstLine,
    content: lines.slice(1).join('\n').trim(),
  };
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ hitSoulGroup, soulSections }) => {
  return (
    <section className="relative animate-fade-in-up stagger-2" data-testid="soul-section">
      <div className="border-b border-black/10 pb-5 dark:border-white/10">
        <div className="space-y-3">
          <div className="text-center">
            <h2 className="text-[1.35rem] font-brand font-semibold leading-[1.05] tracking-[0.01em] text-[#4b3b29] dark:text-warm-gray-100 md:text-[1.75rem]">
              Rudolf Steiner&apos;s Calendar of the Soul
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-elegant-gold opacity-50" />
            <span className="text-[0.72rem] font-bold tracking-[0.24em] text-elegant-gold md:text-[0.78rem]">
              {hitSoulGroup ? hitSoulGroup.weeksLabel : 'No matching soul weeks yet'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-elegant-gold opacity-50" />
          </div>
        </div>
      </div>

      {soulSections.length > 0 ? (
        <div data-testid="soul-section-stack" className="space-y-0">
          {soulSections.slice(0, 2).map((sec, i) => {
            const { badge, content } = extractSectionBadge(sec.text);

            return (
              <section
                key={sec.week}
                data-testid={`soul-entry-${sec.week}`}
                className={`${i === 0 ? '' : 'border-t border-black/10 dark:border-white/10'} py-5 md:py-6`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-bold text-[0.8rem] text-warm-gray-700 transition-colors dark:text-warm-gray-300 md:text-[0.86rem]">
                    {sec.week}주
                  </div>
                  <div className="whitespace-nowrap text-[0.68rem] font-bold tracking-[0.18em] text-warm-gray-500 dark:text-warm-gray-400 md:text-[0.74rem]">
                    {sec.range}
                  </div>
                </div>

                <div className="mt-3 space-y-3 font-display text-[15px] leading-[1.95] tracking-[-0.01em] text-[#4b3b29] dark:text-warm-gray-200 md:text-[16.5px]">
                  {badge ? (
                    <div className="text-[0.78rem] font-bold tracking-[0.16em] text-warm-gray-500 dark:text-warm-gray-400 md:text-[0.84rem]">
                      {badge}
                    </div>
                  ) : null}
                  <p className="whitespace-pre-wrap break-keep">{content}</p>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-left text-sm text-warm-gray-500 dark:text-warm-gray-400">
          Soul readings are not available yet.
        </div>
      )}
    </section>
  );
};
