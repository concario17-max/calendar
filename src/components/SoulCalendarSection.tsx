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

  const badgePatterns = [
    /^(봄|여름|가을|겨울)$/i,
    /^(부활절\s*\/\s*봄)$/i,
    /^(성요한 절기)$/i,
    /^(여름)$/i,
    /^(가을)$/i,
    /^(겨울)$/i,
    /^(봄)$/i,
    /^(크리스마스)$/i,
    /^(가을)$/i,
  ];

  const hasBadge = badgePatterns.some((pattern) => pattern.test(firstLine));
  if (!hasBadge) {
    return { badge: null, content: trimmed };
  }

  return {
    badge: firstLine,
    content: lines.slice(1).join('\n').trim(),
  };
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ hitSoulGroup, soulSections }) => {
  return (
    <section className="relative animate-fade-in-up stagger-2 pb-2 md:pb-4">
      <div className="mb-8 md:mb-9">
        <div className="group space-y-3 text-center">
          <h2 className="text-center text-[1.9rem] md:text-[2.3rem] font-brand font-semibold text-transparent bg-clip-text bg-gradient-to-b from-warm-gray-800 to-warm-gray-500 dark:from-white dark:to-warm-gray-400 tracking-[0.01em] leading-[0.98] transition-transform duration-500 group-hover:translate-x-0.5">
            Rudolf Steiner&apos;s Calendar of the Soul
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-elegant-gold opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-[0.72rem] md:text-[0.78rem] font-bold text-elegant-gold tracking-[0.24em]">
              {hitSoulGroup ? hitSoulGroup.weeksLabel : '해당 날짜 항목 없음'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-elegant-gold opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      {soulSections.length > 0 ? (
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-elegant-gold opacity-5 blur-3xl" />
          {soulSections.slice(0, 2).map((sec, i) => {
            const { badge, content } = extractSectionBadge(sec.text);

            return (
              <div
                key={i}
                className={`group h-full rounded-[1.8rem] border border-elegant-gold/18 bg-white/72 p-6 text-left shadow-md backdrop-blur-xl transition-all duration-700 hover:-translate-y-1.5 hover:shadow-xl dark:bg-ray-dark/72 dark:shadow-2xl dark:shadow-black/50 md:p-8 animate-fade-in-up stagger-${i + 3}`}
              >
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <div className="font-bold text-[0.8rem] md:text-[0.86rem] text-warm-gray-600 transition-colors group-hover:text-elegant-gold dark:text-warm-gray-300">
                    {sec.week}주
                  </div>
                  <div className="whitespace-nowrap text-[0.68rem] md:text-[0.74rem] font-bold tracking-[0.18em] text-warm-gray-400 dark:text-warm-gray-500">
                    {sec.range}
                  </div>
                </div>

                <div className="mt-2 whitespace-pre-wrap break-keep font-display text-[15.5px] leading-[1.95] tracking-[-0.01em] text-ray-body transition-colors duration-500 group-hover:text-ray-dark dark:text-warm-gray-200 dark:group-hover:text-white md:text-[16.5px]">
                  {badge ? (
                    <div className="mb-4 text-[0.78rem] font-bold tracking-[0.16em] text-warm-gray-500 transition-colors group-hover:text-elegant-gold dark:text-warm-gray-400 md:text-[0.84rem]">
                      {badge}
                    </div>
                  ) : null}
                  {content}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[1.8rem] border border-dashed border-warm-gray-200 bg-white/50 py-10 text-left dark:border-warm-gray-800 dark:bg-ray-dark/50">
          <span className="whitespace-pre-wrap break-keep font-display italic leading-loose text-warm-gray-500">
            이 구간에 해당하는 영혼의 달력 본문을 찾지 못했습니다.
          </span>
        </div>
      )}
    </section>
  );
};
