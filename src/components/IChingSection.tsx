import React from 'react';
import { Telescope } from 'lucide-react';
import type { GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { SoulCalendarSection } from './SoulCalendarSection';

interface IChingSectionProps {
  yaoNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  hitSoulGroup?: SoulGroup;
  soulSections?: SoulSection[];
}

interface SplitCommentary {
  heading: string;
  body: string;
}

function splitCommentary(text: string): SplitCommentary {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { heading: '', body: '' };
  }

  const newlineIndex = trimmed.indexOf('\n');
  if (newlineIndex === -1) {
    return { heading: trimmed, body: '' };
  }

  return {
    heading: trimmed.slice(0, newlineIndex).trim(),
    body: trimmed.slice(newlineIndex + 1).trim(),
  };
}

function PanelBadge({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-elegant-gold/10 border border-elegant-gold/20 text-elegant-gold text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
      {children}
    </div>
  );
}

export const IChingSection: React.FC<IChingSectionProps> = ({
  yaoNum,
  guaData,
  yaoData,
  hitSoulGroup,
  soulSections = [],
}) => {
  const sigilSrc = yaoNum !== null ? `/images/yao-${yaoNum}.png` : null;

  if (!guaData || !yaoData) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-20 opacity-50 bg-white/50 dark:bg-ray-dark/50 rounded-[2.5rem] border border-dashed border-warm-gray-300 dark:border-warm-gray-700 animate-fade-in-up">
        <div className="w-16 h-16 border-2 border-dashed border-warm-gray-400 rounded-full flex items-center justify-center mb-4">
          <Telescope className="text-warm-gray-400 w-8 h-8" />
        </div>
        <p className="font-display italic text-warm-gray-600 dark:text-warm-gray-400">
          이 날짜는 연간 전환 구간이라 역경 항목이 연결되지 않습니다.
        </p>
      </div>
    );
  }

  const commentaryText = yaoData.commentary?.trim() ?? '';
  const hasCommentary = commentaryText.length > 0;
  const commentary = hasCommentary ? splitCommentary(commentaryText) : null;

  return (
    <section className="w-full animate-fade-in-up stagger-1">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
          <article className="group relative overflow-hidden rounded-[2.5rem] bg-white/80 dark:bg-ray-dark/80 backdrop-blur-xl shadow-xl border border-elegant-gold/10 transition-colors duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20" />
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-elegant-gold opacity-5 blur-3xl dark:opacity-5" />

            <div className="relative z-10 h-full min-h-0 p-6 md:p-10 md:h-[min(80vh,58rem)] md:overflow-y-auto">
              <div className="flex items-center justify-between gap-3 mb-8">
                <PanelBadge>Primary Verse</PanelBadge>
                <span className="text-[0.68rem] sm:text-xs font-bold tracking-[0.22em] uppercase text-warm-gray-400 dark:text-warm-gray-500">
                  Existing Body
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                <div className="w-full md:w-1/3 flex-shrink-0 relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-warm-gray-100 to-transparent dark:from-warm-gray-800 transform rotate-3 scale-105 opacity-50 group-hover:rotate-0 transition-transform duration-700" />
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-warm-gray-200 bg-warm-gray-50 p-6 shadow-inner transition-all duration-700 hover:scale-105 hover:shadow-2xl dark:border-warm-gray-800 dark:bg-warm-gray-900">
                    {sigilSrc ? (
                      <img
                        src={sigilSrc}
                        alt={`sigil ${yaoNum}`}
                        className="h-full w-full object-contain transition-all duration-700 hover:scale-110 filter dark:brightness-200 dark:contrast-125 dark:grayscale"
                      />
                    ) : (
                      <span className="italic text-sm text-warm-gray-400">시길이 없습니다</span>
                    )}
                  </div>
                </div>

                <div className="relative z-10 w-full space-y-8 md:w-2/3">
                  <div className="border-b border-warm-gray-200 pb-8 dark:border-warm-gray-800">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-6 w-1 rounded-full bg-elegant-gold shadow-[0_0_8px_rgba(184,134,11,0.5)]" />
                      <h3 className="text-xl md:text-[1.9rem] font-bold font-brand leading-tight tracking-[0.01em] text-transparent bg-clip-text bg-gradient-to-r from-warm-gray-800 to-warm-gray-500 break-keep dark:from-white dark:to-warm-gray-400">
                        {guaData.header}
                      </h3>
                    </div>
                    <p className="max-w-[34rem] text-[0.96rem] md:text-[1.06rem] font-display leading-relaxed italic break-keep text-ray-body dark:text-warm-gray-300">
                      {guaData.meta}
                    </p>
                  </div>

                  <div className="space-y-6 pt-2">
                    <PanelBadge>Today&apos;s Reading</PanelBadge>

                    <h4 className="max-w-[22ch] text-[1.7rem] font-display font-bold tracking-[-0.03em] leading-[1.28] text-warm-gray-800 break-keep dark:text-white/95 md:text-[2.1rem]">
                      {yaoData.titleLine}
                    </h4>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-elegant-gold/30" />
                      <p className="max-w-[28rem] pl-6 py-2 text-[1.02rem] font-display font-medium italic leading-[1.85] break-keep text-elegant-gold md:text-[1.16rem]">
                        {yaoData.short}
                      </p>
                    </div>

                    <div className="pt-4 text-[15px] leading-[1.9] tracking-[-0.01em] break-keep whitespace-pre-wrap font-display text-ray-body/90 dark:text-warm-gray-200/90 md:text-[16px]">
                      {yaoData.body}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 md:pt-14">
                <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
              </div>
            </div>
          </article>

          <aside className="relative overflow-hidden rounded-[2.5rem] border border-elegant-gold/10 bg-white/80 shadow-xl backdrop-blur-xl transition-colors duration-300 dark:bg-ray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-elegant-gold opacity-5 blur-3xl dark:opacity-5" />

            <div className="relative z-10 h-full min-h-0 p-6 md:p-10 md:h-[min(80vh,58rem)] md:overflow-y-auto">
              <div className="flex items-center justify-between gap-3 mb-8">
                <PanelBadge>Commentary</PanelBadge>
                <span className="text-[0.68rem] sm:text-xs font-bold tracking-[0.22em] uppercase text-warm-gray-400 dark:text-warm-gray-500">
                  Scrollable
                </span>
              </div>

              <div className="space-y-6">
                <h4 className="text-[1.45rem] md:text-[1.8rem] font-display font-bold tracking-[-0.03em] leading-[1.2] text-warm-gray-800 break-keep dark:text-white/95">
                  Commentary
                </h4>

                {commentary ? (
                  <div className="space-y-6">
                    {commentary.heading ? (
                      <h5 className="text-[1.2rem] md:text-[1.35rem] font-display font-semibold tracking-[-0.02em] leading-[1.3] text-warm-gray-800 break-keep dark:text-white/95">
                        {commentary.heading}
                      </h5>
                    ) : null}

                    {commentary.body ? (
                      <div className="whitespace-pre-wrap break-keep text-[15px] font-display leading-[1.95] tracking-[-0.01em] text-ray-body dark:text-warm-gray-200 md:text-[16px]">
                        {commentary.body}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-warm-gray-200 bg-warm-gray-50/70 p-6 text-[0.98rem] leading-relaxed text-warm-gray-500 dark:border-warm-gray-800 dark:bg-warm-gray-900/40 dark:text-warm-gray-400">
                    Commentary is not available for this selection yet.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
