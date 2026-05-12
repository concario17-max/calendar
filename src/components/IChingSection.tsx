import React from 'react';
import { Images } from 'lucide-react';
import { getGuaCommentary, getYaoCommentary } from '../data';
import type { CommentarySource, GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { formatWeeksLabel, SoulCalendarSection } from './SoulCalendarSection';

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";
const compactLeftBadgeClass =
  'inline-flex w-fit items-center rounded-full border px-1.5 py-0.5 text-[8px] font-semibold leading-none tracking-[0.14em]';
const decoratedSurfaceClass =
  'relative overflow-hidden rounded-[1.5rem] border border-[#d7c7a9]/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(249,243,232,0.92))] px-4 py-4 shadow-[0_14px_32px_rgba(105,82,48,0.09)] backdrop-blur-sm';
const manuscriptUnitClass =
  'reading-section reading-fade-in border-l border-[#d9c5a3]/60 pl-4 md:pl-5';
const commentaryFolioClass =
  'relative overflow-hidden rounded-[2rem] border border-[#d8c4a1]/60 bg-[linear-gradient(180deg,rgba(250,244,235,0.98),rgba(243,235,220,0.9))] px-4 py-4 shadow-[0_24px_70px_rgba(109,84,47,0.12)]';
const commentaryHeadingClass =
  'mx-auto w-full max-w-[52rem] break-keep font-headline text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.035em] text-current md:text-[2.7rem]';
const commentaryBodyClass =
  'mx-auto w-full max-w-[52rem] break-keep font-body text-[1rem] leading-[1.92] tracking-[-0.01em] text-[#566471] md:text-[1.08rem]';
const commentaryLeadLineClass =
  'mx-auto flex w-full max-w-[52rem] flex-wrap items-start gap-2 break-keep rounded-[1rem] border border-[#d9c5a3]/55 bg-[#f4eadc] px-3 py-2 text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#4b3b29] md:text-[16px]';
const yaoLearningImageModules = import.meta.glob('../../image/효사/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const yaoLearningComicModules = import.meta.glob('../../학습만화/효사/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const guaLearningComicModules = import.meta.glob('../../학습만화/괘사/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

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
      items: CommentaryListItem[];
    }
  | {
      kind: 'table';
      rows: string[][];
    };

interface CommentaryListItem {
  text: string;
  children: CommentaryListItem[];
}

function isMarkerListOpenToken(line: string): boolean {
  return /^\[{1,2}list\]\]$/.test(line);
}

function isMarkerListCloseToken(line: string): boolean {
  return /^\[{1,2}\/list\]\]$/.test(line);
}

function parseMarkerItemToken(line: string): string | null {
  const match = line.match(/^\[{1,2}item\]\]\s*(.+)$/u);
  if (!match) {
    return null;
  }

  const text = normalizeListItemText(match[1] || '');
  return text.length > 0 ? text : null;
}

function buildLearningImageMap(modules: Record<string, string>): Record<number, string> {
  const entries = Object.entries(modules)
    .map(([path, src]) => {
      const match = path.match(/\/(\d+)\.[^.]+$/);
      if (!match) {
        return null;
      }

      return [Number(match[1]), src] as const;
    })
    .filter((entry): entry is readonly [number, string] => entry !== null);

  return Object.fromEntries(entries);
}

const yaoLearningImageMap = buildLearningImageMap({
  ...yaoLearningImageModules,
  ...yaoLearningComicModules,
});
const guaLearningImageMap = buildLearningImageMap({
  ...guaLearningComicModules,
});

function getLearningImageSrc(source: CommentarySource, num: number | null): string | null {
  if (num === null) {
    return null;
  }

  if (source === 'yao') {
    return yaoLearningImageMap[num] ?? null;
  }

  if (source === 'gua') {
    return guaLearningImageMap[num] ?? null;
  }

  return null;
}

type CommentaryViewMode = 'text' | 'comic';

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

function parseMarkerListBlock(block: string): CommentaryListItem[] | null {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 3) {
    return null;
  }

  if (!isMarkerListOpenToken(lines[0]) || !isMarkerListCloseToken(lines[lines.length - 1])) {
    return null;
  }

  const root: CommentaryListItem[] = [];
  const stack: CommentaryListItem[][] = [root];

  for (const line of lines.slice(1, -1)) {
    if (isMarkerListOpenToken(line)) {
      const currentItems = stack[stack.length - 1];
      const parentItem = currentItems[currentItems.length - 1];

      if (!parentItem) {
        return null;
      }

      stack.push(parentItem.children);
      continue;
    }

    if (isMarkerListCloseToken(line)) {
      if (stack.length === 1) {
        return null;
      }

      stack.pop();
      continue;
    }

    const text = parseMarkerItemToken(line);
    if (!text) {
      return null;
    }

    stack[stack.length - 1].push({
      text,
      children: [],
    });
  }

  if (stack.length !== 1 || root.length === 0) {
    return null;
  }

  return root;
}

function parseListBlock(block: string): CommentaryListItem[] | null {
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

  const items: CommentaryListItem[] = [];

  for (const line of lines) {
    const match = line.match(listItemPattern);
    if (!match) {
      return null;
    }

    const text = normalizeListItemText(match[1] || '');
    if (text.length === 0) {
      return null;
    }

    items.push({
      text,
      children: [],
    });
  }

  return items;
}

function normalizeListItemText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function isKeywordLeadLine(text: string): boolean {
  return text.trim().startsWith('🔑');
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

function renderCommentaryListItems(items: CommentaryListItem[], depth: number = 0): React.ReactNode {
  return (
    <ul
      className={[
        'list-disc text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#566471] md:text-[16px]',
        depth === 0 ? 'mx-auto w-full max-w-[52rem] space-y-2 pl-5' : 'mt-2 space-y-2 pl-5',
      ].join(' ')}
    >
      {items.map((item, itemIndex) => (
        <li key={`${depth}-${itemIndex}`} className="break-keep">
          <span>{item.text}</span>
          {item.children.length > 0 ? renderCommentaryListItems(item.children, depth + 1) : null}
        </li>
      ))}
    </ul>
  );
}

function renderCommentaryBlock(block: CommentaryBlock, index: number): React.ReactNode {
  if (block.kind === 'table') {
    const [headerRow, ...bodyRows] = block.rows;

    return (
      <div
        key={`table-${index}`}
        className="mx-auto w-full max-w-[52rem] overflow-x-auto rounded-[1.4rem] border border-[#d9c5a3]/45 bg-[#f6f0e5] px-5 py-4 shadow-[0_10px_24px_rgba(105,82,48,0.06)]"
      >
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
    return <React.Fragment key={`list-${index}`}>{renderCommentaryListItems(block.items)}</React.Fragment>;
  }

  const trimmedText = block.text.trim();

  if (isKeywordLeadLine(trimmedText)) {
    return (
      <p
        key={`keyword-${index}`}
        data-testid="commentary-keyword-line"
        className={commentaryLeadLineClass}
      >
        <span className="inline-flex shrink-0 items-center rounded-full bg-[#dcc18e] px-2 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-[#74542b]">
          핵심
        </span>
        {block.text}
      </p>
    );
  }

  return (
    <p
      key={`paragraph-${index}`}
      className="mx-auto w-full max-w-[52rem] break-keep text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#566471] md:text-[16px]"
    >
      {block.text}
    </p>
  );
}

function getCommentaryHeaderLabel(source: CommentarySource): string {
  if (source === 'gua') {
    return '오늘의 괘사';
  }

  if (source === 'yao') {
    return '오늘의 효사';
  }

  return '';
}

function LearningComicView({
  imageSrc,
  imageAlt,
}: {
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div
      data-testid="learning-comic-view"
      className="rounded-[1.5rem] border border-[#d9c5a3]/55 bg-[linear-gradient(180deg,rgba(246,240,229,0.92),rgba(255,252,246,0.96))] px-4 py-4 shadow-[0_10px_24px_rgba(105,82,48,0.06)]"
    >
      <figure className="reading-section mx-auto w-full max-w-[52rem]">
        <img
          src={imageSrc}
          alt={imageAlt}
          data-testid="learning-comic-image"
          className="mx-auto h-auto w-full rounded-[1rem] border border-[#d9c5a3]/55 bg-[#fffdf8] object-contain shadow-[0_12px_28px_rgba(105,82,48,0.08)]"
          loading="lazy"
        />
      </figure>
    </div>
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
  const [commentaryViewMode, setCommentaryViewMode] = React.useState<CommentaryViewMode>('text');

  React.useEffect(() => {
    setCommentaryViewMode('text');
  }, [commentarySource, yaoNum, guaNum]);

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
  const learningImageSrc = getLearningImageSrc(
    commentarySource,
    commentarySource === 'gua' ? guaNum : commentarySource === 'yao' ? yaoNum : null,
  );
  const learningImageAlt =
    commentarySource === 'gua'
      ? `괘사 학습 이미지 ${guaNum ?? ''}`.trim()
      : `효사 학습 이미지 ${yaoNum ?? ''}`.trim();
  const leftSoulWeeksLabel = formatWeeksLabel(hitSoulGroup, soulSections);
  const guaMeta = guaData.meta.trim();
  const commentaryHeaderLabel = getCommentaryHeaderLabel(commentarySource);
  const canShowComicToggle =
    (commentarySource === 'gua' || commentarySource === 'yao') && learningImageSrc !== null;
  const isComicView = canShowComicToggle && commentaryViewMode === 'comic';
  const renderedCommentaryBlocks = commentary
    ? commentary.blocks.map((block, index) => (
        <div key={`commentary-block-${index}`} data-testid={`commentary-block-${index}`}>
          <div className="reading-section">{renderCommentaryBlock(block, index)}</div>
        </div>
      ))
    : [];

  return (
    <section className="flex w-full flex-1 flex-col overflow-visible stagger-1 lg:overflow-hidden">
      <div className="flex min-h-0 w-full flex-col gap-5 lg:grid lg:h-full lg:min-w-[720px] lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-0 lg:overflow-x-auto">
        <article className="reading-panel reading-panel--left flex w-full flex-col bg-[#f2eadc] text-[#4b3b29] lg:sticky lg:top-0 lg:h-full lg:min-h-0 lg:min-w-[340px] lg:overflow-y-auto">
          <div className="flex min-h-0 flex-1 flex-col gap-[var(--reading-section-gap)]">
            <div data-testid="reading-sigil-unit" className="reading-fade-in -mt-2 flex justify-center pt-0 lg:-mt-2">
              <div className="w-full max-w-[7.5rem] sm:max-w-[10rem] lg:max-w-[11.5rem]">
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

            <div data-testid="reading-verse-unit" className={`${manuscriptUnitClass} pt-2 md:pt-3`}>
              <p className={`${compactLeftBadgeClass} border-[#d7c7a9]/60 bg-[#f4eadc]/70 uppercase text-[#8e7a5d]`}>
                효사
              </p>
              <h4 className="max-w-[40ch] break-keep font-headline text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.035em] text-current md:text-[1.78rem]">
                {yaoData.titleLine}
              </h4>

              <p className="max-w-[38ch] break-keep font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-[#566471] md:text-[1.05rem]">
                {yaoData.short}
              </p>
            </div>

            <div data-testid="reading-top-unit" className={`${manuscriptUnitClass} pt-2 md:pt-3`}>
              <p className={`${compactLeftBadgeClass} border-[#d7c7a9]/50 bg-[#f4eadc]/55 uppercase text-[#9b886a]`}>
                괘사
              </p>
              <h3 className="max-w-[40ch] break-keep font-headline text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.035em] text-current md:text-[1.78rem]">
                {guaData.header}
              </h3>

              {guaMeta ? (
                <p
                  data-testid="reading-gua-meta"
                  className="max-w-[38ch] break-keep font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-[#566471] md:text-[1.05rem]"
                >
                  {guaMeta}
                </p>
              ) : null}
            </div>

            <div data-testid="reading-soul-title-unit" className={`${manuscriptUnitClass} pb-3 pt-1 md:pb-4`}>
              <p className={`${compactLeftBadgeClass} border-[#d7c7a9]/50 bg-[#f4eadc]/55 text-[#9a8a75]`}>
                영혼
              </p>
              <h2 className="max-w-[40ch] font-headline text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.035em] text-current md:text-[1.78rem]">
                {SOUL_TITLE}
              </h2>
              {leftSoulWeeksLabel ? (
                <p className="max-w-[38ch] font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-[#566471] md:text-[1.05rem]">
                  {leftSoulWeeksLabel}
                </p>
              ) : null}
            </div>
          </div>
        </article>

        <aside className="reading-panel reading-panel--right flex w-full min-w-0 flex-col bg-[#fbf8f1] lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <div className="mt-1 flex-1 space-y-0">
            {showSoulPanel ? (
              <div key="soul" className="reading-fade-in">
                <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
              </div>
            ) : commentary ? (
              <div key={commentarySource} className="reading-fade-in space-y-[var(--reading-section-gap)]">
                <div className="flex items-center justify-between gap-3 border-b border-[#d9c5a3]/45 pb-2">
                  <span className="inline-flex items-center rounded-full bg-[#dcc18e] px-3 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-[#74542b]">
                    {commentaryHeaderLabel}
                  </span>
                  {canShowComicToggle ? (
                    <button
                      type="button"
                      data-testid="commentary-comic-toggle"
                      aria-pressed={isComicView}
                      aria-label={isComicView ? '텍스트 해설 보기' : '학습 만화 보기'}
                      onClick={() =>
                        setCommentaryViewMode((current) => (current === 'comic' ? 'text' : 'comic'))
                      }
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                        isComicView
                          ? 'border-[#c79b45] bg-[#efe1bf] text-[#74542b]'
                          : 'border-[#d9c5a3]/65 bg-[#fbf8f1] text-[#8f7c62] hover:bg-[#f4eadc]'
                      }`}
                    >
                      <Images size={14} strokeWidth={2.2} />
                    </button>
                  ) : null}
                </div>

                <div className={commentaryFolioClass}>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d1b68a]/85 to-transparent" />
                  <div className="absolute -right-2 top-2 h-16 w-16 rounded-full bg-[#efdebc]/45 blur-2xl" />
                  <div className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-[#cfb07f]/12 blur-3xl" />

                  <div className="relative space-y-[var(--reading-block-gap)]">
                    {isComicView && learningImageSrc ? (
                      <LearningComicView imageSrc={learningImageSrc} imageAlt={learningImageAlt} />
                    ) : (
                      <>
                        {commentary.heading ? (
                          <h5 className={commentaryHeadingClass}>
                            {commentary.heading}
                          </h5>
                        ) : null}

                        {commentarySource === 'yao' ? (
                          <div
                            data-testid="commentary-reading-body"
                            className={commentaryBodyClass}
                          >
                            {yaoData.body}
                          </div>
                        ) : null}

                        <div className="space-y-[var(--reading-section-gap)] border-t border-[#d9c5a3]/35 pt-[var(--reading-block-gap)]">
                          {renderedCommentaryBlocks}
                        </div>
                      </>
                    )}
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


