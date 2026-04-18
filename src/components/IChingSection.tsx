import React from 'react';
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
      kind: 'list';
      items: string[];
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
    row.split('|').map((cell) => cell.trim()),
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

function parseMarkerListBlock(block: string): string[] | null {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 3) {
    return null;
  }

  if (lines[0] !== '[[list]]' || lines[lines.length - 1] !== '[[/list]]') {
    return null;
  }

  const items = lines.slice(1, -1).map((line) => {
    if (!line.startsWith('[[item]]')) {
      return null;
    }

    return normalizeListItemText(line.slice('[[item]]'.length));
  });

  if (items.some((item) => !item || item.length === 0)) {
    return null;
  }

  return items as string[];
}

function parseListBlock(block: string): string[] | null {
  const markerItems = parseMarkerListBlock(block);
  if (markerItems) {
    return markerItems;
  }

  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return null;
  }

  const listItemPattern = /^(?:[-*•·]|\d+[.)])\s*(.+)$/u;

  const items = lines.map((line) => {
    const match = line.match(listItemPattern);
    if (!match) {
      return null;
    }

    return normalizeListItemText(match[1] ?? '');
  });

  if (items.some((item) => !item || item.length === 0)) {
    return null;
  }

  return items as string[];
}

function normalizeListItemText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
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
    if (rows) {
      return { kind: 'table', rows };
    }

    const items = parseListBlock(block);
    if (items) {
      return { kind: 'list', items };
    }

    return { kind: 'paragraph', text: block };
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
      <div key={`table-${index}`} className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[0.95rem] md:text-[1rem]">
          <thead>
            <tr className="border-b border-warm-gray-200/80 dark:border-warm-gray-700/70">
              {headerRow.map((cell, cellIndex) => (
                <th
                  key={`table-${index}-head-${cellIndex}`}
                  scope="col"
                  className="px-0 py-3 pr-5 font-bold text-warm-gray-700 dark:text-warm-gray-200"
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
                className="border-b border-warm-gray-100/70 last:border-b-0 dark:border-warm-gray-800/70"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`table-${index}-row-${rowIndex}-cell-${cellIndex}`}
                    className="py-3 pr-5 align-top text-ray-body dark:text-warm-gray-200"
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

  if (block.kind === 'list') {
    return (
      <ul
        key={`list-${index}`}
        className="list-disc space-y-2 pl-5 text-[15px] font-display leading-[1.95] tracking-[-0.01em] text-ray-body dark:text-warm-gray-200 md:text-[16px]"
      >
        {block.items.map((item, itemIndex) => (
          <li key={`list-${index}-item-${itemIndex}`} className="break-keep">
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p
      key={`paragraph-${index}`}
      className="whitespace-pre-wrap break-keep text-[15px] font-display leading-[1.95] tracking-[-0.01em] text-ray-body dark:text-warm-gray-200 md:text-[16px]"
    >
      {block.text}
    </p>
  );
}

function PanelBadge({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-elegant-gold/20 bg-elegant-gold/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-elegant-gold sm:text-xs">
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
      <div className="px-6 py-6 text-sm italic text-warm-gray-500 opacity-60 dark:text-warm-gray-400 md:px-8 md:py-8 lg:px-10">
        Reading data is not available yet.
      </div>
    );
  }

  const commentaryText =
    commentarySource === 'gua'
      ? getGuaCommentary(guaNum)?.trim() ?? ''
      : getYaoCommentary(yaoNum)?.trim() ?? '';
  const commentary = commentaryText.length > 0 ? splitCommentary(commentaryText) : null;
  const guaMeta = guaData.meta.trim();

  return (
    <section className="w-full animate-fade-in-up stagger-1">
      <div className="grid gap-0 md:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
        <article className="min-w-0 bg-[#efe3cf] px-6 py-6 text-[#4b3b29] dark:bg-[#1f1b16] dark:text-warm-gray-100 md:border-r md:border-black/10 md:px-8 md:py-8 lg:px-10">
          <div className="space-y-0">
            <div data-testid="reading-top-unit" className="border-b border-black/10 pb-6 dark:border-white/10 md:pb-7">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-elegant-gold shadow-[0_0_8px_rgba(184,134,11,0.35)]" />
                <h3 className="break-keep font-brand text-[1.45rem] font-bold leading-tight tracking-[0.01em] text-current md:text-[1.9rem]">
                  {guaData.header}
                </h3>
              </div>

              {guaMeta ? (
                <p
                  data-testid="reading-gua-meta"
                  className="mt-4 max-w-[42rem] whitespace-pre-wrap break-keep font-display text-[0.96rem] leading-relaxed text-current/90 md:text-[1.05rem]"
                >
                  {guaMeta}
                </p>
              ) : null}
            </div>

            <div data-testid="reading-verse-unit" className="border-b border-black/10 py-6 dark:border-white/10 md:py-7">
              <div data-testid="verse-layout" className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
                <div data-testid="verse-top-row" className="space-y-4">
                  <PanelBadge>Today&apos;s Reading</PanelBadge>

                  <div className="space-y-3">
                    <h4 className="max-w-[22ch] break-keep font-display text-[1.7rem] font-bold leading-[1.28] tracking-[-0.03em] text-current md:text-[2.1rem]">
                      {yaoData.titleLine}
                    </h4>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-elegant-gold/35" />
                      <p className="max-w-[34rem] break-keep py-2 pl-6 font-display text-[1.02rem] font-medium italic leading-[1.85] text-elegant-gold md:text-[1.16rem]">
                        {yaoData.short}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full flex-shrink-0 md:w-[clamp(8.5rem,18vw,12rem)] md:justify-self-end md:self-center">
                  {sigilSrc ? (
                    <img
                      src={sigilSrc}
                      alt={`sigil ${yaoNum}`}
                      className="block h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.04] dark:brightness-200 dark:contrast-125 dark:grayscale"
                    />
                  ) : (
                    <span className="text-sm italic text-warm-gray-400">Sigil not available</span>
                  )}
                </div>

                <div data-testid="verse-body" className="md:col-span-2 pt-1 md:pt-2">
                  <div className="max-w-none whitespace-pre-wrap break-keep font-display text-[15px] leading-[1.9] tracking-[-0.01em] text-current/90 md:text-[16px]">
                    {yaoData.body}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-7">
              <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
            </div>
          </div>
        </article>

        <aside className="min-w-0 bg-[#fbfaf5] px-6 py-6 dark:bg-[#171511] md:px-8 md:py-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5 dark:border-white/10">
            <PanelBadge>Commentary</PanelBadge>
            <div className="inline-flex items-center rounded-full border border-warm-gray-200 bg-white/80 p-1 text-[11px] font-bold uppercase tracking-[0.18em] dark:border-warm-gray-700 dark:bg-ray-dark/70">
              {(['gua', 'yao'] as const).map((source) => {
                const isActive = commentarySource === source;
                const label = source === 'gua' ? 'GUA' : 'YAO';

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

          <div className="mt-6 space-y-0">
            {commentary ? (
              <div className="space-y-5">
                {commentary.heading ? (
                  <h5 className="max-w-[30ch] break-keep font-display text-[1.08rem] font-semibold leading-[1.35] tracking-[-0.02em] text-warm-gray-700 dark:text-white/92 md:text-[1.22rem]">
                    {commentary.heading}
                  </h5>
                ) : null}

                <div className="space-y-5">
                  {commentary.blocks.map((block, index) => (
                    <div
                      key={`commentary-block-${index}`}
                      data-testid={`commentary-block-${index}`}
                      className={index === 0 ? 'space-y-4' : 'border-t border-black/8 pt-5 dark:border-white/10'}
                    >
                      {renderCommentaryBlock(block, index)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-5 text-[0.98rem] leading-relaxed text-warm-gray-500 dark:text-warm-gray-400">
                Commentary is not available for this selection yet.
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
