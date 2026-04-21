import React from 'react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";

function normalizeRange(range: string): string {
  return range.trim().replace(/일$/, '');
}

function formatWeeksLabel(hitSoulGroup: SoulGroup | undefined, soulSections: SoulSection[]): string {
  if (hitSoulGroup?.weeksLabel) {
    return hitSoulGroup.weeksLabel.replace(/일/g, '');
  }

  if (soulSections.length === 0) {
    return '';
  }

  return soulSections.map((section) => `${section.week}주(${normalizeRange(section.range)})`).join(' / ');
}

function SoulSectionCard({ section, isLast }: { section: SoulSection; isLast: boolean }) {
  return (
    <article
      className={[
        'relative overflow-hidden rounded-[1.5rem] border border-[#d7c7a9]/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(249,243,232,0.92))] px-4 py-4 shadow-[0_14px_32px_rgba(105,82,48,0.09)] backdrop-blur-sm',
        isLast ? '' : 'mb-3',
      ].join(' ')}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6c19a]/80 to-transparent" />
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#d8c2a0]/20 blur-2xl" />
      <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#bba070]/10 blur-3xl" />

      <div className="relative space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-[#ead7b3] px-3 py-0.5 text-[10px] font-semibold tracking-[0.24em] text-[#7a5d2d]">
            {section.week}주
          </span>
          <span className="text-[0.78rem] italic tracking-[0.12em] text-[#8a7d70]">{normalizeRange(section.range)}</span>
        </div>

        <p className="whitespace-pre-wrap break-keep border-l-2 border-[#d6bf96]/80 pl-4 font-body text-[0.99rem] leading-[1.9] tracking-[-0.01em] text-[#566471]">
          {section.text}
        </p>
      </div>
    </article>
  );
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ hitSoulGroup, soulSections }) => {
  const soulSubtitle = formatWeeksLabel(hitSoulGroup, soulSections);
  const visibleSections = soulSections.slice(0, 2);

  return (
    <section className="relative min-w-0 animate-fade-in-up stagger-2 border-t border-[#d3c1a3]/55 pb-8 pt-4 md:pb-10 md:pt-5">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-1 h-28 w-28 rounded-full bg-[#dec8a0]/18 blur-3xl" />
        <div className="absolute right-2 top-2 h-20 w-20 rounded-full bg-[#f1e2c0]/55 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-[#bca173]/12 blur-3xl" />
      </div>

      <div className="relative space-y-4 text-left">
        <div className="space-y-2">
          <p className="inline-flex items-center rounded-full border border-[#d7c7a9]/50 bg-[#f4eadc]/55 px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.22em] text-[#9a8a75]">
            슈타이너의 영혼의 달력
          </p>
          <h2 className="max-w-[40ch] font-headline text-[1.35rem] font-semibold leading-[1.12] tracking-[-0.03em] text-current md:text-[1.66rem]">
            {SOUL_TITLE}
          </h2>
          {soulSubtitle ? (
            <p className="max-w-[40ch] font-body text-[0.92rem] italic leading-[1.65] tracking-[-0.01em] text-[#7a6f64]">
              {soulSubtitle}
            </p>
          ) : null}
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-[#d8c4a1]/70 bg-[linear-gradient(180deg,rgba(250,244,235,0.98),rgba(240,229,208,0.92))] p-3 shadow-[0_24px_70px_rgba(109,84,47,0.14)]">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d1b68a]/80 to-transparent" />
          <div className="absolute -right-2 top-2 h-16 w-16 rounded-full bg-[#efdebc]/55 blur-2xl" />
          <div className="absolute bottom-0 left-4 h-20 w-20 rounded-full bg-[#cfb07f]/12 blur-3xl" />

          <div className="relative space-y-3">
            <div className="flex items-center justify-between gap-3 border-b border-[#d9c5a3]/45 px-2 pb-2">
              <span className="inline-flex items-center rounded-full bg-[#dcc18e] px-3 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-[#74542b]">
                SOUL PANEL
              </span>
              <span className="text-[0.72rem] uppercase tracking-[0.28em] text-[#8a7d70]">
                {visibleSections.length > 0 ? `${visibleSections.length} blocks` : 'no block'}
              </span>
            </div>

            <div className="space-y-0">
              {visibleSections.length > 0 ? (
                visibleSections.map((section, index) => (
                  <SoulSectionCard key={`${section.week}-${section.range}-${index}`} section={section} isLast={index === visibleSections.length - 1} />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[#d9c6a5]/70 bg-white/45 px-4 py-5 text-[0.95rem] italic leading-relaxed text-[#7c7367]">
                  연결된 영혼 본문이 아직 없어.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
