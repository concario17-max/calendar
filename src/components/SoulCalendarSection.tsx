import React from 'react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ hitSoulGroup, soulSections }) => {
  return (
    <section className="relative animate-fade-in-up stagger-2">
      <div className="text-center mb-10">
        <div className="inline-block group">
          <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-warm-gray-800 to-warm-gray-500 dark:from-white dark:to-warm-gray-400 tracking-wide mb-3 transition-transform duration-500 group-hover:scale-105">
            Calendar of the Soul
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-elegant-gold opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-sm font-bold text-elegant-gold tracking-[0.3em] uppercase">
              {hitSoulGroup ? hitSoulGroup.weeksLabel : '해당 날짜는 비움'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-elegant-gold opacity-50 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>

      {soulSections.length >= 2 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-elegant-gold opacity-5 blur-3xl rounded-full pointer-events-none"></div>
          {soulSections.slice(0, 2).map((sec, i) => {
            const seasonMatch = sec.text.match(/^(봄|여름|가을|겨울)\s*\n+/);
            const season = seasonMatch ? seasonMatch[1] : null;
            const content = seasonMatch ? sec.text.substring(seasonMatch[0].length).trim() : sec.text;

            return (
              <div key={i} className={`space-y-4 bg-white/70 dark:bg-ray-dark/70 backdrop-blur-xl p-8 rounded-[2rem] border border-elegant-gold/20 shadow-md hover:shadow-2xl dark:shadow-2xl dark:shadow-black/50 h-full text-center transition-all duration-700 hover:-translate-y-2 group animate-fade-in-up stagger-${i + 3}`}>
                <div className="flex justify-between items-baseline mb-2 gap-2">
                  <div className="font-bold text-sm text-warm-gray-600 dark:text-warm-gray-300 group-hover:text-elegant-gold transition-colors">{sec.week}주</div>
                  <div className="text-xs text-warm-gray-400 dark:text-warm-gray-500 font-bold whitespace-nowrap uppercase tracking-widest">{sec.range}</div>
                </div>
                <div className="whitespace-pre-wrap break-keep leading-[1.8] text-[15px] md:text-[16px] font-serif text-warm-gray-800 dark:text-warm-gray-200 mt-2 tracking-[0.01em] transition-colors duration-500 group-hover:text-ray-dark dark:group-hover:text-white">
                  {season && (
                    <div className="text-[13px] md:text-sm font-bold text-warm-gray-500 dark:text-warm-gray-400 mb-5 tracking-[0.4em] uppercase group-hover:text-elegant-gold transition-colors">{season}</div>
                  )}
                  {content}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/50 dark:bg-ray-dark/50 rounded-[2rem] border border-dashed border-warm-gray-200 dark:border-warm-gray-800">
          <span className="text-warm-gray-500 font-serif italic whitespace-pre-wrap leading-loose">
            해당 구절이 없습니다.
          </span>
        </div>
      )}
    </section>
  );
};
