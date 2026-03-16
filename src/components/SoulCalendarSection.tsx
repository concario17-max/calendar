import React from 'react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

function extractSectionMeta(text: string): { badge: string | null; content: string } {
  const trimmed = text.trim();
  const lines = trimmed.split('\n').map((line) => line.trim()).filter(Boolean);
  const firstLine = lines[0] || '';

  const badgePatterns = [
    /^(봄|여름|가을|겨울)$/i,
    /^(부활절\s*\/\s*봄)$/i,
    /^(성요한 절기)$/i,
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
    <section className="relative animate-fade-in-up stagger-2">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
        <div>
          <div className="text-[11px] tracking-[0.18em] text-elegant-gold mb-2">
            CALENDAR OF THE SOUL
          </div>
          <h2 className="text-[1.85rem] sm:text-[2.2rem] font-display font-semibold tracking-[-0.05em] text-warm-gray-900 dark:text-white text-balance">
            영혼의 달력
          </h2>
          <p className="text-sm sm:text-[15px] text-warm-gray-600 dark:text-warm-gray-300 mt-2 tracking-[-0.01em]">
            주차와 계절의 흐름을 따라 오늘의 본문을 읽습니다.
          </p>
        </div>

        <div className="self-start md:self-auto inline-flex items-center gap-3 rounded-full border border-elegant-gold/15 bg-elegant-gold/[0.08] px-4 py-2 text-sm text-elegant-gold tracking-[0.08em]">
          <span className="w-2 h-2 rounded-full bg-elegant-gold"></span>
          <span>{hitSoulGroup ? hitSoulGroup.weeksLabel : '해당 날짜 항목 없음'}</span>
        </div>
      </div>

      {soulSections.length >= 2 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-elegant-gold opacity-[0.06] blur-3xl rounded-full pointer-events-none"></div>
          {soulSections.slice(0, 2).map((sec, i) => {
            const { badge, content } = extractSectionMeta(sec.text);

            return (
              <article
                key={i}
                className={`relative h-full rounded-[2rem] border border-elegant-gold/16 bg-white/76 dark:bg-ray-dark/76 backdrop-blur-xl p-6 sm:p-7 shadow-md hover:shadow-2xl dark:shadow-2xl dark:shadow-black/50 transition-all duration-700 hover:-translate-y-1.5 group animate-fade-in-up stagger-${i + 3}`}
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-40"></div>

                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <div className="text-[11px] tracking-[0.18em] text-warm-gray-500 dark:text-warm-gray-400 mb-2">
                      WEEK
                    </div>
                    <h3 className="text-[1.45rem] font-display font-semibold tracking-[-0.05em] text-warm-gray-900 dark:text-white">
                      {sec.week}주
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] tracking-[0.18em] text-warm-gray-500 dark:text-warm-gray-400 mb-2">
                      RANGE
                    </div>
                    <div className="text-sm text-warm-gray-700 dark:text-warm-gray-200 tracking-[-0.01em]">
                      {sec.range}
                    </div>
                  </div>
                </div>

                {badge && (
                  <div className="inline-flex items-center rounded-full border border-elegant-gold/15 bg-elegant-gold/[0.08] px-3 py-1 text-[12px] tracking-[0.08em] text-elegant-gold mb-5">
                    {badge}
                  </div>
                )}

                <div className="text-[15px] md:text-[16px] leading-8 md:leading-[2.02] font-display text-ray-body dark:text-warm-gray-200 tracking-[-0.01em] whitespace-pre-wrap break-keep text-block-flow">
                  {content}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/50 dark:bg-ray-dark/50 rounded-[2rem] border border-dashed border-warm-gray-200 dark:border-warm-gray-800">
          <span className="text-warm-gray-500 font-display italic whitespace-pre-wrap leading-loose break-keep">
            이 구간에 해당하는 영혼의 달력 본문을 찾지 못했습니다.
          </span>
        </div>
      )}
    </section>
  );
};
