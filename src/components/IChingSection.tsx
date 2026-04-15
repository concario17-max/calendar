import React from 'react';
import { Telescope } from 'lucide-react';
import { getGuaCommentary, getYaoCommentary } from '../data';
import type { CommentarySource, GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { SoulCalendarSection } from './SoulCalendarSection';

interface IChingSectionProps {
  commentarySource?: CommentarySource;
  onCommentarySourceChange?: (source: CommentarySource) => void;
  yaoNum: number | null;
  guaNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  hitSoulGroup?: SoulGroup;
  soulSections?: SoulSection[];
}

interface SplitCommentary {
  heading: string;
  blocks: CommentaryBlock[];
}

type CommentaryBlock =
  | {
      kind: 'paragraph';
      text: string;
    }
  | {
      kind: 'table';
      rows: string[][];
    };

function splitParagraphBlocks(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function parsePipeTableBlock(block: string): string[][] | null {
  const rows = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (rows.length < 2) {
    return null;
  }

  const parsedRows = rows.map((row) =>
    row
      .split('|')
      .map((cell) => cell.trim())
  );

  const firstRow = parsedRows[0];
  if (firstRow.length < 3 || !parsedRows.every((row) => row.length >= 3)) {
    return null;
  }

  if (!parsedRows.every((row) => row.length === firstRow.length)) {
    return null;
  }

  return parsedRows;
}

function splitCommentary(text: string): SplitCommentary {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { heading: '', blocks: [] };
  }

  const newlineIndex = trimmed.indexOf('\n');
  if (newlineIndex === -1) {
    return { heading: trimmed, blocks: [] };
  }

  const heading = trimmed.slice(0, newlineIndex).trim();
  const body = trimmed.slice(newlineIndex + 1).trim();
  const blocks: CommentaryBlock[] = splitParagraphBlocks(body).map((block): CommentaryBlock => {
    const rows = parsePipeTableBlock(block);
    return rows ? { kind: 'table', rows } : { kind: 'paragraph', text: block };
  });

  return {
    heading,
    blocks,
  };
}

function renderCommentaryBlock(block: CommentaryBlock, index: number): React.ReactNode {
  if (block.kind === 'table') {
    const [headerRow, ...bodyRows] = block.rows;

    return (
      <div key={`table-${index}`} className="overflow-x-auto rounded-[1.5rem] border border-warm-gray-200/70 bg-white/70 dark:border-warm-gray-800 dark:bg-ray-dark/40">
        <table className="min-w-full border-collapse text-left text-[0.95rem] md:text-[1rem]">
          <thead className="bg-warm-gray-50/80 dark:bg-warm-gray-900/50">
            <tr>
              {headerRow.map((cell, cellIndex) => (
                <th
                  key={`table-${index}-head-${cellIndex}`}
                  scope="col"
                  className="border-b border-warm-gray-200 px-4 py-3 font-bold text-warm-gray-700 dark:border-warm-gray-700 dark:text-warm-gray-200"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr
                key={`table-${index}-row-${rowIndex}`}
                className="odd:bg-white/70 even:bg-warm-gray-50/60 dark:odd:bg-ray-dark/20 dark:even:bg-warm-gray-900/20"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`table-${index}-row-${rowIndex}-cell-${cellIndex}`}
                    className="border-b border-warm-gray-200 px-4 py-3 align-top text-ray-body dark:border-warm-gray-800 dark:text-warm-gray-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      key={`paragraph-${index}`}
      className="whitespace-pre-wrap break-keep text-[15px] font-display leading-[1.95] tracking-[-0.01em] text-ray-body dark:text-warm-gray-200 md:text-[16px]"
    >
      {block.text}
    </div>
  );
}

function PanelBadge({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-elegant-gold/10 border border-elegant-gold/20 text-elegant-gold text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
      {children}
    </div>
  );
}

export const IChingSection: React.FC<IChingSectionProps> = ({
  commentarySource = 'yao',
  onCommentarySourceChange,
  yaoNum,
  guaNum,
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

  const commentaryText = commentarySource === 'gua'
    ? getGuaCommentary(guaNum)?.trim() ?? ''
    : getYaoCommentary(yaoNum)?.trim() ?? '';
  const hasCommentary = commentaryText.length > 0;
  const commentary = hasCommentary ? splitCommentary(commentaryText) : null;

  return (
    <section className="w-full animate-fade-in-up stagger-1">
      <div className="space-y-6">
        <div className="relative grid gap-4 md:grid-cols-[minmax(0,1.38fr)_minmax(0,0.92fr)] md:gap-6 lg:gap-8 md:items-start md:before:absolute md:before:inset-y-0 md:before:left-[58%] md:before:z-20 md:before:w-px md:before:bg-gradient-to-b md:before:from-transparent md:before:via-warm-gray-300/70 md:before:to-transparent md:before:content-[''] dark:md:before:via-warm-gray-700/60">
          <article className="group relative overflow-hidden rounded-[2.75rem] bg-white/82 dark:bg-ray-dark/80 backdrop-blur-xl shadow-[0_24px_72px_rgba(79,63,39,0.10)] border border-elegant-gold/10 transition-colors duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20" />
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-elegant-gold opacity-5 blur-3xl dark:opacity-5" />

            <div className="relative z-10 h-full min-h-0 p-6 md:p-10">
              <div className="flex items-center justify-between gap-3 mb-8">
                <PanelBadge>Primary Verse</PanelBadge>
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

              <div className="mt-10 border-t border-warm-gray-200/60 pt-8 md:mt-12 md:pt-10 dark:border-warm-gray-800/60">
                <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
              </div>
            </div>
          </article>

          <aside className="relative mt-0 overflow-hidden rounded-[2.25rem] border border-elegant-gold/10 bg-warm-gray-50/85 shadow-[0_18px_54px_rgba(79,63,39,0.08)] backdrop-blur-xl transition-colors duration-300 dark:bg-ray-dark/78 md:mt-10 lg:mt-14">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-elegant-gold opacity-5 blur-3xl dark:opacity-5" />

            <div className="relative z-10 h-full min-h-0 p-6 md:p-8 lg:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                <PanelBadge>Commentary</PanelBadge>
                <div className="inline-flex items-center rounded-full border border-warm-gray-200 bg-white/80 p-1 text-[11px] font-bold tracking-[0.18em] uppercase dark:border-warm-gray-700 dark:bg-ray-dark/70">
                  {(['gua', 'yao'] as const).map((source) => {
                    const isActive = commentarySource === source;
                    const label = source === 'gua' ? 'Gua' : 'Yao';

                    return (
                      <button
                        key={source}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onCommentarySourceChange?.(source)}
                        className={`rounded-full px-3 py-1.5 transition-colors duration-200 ${
                          isActive
                            ? 'bg-elegant-gold text-white shadow-md shadow-elegant-gold/20 dark:text-ray-dark'
                            : 'text-warm-gray-500 hover:text-warm-gray-800 dark:text-warm-gray-400 dark:hover:text-white'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                {commentary ? (
                  <div className="space-y-6">
                    {commentary.heading ? (
                      <h5 className="text-[1.2rem] md:text-[1.35rem] font-display font-semibold tracking-[-0.02em] leading-[1.3] text-warm-gray-800 break-keep dark:text-white/95">
                        {commentary.heading}
                      </h5>
                    ) : null}

                    {commentary.blocks.length > 0 ? commentary.blocks.map(renderCommentaryBlock) : null}
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
