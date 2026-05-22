import React from 'react';
import { Sparkles } from 'lucide-react';
import type { SoulGroup, SoulSection } from '../types';
import { formatSoulDateRange, formatWeeksLabel } from '../utils/soulLogic';
import { CommentaryFrame } from './shared/CommentaryFrame';

interface SoulCalendarSectionProps {
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
}

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";
const SOUL_BADGE = 'SOUL';
const SOUL_EMPTY = 'Soul verses are not available yet.';
const commentaryHeadingClass =
  'mx-auto w-full max-w-[52rem] break-keep font-headline text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.035em] text-on-surface md:text-[2.7rem]';
const commentaryBodyClass =
  'mx-auto w-full max-w-[52rem] break-keep font-body text-[1rem] leading-[1.92] tracking-[-0.01em] text-on-surface-variant md:text-[1.08rem]';

function SoulSectionBlock({ section, isFirst }: { section: SoulSection; isFirst: boolean }) {
  return (
    <article
      className={[
        'mx-auto w-full max-w-[52rem] break-keep',
        isFirst ? '' : 'border-t border-outline-variant/35 pt-[var(--reading-section-gap)]',
      ].join(' ')}
    >
      <div className="mb-[var(--reading-block-gap)] flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full border border-secondary/15 bg-secondary/10 px-3 py-0.5 text-[10px] font-semibold tracking-[0.24em] text-secondary">
          {section.week}주
        </span>
        <span className="text-[0.78rem] italic tracking-[0.12em] text-on-surface-variant">
          {formatSoulDateRange(section.range)}
        </span>
      </div>

      <p className={`${commentaryBodyClass} whitespace-pre-wrap border-l-2 border-secondary/20 pl-4`}>
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
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant/50 pb-2">
          <span className="inline-flex items-center rounded-full border border-secondary/15 bg-secondary/10 px-3 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-secondary">
            {SOUL_BADGE}
          </span>
          <span
            aria-hidden="true"
            className="ui-button ui-button--ghost inline-flex h-8 w-8 items-center justify-center rounded-full p-0 text-on-surface-variant"
          >
            <Sparkles size={12} strokeWidth={2.1} />
          </span>
        </div>

        <CommentaryFrame>
          <div className="space-y-[var(--reading-block-gap)]">
            <h2 className={commentaryHeadingClass}>{SOUL_TITLE}</h2>

            {weeksLabel ? <p className={`${commentaryBodyClass} italic text-on-surface-variant`}>{weeksLabel}</p> : null}

            <div className="space-y-[var(--reading-section-gap)] border-t border-outline-variant/35 pt-[var(--reading-block-gap)]">
              {visibleSections.length > 0 ? (
                visibleSections.map((section, index) => (
                  <SoulSectionBlock
                    key={`${section.week}-${section.range}-${index}`}
                    section={section}
                    isFirst={index === 0}
                  />
                ))
              ) : (
                <div data-testid="soul-empty-state" role="status" aria-live="polite" className="mx-auto w-full max-w-[52rem]">
                  <p className={`${commentaryBodyClass} italic text-on-surface-variant`}>{SOUL_EMPTY}</p>
                </div>
              )}
            </div>
          </div>
        </CommentaryFrame>
      </div>
    </section>
  );
};
