import React from 'react';
import { getGuaCommentary, getYaoCommentary } from '../data';
import type { CommentarySource, GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { SoulCalendarSection } from './SoulCalendarSection';

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

  const listItemPattern = /^(?:[-*•]|\d+[.)])\s*(.+)$/u;

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
                    className="py-3 pr-5 align-top text-[#403327]"
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
        className="list-disc space-y-2 pl-5 text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#403327] md:text-[16px]"
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
      className="whitespace-pre-wrap break-keep text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#403327] md:text-[16px]"
    >
      {block.text}
    </p>
  );
}

function buildSoulCommentaryText(hitSoulGroup: SoulGroup | undefined, soulSections: SoulSection[]): string {
  if (soulSections.length === 0) {
    return '';
  }

  const heading = hitSoulGroup?.titleLine?.trim() || "Rudolf Steiner's Calendar of the Soul";
  const body = soulSections
    .slice(0, 2)
    .map((sec) => `${sec.week}. ${sec.range}\n${sec.text.trim()}`.trim())
    .filter(Boolean)
    .join('\n\n');

  return `${heading}\n${body}`.trim();
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
        : buildSoulCommentaryText(hitSoulGroup, soulSections);
  const commentary = commentaryText.length > 0 ? splitCommentary(commentaryText) : null;
  const guaMeta = guaData.meta.trim();

  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col stagger-1">
      <div className="grid h-full min-h-0 min-w-[720px] grid-cols-[340px_minmax(0,1fr)] overflow-x-auto md:grid-cols-[360px_minmax(0,1fr)]">
        <article className="sticky top-0 flex h-full min-w-[340px] flex-col overflow-y-auto bg-[#f2eadc] px-6 pb-6 pt-6 text-[#4b3b29] md:px-8 md:pb-7 md:pt-7 lg:px-9">
          <div className="flex h-full min-h-0 flex-1 flex-col gap-2">
            <div data-testid="reading-sigil-unit" className="flex justify-center pt-0">
              <div className="w-full max-w-[12rem] sm:max-w-[14rem] md:max-w-[16rem]">
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

            <div data-testid="reading-verse-unit" className="space-y-3">
              <h4 className="max-w-[20ch] break-keep font-headline text-[1.45rem] font-semibold leading-[1.16] tracking-[-0.02em] text-current md:text-[1.72rem]">
                {yaoData.titleLine}
              </h4>

              <p className="max-w-[34rem] break-keep font-body text-[1.02rem] font-medium italic leading-[1.9] tracking-[-0.01em] text-[#7d643f] md:text-[1.1rem]">
                {yaoData.short}
              </p>
            </div>

            <div data-testid="reading-top-unit" className="space-y-3">
              <h3 className="max-w-[18ch] break-keep font-headline text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.03em] text-current md:text-[2.35rem]">
                {guaData.header}
              </h3>

              {guaMeta ? (
                <p
                  data-testid="reading-gua-meta"
                  className="max-w-[34rem] whitespace-pre-wrap break-keep font-body text-[1.02rem] font-medium italic leading-[1.9] tracking-[-0.01em] text-[#7d643f] md:text-[1.1rem]"
                >
                  {guaMeta}
                </p>
              ) : null}
            </div>

            <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
          </div>
        </article>

        <aside className="flex h-full min-w-0 flex-col overflow-y-auto bg-[#fbf8f1] px-6 pb-6 pt-6 md:px-8 md:pb-7 md:pt-7 lg:px-9">
          <div className="mt-1 flex-1 space-y-0">
            {commentary ? (
              <div className="space-y-8">
                {commentary.heading ? (
                  <h5 className="max-w-[30ch] break-keep font-headline text-[2.15rem] font-semibold leading-[1.1] tracking-[-0.03em] text-current md:text-[2.85rem]">
                    {commentary.heading}
                  </h5>
                ) : null}

                {commentarySource === 'yao' ? (
                  <div
                    data-testid="commentary-reading-body"
                    className="max-w-[52ch] whitespace-pre-wrap break-keep font-body text-[1rem] leading-[1.9] tracking-[-0.01em] text-[#403327] md:text-[1.08rem]"
                  >
                    {yaoData.body}
                  </div>
                ) : null}

                <div className="space-y-6">
                  {commentary.blocks.map((block, index) => (
                    <div
                      key={`commentary-block-${index}`}
                      data-testid={`commentary-block-${index}`}
                      className="space-y-3"
                    >
                      {renderCommentaryBlock(block, index)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-5 text-[0.98rem] leading-relaxed text-[#7f756c]">
                Commentary is not available for this selection yet.
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
