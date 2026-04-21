import React from 'react';
import { getGuaCommentary, getYaoCommentary } from '../data';
import type { CommentarySource, GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { formatWeeksLabel, SoulCalendarSection } from './SoulCalendarSection';

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";
const decoratedSurfaceClass =
  'relative overflow-hidden rounded-[1.5rem] border border-[#d7c7a9]/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(249,243,232,0.92))] px-4 py-4 shadow-[0_14px_32px_rgba(105,82,48,0.09)] backdrop-blur-sm';

interface IChingSectionProps {
  commentarySource?: CommentarySource;
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

  const parsedRows = rows.map((row) => row.split('|').map((cell) => cell.trim()));
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

  const listItemPattern = /^(?:[-*??|\d+[.)])\s*(.+)$/u;

  const items = lines.map((line) => {
    const match = line.match(listItemPattern);
    if (!match) {
      return null;
    }

    return normalizeListItemText(match[1] || '');
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
      <div key={`table-${index}`} className="overflow-x-auto rounded-[1.25rem] bg-[#f4efe6] px-5 py-4">
        <table className="min-w-full border-collapse text-left text-[0.95rem] md:text-[1rem]">
          <thead>
            <tr>
              {headerRow.map((cell, cellIndex) => (
                <th
                  key={`table-${index}-head-${cellIndex}`}
                  scope="col"
                  className="px-0 py-3 pr-5 font-semibold text-[#4b3b29]"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr key={`table-${index}-row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`table-${index}-row-${rowIndex}-cell-${cellIndex}`}
                    className="py-3 pr-5 align-top text-[#566471]"
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
        className="list-disc space-y-2 pl-5 text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#566471] md:text-[16px]"
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
      className="whitespace-pre-wrap break-keep text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#566471] md:text-[16px]"
    >
      {block.text}
    </p>
  );
}

function DecoratedSurfaceCard({
  children,
  testId,
  className = '',
}: {
  children: React.ReactNode;
  testId?: string;
  className?: string;
}) {
  return (
    <article
      data-testid={testId}
      className={[decoratedSurfaceClass, className].filter(Boolean).join(' ')}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6c19a]/80 to-transparent" />
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#d8c2a0]/20 blur-2xl" />
      <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#bba070]/10 blur-3xl" />
      <div className="relative">{children}</div>
    </article>
  );
}

export const IChingSection: React.FC<IChingSectionProps> = ({
  commentarySource = 'yao',
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
      <div className="px-6 py-6 text-sm italic text-[#7f756c] opacity-70 md:px-8 md:py-8 lg:px-10">
        Reading data is not available yet.
      </div>
    );
  }

  const commentaryText =
    commentarySource === 'gua'
      ? (getGuaCommentary(guaNum)?.trim() || '')
      : commentarySource === 'yao'
        ? (getYaoCommentary(yaoNum)?.trim() || '')
        : '';
  const commentary = commentaryText.length > 0 ? splitCommentary(commentaryText) : null;
  const showSoulPanel = commentarySource === 'soul';
  const leftSoulWeeksLabel = formatWeeksLabel(undefined, soulSections);
  const guaMeta = guaData.meta.trim();

  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col stagger-1">
      <div className="grid h-full min-h-0 min-w-[720px] grid-cols-[340px_minmax(0,1fr)] overflow-x-auto md:grid-cols-[360px_minmax(0,1fr)]">
        <article className="sticky top-0 flex h-full min-w-[340px] flex-col overflow-y-auto bg-[#f2eadc] px-6 pb-5 pt-0 text-[#4b3b29] md:px-8 md:pb-6 md:pt-0.5 lg:px-9">
          <div className="flex h-full min-h-0 flex-1 flex-col gap-2">
            <div data-testid="reading-sigil-unit" className="-mt-2 flex justify-center pt-0 md:-mt-2">
              <div className="w-full max-w-[8.5rem] sm:max-w-[10rem] md:max-w-[11.5rem]">
                {sigilSrc ? (
                  <img
                    src={sigilSrc}
                    alt={`sigil ${yaoNum}`}
                    className="block h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.04]"
                  />
                ) : (
                  <span className="text-sm italic text-[#8b8178]">Sigil not available</span>
                )}
              </div>
            </div>

            <div data-testid="reading-verse-unit" className="space-y-1.5 border-t border-[#d3c1a3]/60 pt-2 md:pt-3">
              <p className="inline-flex items-center rounded-full border border-[#d7c7a9]/60 bg-[#f4eadc]/70 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8e7a5d]">
                효사
              </p>
              <h4 className="max-w-[40ch] break-keep font-headline text-[1.35rem] font-semibold leading-[1.12] tracking-[-0.03em] text-current md:text-[1.66rem]">
                {yaoData.titleLine}
              </h4>

              <p className="max-w-[40ch] break-keep font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-[#566471] md:text-[1.05rem]">
                {yaoData.short}
              </p>
            </div>

            <div data-testid="reading-top-unit" className="space-y-1.5 border-t border-[#d3c1a3]/60 pt-2 md:pt-3">
              <p className="inline-flex items-center rounded-full border border-[#d7c7a9]/50 bg-[#f4eadc]/55 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9b886a]">
                괘사
              </p>
              <h3 className="max-w-[40ch] break-keep font-headline text-[1.35rem] font-semibold leading-[1.12] tracking-[-0.025em] text-current md:text-[1.66rem]">
                {guaData.header}
              </h3>

              {guaMeta ? (
                <p
                  data-testid="reading-gua-meta"
                  className="max-w-[40ch] whitespace-pre-wrap break-keep font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-[#566471] md:text-[1.05rem]"
                >
                  {guaMeta}
                </p>
              ) : null}
            </div>

            <div data-testid="reading-soul-title-unit" className="space-y-1.5 pb-3 pt-1 md:pb-4">
              <p className="inline-flex items-center rounded-full border border-[#d7c7a9]/50 bg-[#f4eadc]/55 px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.22em] text-[#9a8a75]">
                영혼
              </p>
              <h2 className="max-w-[40ch] font-headline text-[1.35rem] font-semibold leading-[1.12] tracking-[-0.03em] text-current md:text-[1.66rem]">
                {SOUL_TITLE}
              </h2>
              {leftSoulWeeksLabel ? (
                <p className="max-w-[40ch] font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-[#566471] md:text-[1.05rem]">
                  {leftSoulWeeksLabel}
                </p>
              ) : null}
            </div>
          </div>
        </article>

        <aside className="flex h-full min-w-0 flex-col overflow-y-auto bg-[#fbf8f1] px-6 pb-6 pt-6 md:px-8 md:pb-7 md:pt-7 lg:px-9">
          <div className="mt-1 flex-1 space-y-0">
            {showSoulPanel ? (
              <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
            ) : commentary ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-[#d9c5a3]/45 px-2 pb-2">
                  <span className="inline-flex items-center rounded-full bg-[#dcc18e] px-3 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-[#74542b]">
                    COMMENTARY
                  </span>
                  <span className="text-[0.72rem] uppercase tracking-[0.28em] text-[#8a7d70]">
                    {commentary.blocks.length > 0 ? `${commentary.blocks.length} blocks` : 'no block'}
                  </span>
                </div>

                <div className="space-y-4">
                  <DecoratedSurfaceCard testId="commentary-shell">
                    {commentary.heading ? (
                      <h5 className="max-w-[40ch] break-keep font-headline text-[2.15rem] font-semibold leading-[1.1] tracking-[-0.03em] text-current md:text-[2.85rem]">
                        {commentary.heading}
                      </h5>
                    ) : null}

                    {commentarySource === 'yao' ? (
                      <div
                        data-testid="commentary-reading-body"
                        className="max-w-[40ch] whitespace-pre-wrap break-keep font-body text-[1rem] leading-[1.9] tracking-[-0.01em] text-[#566471] md:text-[1.08rem]"
                      >
                        {yaoData.body}
                      </div>
                    ) : null}
                  </DecoratedSurfaceCard>

                  <div className="space-y-3">
                    {commentary.blocks.map((block, index) => (
                      <DecoratedSurfaceCard key={`commentary-block-${index}`} testId={`commentary-block-${index}`}>
                        <div className="space-y-3">{renderCommentaryBlock(block, index)}</div>
                      </DecoratedSurfaceCard>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <DecoratedSurfaceCard>
                <div className="pt-1 text-[0.98rem] leading-relaxed text-[#7f756c]">
                  Commentary is not available for this selection yet.
                </div>
              </DecoratedSurfaceCard>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};


