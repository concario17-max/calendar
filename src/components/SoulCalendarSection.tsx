import React from 'react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";
const SOUL_BADGE = '루돌프 슈타이너의 영혼의 달력';
const SOUL_EMPTY = '영혼 본문이 아직 없어.';

function normalizeDateRange(range: string): string {
  const trimmed = range.trim();
  return trimmed.endsWith('일') ? trimmed : `${trimmed}일`;
}

function formatWeekRange(week: number, range: string): string {
  return `${week}주(${normalizeDateRange(range)})`;
}

function normalizeWeeksLabel(label: string): string {
  return label
    .trim()
    .replace(/[·•ㆍ]/g, '·')
    .replace(/\s*\/\s*/g, ' · ')
    .replace(/(\d+)주(?:\(([^)]+)\))?/g, (_match: string, week: string, range?: string) => {
      if (!range) {
        return `${week}주`;
      }

      return `${week}주(${normalizeDateRange(range)})`;
    });
}

export function formatWeeksLabel(hitSoulGroup: SoulGroup | undefined, soulSections: SoulSection[]): string {
  if (soulSections.length > 0) {
    return soulSections.map((section) => formatWeekRange(section.week, section.range)).join(' · ');
  }

  if (hitSoulGroup?.weeksLabel) {
    return normalizeWeeksLabel(hitSoulGroup.weeksLabel);
  }

  if (soulSections.length === 0) {
    return '';
  }

  return soulSections.map((section) => formatWeekRange(section.week, section.range)).join(' · ');
}

function SoulSectionCard({ section, isLast }: { section: SoulSection; isLast: boolean }) {
  return (
    <article
      className={[
        'reading-card reading-fade-in relative overflow-hidden rounded-[1.5rem] border border-[#d7c7a9]/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(249,243,232,0.92))] shadow-[0_14px_32px_rgba(105,82,48,0.09)] backdrop-blur-sm',
        isLast ? '' : 'mb-[var(--reading-block-gap)]',
      ].join(' ')}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6c19a]/80 to-transparent" />
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#d8c2a0]/20 blur-2xl" />
      <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#bba070]/10 blur-3xl" />

      <div className="relative space-y-[var(--reading-block-gap)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-[#ead7b3] px-3 py-0.5 text-[10px] font-semibold tracking-[0.24em] text-[#7a5d2d]">
            {section.week}주
          </span>
          <span className="text-[0.78rem] italic tracking-[0.12em] text-[#8a7d70]">{normalizeDateRange(section.range)}</span>
        </div>

        <p className="whitespace-pre-wrap break-keep border-l-2 border-[#d6bf96]/80 pl-4 font-body text-[0.99rem] leading-[1.9] tracking-[-0.01em] text-[#566471]">
          {section.text}
        </p>
      </div>
    </article>
  );
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ soulSections }) => {
  const visibleSections = soulSections.slice(0, 2);

  return (
    <section className="reading-fade-in relative min-w-0 pb-8 md:pb-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-1 h-28 w-28 rounded-full bg-[#dec8a0]/18 blur-3xl" />
        <div className="absolute right-2 top-2 h-20 w-20 rounded-full bg-[#f1e2c0]/55 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-[#bca173]/12 blur-3xl" />
      </div>

      <div className="relative space-y-[var(--reading-section-gap)] text-left">
        <div className="reading-card reading-fade-in relative overflow-hidden rounded-[2rem] border border-[#d8c4a1]/70 bg-[linear-gradient(180deg,rgba(250,244,235,0.98),rgba(240,229,208,0.92))] shadow-[0_24px_70px_rgba(109,84,47,0.14)]">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d1b68a]/80 to-transparent" />
          <div className="absolute -right-2 top-2 h-16 w-16 rounded-full bg-[#efdebc]/55 blur-2xl" />
          <div className="absolute bottom-0 left-4 h-20 w-20 rounded-full bg-[#cfb07f]/12 blur-3xl" />

          <div className="relative space-y-[var(--reading-block-gap)]">
            <div className="flex items-center border-b border-[#d9c5a3]/45 px-2 pb-2">
              <span className="inline-flex items-center rounded-full bg-[#dcc18e] px-3 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-[#74542b]">
                {SOUL_BADGE}
              </span>
            </div>

            <div className="space-y-[var(--reading-block-gap)] px-1 pt-1">
              <h2 className="max-w-[40ch] font-headline text-[1.35rem] font-semibold leading-[1.12] tracking-[-0.03em] text-current md:text-[1.66rem]">
                {SOUL_TITLE}
              </h2>
            </div>

            <div className="space-y-[var(--reading-section-gap)]">
              {visibleSections.length > 0 ? (
                visibleSections.map((section, index) => (
                  <SoulSectionCard
                    key={`${section.week}-${section.range}-${index}`}
                    section={section}
                    isLast={index === visibleSections.length - 1}
                  />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[#d9c6a5]/70 bg-white/45 px-4 py-5 text-[0.95rem] italic leading-relaxed text-[#7c7367]">
                  {SOUL_EMPTY}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
