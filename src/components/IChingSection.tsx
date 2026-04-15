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

  const listItemPattern = /^(?:[??àÎ£ê???à¬ÄÔΩÇÍ±ô*-]|\d+[.)])\s*(.+)$/u;

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

  if (block.kind === 'list') {
    return (
      <ul
        key={`list-${index}`}
        className="space-y-3 pl-0 text-[15px] font-display leading-[1.95] tracking-[-0.01em] text-ray-body dark:text-warm-gray-200 md:text-[16px]"
      >
        {block.items.map((item, itemIndex) => (
          <li
            key={`list-${index}-item-${itemIndex}`}
            className="relative break-keep pl-5 before:absolute before:left-0 before:top-[0.05em] before:text-elegant-gold before:content-['Ï®?]"
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
          ???Ï¢éÏ????Í≥åÏªô ?Íæ™ÏÜö ?¥—àÏªô??Ä????Íº???????Í≥åÍªê??? ??ÜÎíø??àÎñé.
        </p>
      </div>
    );
  }

  const commentaryText = commentarySource === 'gua'
    ? getGuaCommentary(guaNum)?.trim() ?? ''
    : getYaoCommentary(yaoNum)?.trim() ?? '';
  const hasCommentary = commentaryText.length > 0;
  const commentary = hasCommentary ? splitCommentary(commentaryText) : null;
  const guaMeta = guaData.meta.trim();

  return (
    <section className="w-full animate-fade-in-up stagger-1">
      <div className="space-y-6">
        <div className="relative grid gap-4 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.38fr)] md:gap-6 lg:gap-8 md:items-start md:before:absolute md:before:inset-y-0 md:before:left-[42%] md:before:z-20 md:before:w-px md:before:bg-gradient-to-b md:before:from-transparent md:before:via-warm-gray-300/70 md:before:to-transparent md:before:content-[''] dark:md:before:via-warm-gray-700/60">
          <article className="group relative overflow-hidden rounded-[2.9rem] bg-gradient-to-b from-white/90 via-white/82 to-warm-gray-50/72 dark:from-ray-dark/86 dark:via-ray-dark/82 dark:to-warm-gray-900/50 backdrop-blur-xl shadow-[0_28px_78px_rgba(79,63,39,0.11)] border border-elegant-gold/10 transition-colors duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20" />
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-elegant-gold opacity-5 blur-3xl dark:opacity-5" />

            <div className="relative z-10 h-full min-h-0 p-6 md:p-10">
              <div className="space-y-6">
                <div className="rounded-[2.4rem] border border-elegant-gold/10 bg-white/72 p-5 shadow-[0_18px_40px_rgba(79,63,39,0.06)] backdrop-blur-sm dark:bg-ray-dark/58 md:p-7">
                  <div
                    data-testid="reading-top-unit"
                    className="space-y-5 md:space-y-6"
                  >
                    <div className="border-b border-warm-gray-200 pb-5 dark:border-warm-gray-800">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-6 w-1 rounded-full bg-elegant-gold shadow-[0_0_8px_rgba(184,134,11,0.5)]" />
                        <h3 className="text-xl md:text-[1.9rem] font-bold font-brand leading-tight tracking-[0.01em] text-transparent bg-clip-text bg-gradient-to-r from-warm-gray-800 to-warm-gray-500 break-keep dark:from-white dark:to-warm-gray-400">
                          {guaData.header}
                        </h3>
                      </div>
                    </div>

                    {guaMeta ? (
                      <div
                        data-testid="reading-gua-meta"
                        className="rounded-[2rem] border border-elegant-gold/10 bg-warm-gray-50/80 p-5 shadow-[0_16px_36px_rgba(79,63,39,0.05)] dark:bg-ray-dark/42 md:p-6"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="h-5 w-1 rounded-full bg-elegant-gold/80" />
                          <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-elegant-gold/90">
                            Anamil
                          </span>
                        </div>
                        <p className="max-w-[42rem] whitespace-pre-wrap text-[0.96rem] md:text-[1.05rem] font-display leading-relaxed break-keep text-ray-body dark:text-warm-gray-300">
                          {guaMeta}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                                <div
                  data-testid="reading-verse-unit"
                  className="rounded-[2.4rem] border border-elegant-gold/10 bg-gradient-to-b from-warm-gray-50/72 to-white/82 p-5 shadow-[0_18px_40px_rgba(79,63,39,0.05)] backdrop-blur-sm dark:from-ray-dark/58 dark:to-ray-dark/42 md:p-7"
                >
                  <div className="grid gap-6 md:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] md:items-start md:gap-8">
                    <div className="w-full flex-shrink-0 relative">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-warm-gray-100 to-transparent dark:from-warm-gray-800 transform rotate-3 scale-105 opacity-50 group-hover:rotate-0 transition-transform duration-700" />
                      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-warm-gray-200 bg-warm-gray-50 p-6 shadow-inner transition-all duration-700 hover:scale-105 hover:shadow-2xl dark:border-warm-gray-800 dark:bg-warm-gray-900">
                        {sigilSrc ? (
                          <img
                            src={sigilSrc}
                            alt={`sigil ${yaoNum}`}
                            className="h-full w-full object-contain transition-all duration-700 hover:scale-110 filter dark:brightness-200 dark:contrast-125 dark:grayscale"
                          />
                        ) : (
                          <span className="italic text-sm text-warm-gray-400">??ìÎßå????ÅÎíø??àÎñé</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-3">
                        <PanelBadge>Today&apos;s Reading</PanelBadge>
                      </div>

                      <div className="space-y-3 pt-0.5">
                        <h4 className="max-w-[22ch] text-[1.7rem] font-display font-bold tracking-[-0.03em] leading-[1.28] text-warm-gray-800 break-keep dark:text-white/95 md:text-[2.1rem]">
                          {yaoData.titleLine}
                        </h4>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-elegant-gold/30" />
                          <p className="max-w-[34rem] pl-6 py-2 text-[1.02rem] font-display font-medium italic leading-[1.85] break-keep text-elegant-gold md:text-[1.16rem]">
                            {yaoData.short}
                          </p>
                        </div>
                      </div>
                    </div>

                      <div
                        data-testid="verse-body"
                        className="w-full border-t border-warm-gray-200/60 pt-7 md:pt-8 dark:border-warm-gray-800/60"
                      >
                        <div className="max-w-none text-[15px] leading-[1.9] tracking-[-0.01em] break-keep whitespace-pre-wrap font-display text-ray-body/90 dark:text-warm-gray-200/90 md:text-[16px]">
                          {yaoData.body}
                        </div>
                      </div>
                    </div>
                </div>
              </div>

              <div className="mt-10 border-t border-warm-gray-200/60 pt-8 md:mt-12 md:pt-10 dark:border-warm-gray-800/60">
                <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
              </div>
            </div>
          </article>

          <aside className="relative mt-0 overflow-hidden rounded-[2.25rem] border border-elegant-gold/10 bg-gradient-to-b from-warm-gray-50/90 via-white/85 to-warm-gray-100/70 shadow-[0_16px_44px_rgba(79,63,39,0.07)] backdrop-blur-xl transition-colors duration-300 dark:from-ray-dark/78 dark:via-ray-dark/74 dark:to-warm-gray-900/46 md:mt-10 lg:mt-14">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-elegant-gold opacity-5 blur-3xl dark:opacity-5" />

            <div className="relative z-10 h-full min-h-0 p-6 md:p-8 lg:p-9 md:pl-9">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                <PanelBadge>Commentary</PanelBadge>
                <div className="inline-flex items-center rounded-full border border-warm-gray-200 bg-white/80 p-1 text-[11px] font-bold tracking-[0.18em] uppercase dark:border-warm-gray-700 dark:bg-ray-dark/70">
                  {(['gua', 'yao'] as const).map((source) => {
                    const isActive = commentarySource === source;
                    const label = source === 'gua' ? 'Í¥òÏÇ¨' : '?®ÏÇ¨';

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

              <div className="space-y-6 md:pr-2">
                {commentary ? (
                  <div className="space-y-6">
                    {commentary.heading ? (
                      <h5 className="max-w-[30ch] text-[1.08rem] md:text-[1.22rem] font-display font-semibold tracking-[-0.02em] leading-[1.35] text-warm-gray-700 break-keep dark:text-white/92">
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



