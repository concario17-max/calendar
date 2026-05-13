import React from 'react';
import { Sparkles } from 'lucide-react';
import type { SoulGroup, SoulSection } from '../types';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";
const SOUL_BADGE = '루돌프 슈타이너의 영혼의 달력';
const SOUL_EMPTY = '영혼 본문이 아직 없어.';
const commentaryFolioClass =
  'relative overflow-hidden rounded-[2rem] border border-[#d8c4a1]/60 bg-[linear-gradient(180deg,rgba(250,244,235,0.98),rgba(243,235,220,0.9))] px-4 py-4 shadow-[0_24px_70px_rgba(109,84,47,0.12)]';
const commentaryHeadingClass =
  'mx-auto w-full max-w-[52rem] break-keep font-headline text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.035em] text-current md:text-[2.7rem]';
const commentaryBodyClass =
  'mx-auto w-full max-w-[52rem] break-keep font-body text-[1rem] leading-[1.92] tracking-[-0.01em] text-[#566471] md:text-[1.08rem]';

interface ParsedDateRange {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

function parseDateRange(range: string): ParsedDateRange | null {
  const compact = range.replace(/\s+/g, ' ').trim();
  const crossMonthMatch = compact.match(/(\d{1,2})\D+(\d{1,2})\D*-\D*(\d{1,2})\D+(\d{1,2})/u);

  if (crossMonthMatch) {
    const [, startMonth, startDay, endMonth, endDay] = crossMonthMatch;
    return {
      startMonth: Number(startMonth),
      startDay: Number(startDay),
      endMonth: Number(endMonth),
      endDay: Number(endDay),
    };
  }

  const sameMonthMatch = compact.match(/(\d{1,2})\D+(\d{1,2})\D*-\D*(\d{1,2})/u);
  if (!sameMonthMatch) {
    return null;
  }

  const [, month, startDay, endDay] = sameMonthMatch;
  return {
    startMonth: Number(month),
    startDay: Number(startDay),
    endMonth: Number(month),
    endDay: Number(endDay),
  };
}

function normalizeDateRange(range: string): string {
  const parsed = parseDateRange(range);
  if (!parsed) {
    return range.replace(/\s+/g, ' ').trim().replace(/\s*-\s*/g, '-');
  }

  if (parsed.startMonth === parsed.endMonth) {
    return `${parsed.startMonth}월 ${parsed.startDay}일-${parsed.endDay}일`;
  }

  return `${parsed.startMonth}월 ${parsed.startDay}일-${parsed.endMonth}월 ${parsed.endDay}일`;
}

function formatWeekRange(week: number, range: string): string {
  return `${week}주(${normalizeDateRange(range)})`;
}

function normalizeWeeksLabel(label: string): string {
  const normalized = label.replace(/\s+/g, ' ').trim();
  const segments = normalized
    .split(/\s*\/\s*/u)
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length === 0) {
    return normalized;
  }

  const formattedSegments = segments.map((segment) => {
    const match = segment.match(/(\d{1,2})\D+(.*)/u);
    if (!match) {
      return segment;
    }

    const [, week, rawRange] = match;
    return `${Number(week)}주(${normalizeDateRange(rawRange)})`;
  });

  return formattedSegments.join(' · ');
}

export function formatWeeksLabel(hitSoulGroup: SoulGroup | undefined, soulSections: SoulSection[]): string {
  if (soulSections.length > 0) {
    return soulSections.map((section) => formatWeekRange(section.week, section.range)).join(' · ');
  }

  if (hitSoulGroup?.weeksLabel) {
    return normalizeWeeksLabel(hitSoulGroup.weeksLabel);
  }

  return '';
}

function SoulSectionBlock({ section, isFirst }: { section: SoulSection; isFirst: boolean }) {
  return (
    <article
      className={[
        'mx-auto w-full max-w-[52rem] break-keep',
        isFirst ? '' : 'border-t border-[#d9c5a3]/35 pt-[var(--reading-section-gap)]',
      ].join(' ')}
    >
      <div className="mb-[var(--reading-block-gap)] flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full bg-[#ead7b3] px-3 py-0.5 text-[10px] font-semibold tracking-[0.24em] text-[#7a5d2d]">
          {section.week}주
        </span>
        <span className="text-[0.78rem] italic tracking-[0.12em] text-[#8a7d70]">
          {normalizeDateRange(section.range)}
        </span>
      </div>

      <p className={`${commentaryBodyClass} whitespace-pre-wrap border-l-2 border-[#d6bf96]/80 pl-4`}>
        {section.text}
      </p>
    </article>
  );
}

export const SoulCalendarSection: React.FC<SoulCalendarSectionProps> = ({ hitSoulGroup, soulSections }) => {
  const visibleSections = soulSections.slice(0, 2);
  const weeksLabel = formatWeeksLabel(hitSoulGroup, soulSections);

  return (
    <section className="reading-fade-in relative min-w-0 pb-8 md:pb-10">
      <div className="space-y-[var(--reading-section-gap)]">
        <div className="flex items-center justify-between gap-3 border-b border-[#d9c5a3]/45 pb-2">
          <span className="inline-flex items-center rounded-full bg-[#dcc18e] px-3 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-[#74542b]">
            {SOUL_BADGE}
          </span>
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d9c5a3]/65 bg-[#fbf8f1] text-[#8f7c62]"
          >
            <Sparkles size={12} strokeWidth={2.1} />
          </span>
        </div>

        <div className={commentaryFolioClass}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d1b68a]/85 to-transparent" />
          <div className="absolute -right-2 top-2 h-16 w-16 rounded-full bg-[#efdebc]/45 blur-2xl" />
          <div className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-[#cfb07f]/12 blur-3xl" />

          <div className="relative space-y-[var(--reading-block-gap)]">
            <h2 className={commentaryHeadingClass}>{SOUL_TITLE}</h2>

            {weeksLabel ? <p className={`${commentaryBodyClass} italic text-[#7b6d58]`}>{weeksLabel}</p> : null}

            <div className="space-y-[var(--reading-section-gap)] border-t border-[#d9c5a3]/35 pt-[var(--reading-block-gap)]">
              {visibleSections.length > 0 ? (
                visibleSections.map((section, index) => (
                  <SoulSectionBlock
                    key={`${section.week}-${section.range}-${index}`}
                    section={section}
                    isFirst={index === 0}
                  />
                ))
              ) : (
                <p className={`${commentaryBodyClass} italic text-[#7c7367]`}>{SOUL_EMPTY}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
