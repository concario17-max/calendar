import React from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import * as dataModule from '../data';
import type { CommentarySource, GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { formatWeeksLabel, SoulCalendarSection } from './SoulCalendarSection';

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";
const compactLeftBadgeClass =
  'inline-flex w-fit items-center rounded-full border px-1.5 py-0.5 text-[8px] font-semibold leading-none tracking-[0.14em]';
const decoratedSurfaceClass =
  'relative overflow-hidden rounded-[1.5rem] border border-[#d7c7a9]/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(249,243,232,0.92))] px-4 py-4 shadow-[0_14px_32px_rgba(105,82,48,0.09)] backdrop-blur-sm';
const manuscriptUnitClass =
  'reading-section reading-fade-in border-l border-[#d9c5a3]/60 pl-5 md:pl-6';
const commentaryFolioClass =
  'relative overflow-hidden rounded-[2rem] border border-[#d8c4a1]/60 bg-[linear-gradient(180deg,rgba(250,244,235,0.98),rgba(243,235,220,0.9))] px-4 py-4 shadow-[0_24px_70px_rgba(109,84,47,0.12)]';
const commentaryHeadingClass =
  'mx-auto w-full max-w-[56rem] break-keep font-headline text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.035em] text-current md:text-[2.7rem]';
const commentaryBodyClass =
  'mx-auto w-full max-w-[56rem] break-keep font-body text-[1rem] leading-[1.92] tracking-[-0.01em] text-[#566471] md:text-[1.08rem]';
const commentaryLeadLineClass =
  'mx-auto flex w-full max-w-[56rem] flex-wrap items-start gap-2 break-keep rounded-[1rem] border border-[#d9c5a3]/55 bg-[#f4eadc] px-3 py-2 text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#4b3b29] md:text-[16px]';
const yaoLearningImageModules = import.meta.glob('../../image/효사/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const guaLearningImageModules = import.meta.glob('../../image/괘사/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const bonusYaoLearningImageModules = import.meta.glob('../../보너스/효사/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const bonusGuaLearningImageModules = import.meta.glob('../../보너스/괘사/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

interface CommentaryDataModule {
  getGuaCommentary: (num: number | null) => string | undefined;
  getYaoCommentary: (num: number | null) => string | undefined;
  getBonusGuaCommentary?: (num: number | null) => string | undefined;
  getBonusYaoCommentary?: (num: number | null) => string | undefined;
}

const commentaryData = dataModule as CommentaryDataModule;

interface IChingSectionProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  commentarySource?: CommentarySource;
  yaoNum: number | null;
  guaNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  bonusDay?: { month: number; day: number } | null;
  hitSoulGroup?: SoulGroup;
  soulSections?: SoulSection[];
  bonusGuaItems?: BonusReadingItemLike[];
  bonusYaoItems?: BonusReadingItemLike[];
}

interface BonusReadingItemLike {
  id?: string;
  label?: string;
  dateLabel?: string;
  titleLine?: string;
  short?: string;
  body?: string;
  commentary?: string;
  num?: number;
  guaNum?: number;
  yaoNum?: number;
  guaData?: GuaData | null;
  yaoData?: YaoData | null;
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

const yaoLearningImageMap = buildLearningImageMap(yaoLearningImageModules);
const guaLearningImageMap = buildLearningImageMap(guaLearningImageModules);
const bonusYaoLearningImageMap = buildLearningImageMap(bonusYaoLearningImageModules);
const bonusGuaLearningImageMap = buildLearningImageMap(bonusGuaLearningImageModules);

function getLearningImageSrc(source: CommentarySource, num: number | null, isBonusSelection: boolean): string | null {
  if (num === null) {
    return null;
  }

  if (source === 'yao') {
    return (isBonusSelection ? bonusYaoLearningImageMap[num] : yaoLearningImageMap[num]) ?? null;
  }

  if (source === 'gua') {
    return (isBonusSelection ? bonusGuaLearningImageMap[num] : guaLearningImageMap[num]) ?? null;
  }

  return null;
}

type CommentaryViewMode = 'text' | 'comic';

function getDefaultCommentaryViewMode(source: CommentarySource): CommentaryViewMode {
  return source === 'soul' ? 'text' : 'comic';
}

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

function normalizeCommentaryText(text: string | undefined): string {
  return text?.trim() ?? '';
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
        depth === 0 ? 'mx-auto w-full max-w-[56rem] space-y-2 pl-5' : 'mt-2 space-y-2 pl-5',
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
        className="mx-auto w-full max-w-[56rem] overflow-x-auto rounded-[1.4rem] border border-[#d9c5a3]/45 bg-[#f6f0e5] px-5 py-4 shadow-[0_10px_24px_rgba(105,82,48,0.06)]"
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
      className="mx-auto w-full max-w-[56rem] break-keep text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-[#566471] md:text-[16px]"
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

function getSelectedCommentaryText(
  source: Exclude<CommentarySource, 'soul'>,
  activeGuaNum: number | null,
  activeYaoNum: number | null,
  activeBonusItem: BonusReadingItemLike | null,
): string {
  if (source === 'gua') {
    if (activeBonusItem) {
      return (
        normalizeCommentaryText(activeBonusItem.commentary) ||
        normalizeCommentaryText(commentaryData.getBonusGuaCommentary?.(activeGuaNum))
      );
    }

    return normalizeCommentaryText(commentaryData.getGuaCommentary(activeGuaNum));
  }

  if (activeBonusItem) {
    return (
      normalizeCommentaryText(activeBonusItem.commentary) ||
      normalizeCommentaryText(commentaryData.getBonusYaoCommentary?.(activeYaoNum))
    );
  }

  return normalizeCommentaryText(commentaryData.getYaoCommentary(activeYaoNum));
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
      className="-mx-4 -my-4 px-0 py-0 sm:mx-0 sm:my-0 sm:rounded-[1.5rem] sm:border sm:border-[#d9c5a3]/55 sm:bg-[linear-gradient(180deg,rgba(246,240,229,0.92),rgba(255,252,246,0.96))] sm:px-4 sm:py-4 sm:shadow-[0_10px_24px_rgba(105,82,48,0.06)]"
    >
      <figure className="reading-section mx-auto w-full max-w-[56rem]">
        <img
          src={imageSrc}
          alt={imageAlt}
          data-testid="learning-comic-image"
          className="mx-auto h-auto w-full object-contain sm:rounded-[1rem] sm:border sm:border-[#d9c5a3]/55 sm:bg-[#fffdf8] sm:shadow-[0_12px_28px_rgba(105,82,48,0.08)]"
          loading="lazy"
        />
      </figure>
    </div>
  );
}

function LearningComicEmptyState() {
  return (
    <div
      data-testid="learning-comic-empty-state"
      className="mx-auto flex w-full max-w-[56rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#d9c5a3]/65 bg-[#f7f1e6] px-6 py-10 text-center"
    >
      <p className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#9c845e]">
        학습 만화
      </p>
      <p className="mt-3 font-headline text-[1.15rem] font-semibold text-[#4b3b29]">
        아직 업로드된 만화 이미지가 없다
      </p>
      <p className="mt-2 max-w-[28rem] font-body text-[0.98rem] leading-[1.8] text-[#6b5a47]">
        이 항목은 학습만화 버튼은 열리지만, 연결된 이미지 파일이 아직 준비되지 않았다.
      </p>
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
  selectedDate,
  onDateChange,
  commentarySource = 'yao',
  yaoNum,
  guaNum,
  guaData,
  yaoData,
  hitSoulGroup,
  soulSections = [],
  bonusGuaItems = [],
  bonusYaoItems = [],
}) => {
  const [resolvedCommentarySource, setResolvedCommentarySource] = React.useState<CommentarySource>(commentarySource);

  React.useEffect(() => {
    setResolvedCommentarySource(commentarySource);
  }, [commentarySource]);

  const activeCommentarySource = resolvedCommentarySource === 'soul' ? null : resolvedCommentarySource;
  const activeBonusItems = activeCommentarySource === 'gua' ? bonusGuaItems : activeCommentarySource === 'yao' ? bonusYaoItems : [];
  const isBonusDay = bonusGuaItems.length > 0 || bonusYaoItems.length > 0;
  const fallbackBonusGuaItem = bonusGuaItems[0] ?? null;
  const fallbackBonusYaoItem = bonusYaoItems[0] ?? null;
  const [bonusSelectionBySource, setBonusSelectionBySource] = React.useState<Record<'gua' | 'yao', number>>({
    gua: 0,
    yao: 0,
  });
  const activeBonusIndex =
    activeCommentarySource === null
      ? 0
      : Math.min(
          bonusSelectionBySource[activeCommentarySource] ?? 0,
          Math.max(activeBonusItems.length - 1, 0),
        );
  const activeBonusItem =
    activeCommentarySource === null || activeBonusItems.length === 0
      ? null
      : activeBonusItems[activeBonusIndex] ?? activeBonusItems[0] ?? null;
  const activeGuaNum =
    activeCommentarySource === 'gua' && activeBonusItem ? activeBonusItem.num ?? activeBonusItem.guaNum ?? guaNum : guaNum;
  const activeYaoNum =
    activeCommentarySource === 'yao' && activeBonusItem ? activeBonusItem.num ?? activeBonusItem.yaoNum ?? yaoNum : yaoNum;
  const activeGuaData =
    activeCommentarySource === 'gua' && activeBonusItem
      ? activeBonusItem.guaData ?? guaData
      : guaData ?? fallbackBonusGuaItem?.guaData ?? null;
  const activeYaoData =
    activeCommentarySource === 'yao' && activeBonusItem
      ? activeBonusItem.yaoData ?? yaoData
      : yaoData ?? fallbackBonusYaoItem?.yaoData ?? null;
  const sigilSrc = activeYaoNum !== null ? `/images/yao-${activeYaoNum}.png` : null;
  const [commentaryViewMode, setCommentaryViewMode] = React.useState<CommentaryViewMode>(() =>
    getDefaultCommentaryViewMode(commentarySource),
  );
  const hasAnyBonusItems = activeBonusItems.length > 0;

  React.useEffect(() => {
    setCommentaryViewMode(getDefaultCommentaryViewMode(resolvedCommentarySource));
  }, [resolvedCommentarySource, activeYaoNum, activeGuaNum, activeBonusItem?.id]);

  React.useEffect(() => {
    if (activeCommentarySource === null || activeBonusItems.length === 0) {
      return;
    }

    setBonusSelectionBySource((current) => {
      const currentIndex = current[activeCommentarySource] ?? 0;
      if (currentIndex < activeBonusItems.length) {
        return current;
      }

      return {
        ...current,
        [activeCommentarySource]: 0,
      };
    });
  }, [activeCommentarySource, activeBonusItems.length]);

  if (!activeGuaData || !activeYaoData) {
    return (
      <div className="px-6 py-6 text-sm italic text-[#7f756c] opacity-70 md:px-8 md:py-8 lg:px-10">
        Reading data is not available yet.
      </div>
    );
  }

  const isBonusSelection = activeBonusItem !== null;
  const commentaryText =
    resolvedCommentarySource === 'gua'
      ? getSelectedCommentaryText('gua', activeGuaNum, activeYaoNum, activeBonusItem)
      : resolvedCommentarySource === 'yao'
        ? getSelectedCommentaryText('yao', activeGuaNum, activeYaoNum, activeBonusItem)
        : '';
  const commentary = commentaryText.length > 0 ? splitCommentary(commentaryText) : null;
  const showSoulPanel = resolvedCommentarySource === 'soul';
  const learningImageSrc = getLearningImageSrc(
    resolvedCommentarySource,
    resolvedCommentarySource === 'gua' ? activeGuaNum : resolvedCommentarySource === 'yao' ? activeYaoNum : null,
    isBonusSelection,
  );
  const learningImageAlt =
    resolvedCommentarySource === 'gua'
      ? `${isBonusSelection ? '보너스 ' : ''}괘사 학습 이미지 ${activeGuaNum ?? ''}`.trim()
      : `${isBonusSelection ? '보너스 ' : ''}효사 학습 이미지 ${activeYaoNum ?? ''}`.trim();
  const leftSoulWeeksLabel = formatWeeksLabel(hitSoulGroup, soulSections);
  const guaMeta = activeGuaData.meta.trim();
  const commentaryHeaderLabel = getCommentaryHeaderLabel(resolvedCommentarySource);
  const canShowComicToggle = resolvedCommentarySource === 'gua' || resolvedCommentarySource === 'yao';
  const isComicView = canShowComicToggle && commentaryViewMode === 'comic';
  const commentaryFolioSurfaceClass = isComicView
    ? 'relative overflow-visible border-0 bg-transparent px-0 py-0 shadow-none sm:overflow-hidden sm:rounded-[2rem] sm:border sm:border-[#d8c4a1]/60 sm:bg-[linear-gradient(180deg,rgba(250,244,235,0.98),rgba(243,235,220,0.9))] sm:px-4 sm:py-4 sm:shadow-[0_24px_70px_rgba(109,84,47,0.12)]'
    : commentaryFolioClass;
  const renderedCommentaryBlocks = commentary
    ? commentary.blocks.map((block, index) => (
        <div key={`commentary-block-${index}`} data-testid={`commentary-block-${index}`}>
          <div className="reading-section">{renderCommentaryBlock(block, index)}</div>
        </div>
      ))
    : [];
  const shiftSelectedDate = React.useCallback(
    (offset: number) => {
      if (!selectedDate || !onDateChange) {
        return;
      }

      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + offset);
      onDateChange(nextDate);
    },
    [onDateChange, selectedDate],
  );

  return (
    <section className="flex w-full flex-1 flex-col overflow-visible stagger-1 lg:overflow-hidden">
      <div className="flex min-h-0 w-full flex-col gap-5 lg:grid lg:h-full lg:min-w-[720px] lg:grid-cols-[336px_minmax(0,1fr)] lg:gap-0 lg:overflow-x-auto">
        <article className="reading-panel reading-panel--left flex w-full flex-col bg-[#f2eadc] text-[#4b3b29] lg:sticky lg:top-0 lg:h-full lg:min-h-0 lg:min-w-[320px] lg:overflow-y-auto">
          <div className="flex min-h-0 flex-1 flex-col gap-[0.9rem] md:gap-[1.05rem]">
            {hasAnyBonusItems && activeCommentarySource !== null ? (
              <div
                data-testid="bonus-reading-selector"
                className="reading-fade-in rounded-[1.35rem] border border-[#d7c7a9]/55 bg-[#f7f1e6] px-3 py-3 shadow-[0_10px_24px_rgba(105,82,48,0.05)]"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className={`${compactLeftBadgeClass} border-[#d7c7a9]/50 bg-[#efe4d1] text-[#8e7a5d]`}>
                    {activeCommentarySource === 'gua' ? '보너스 괘사' : '보너스 효사'}
                  </p>
                  <span className="font-body text-[0.72rem] font-medium tracking-[0.18em] text-[#9c845e]">
                    {activeBonusItems.length}개
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {activeBonusItems.map((entry, index) => {
                    const isActive = index === activeBonusIndex;
                    const entryLabel =
                      activeCommentarySource === 'gua'
                        ? entry.label ?? entry.guaData?.header ?? entry.titleLine ?? ''
                        : entry.label ?? entry.yaoData?.titleLine ?? entry.titleLine ?? '';

                    return (
                      <button
                        key={entry.id ?? `${activeCommentarySource}-${index}`}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() =>
                          setBonusSelectionBySource((current) => ({
                            ...current,
                            [activeCommentarySource]: index,
                          }))
                        }
                        className={`rounded-[1rem] border px-3 py-2 text-left transition-colors ${
                          isActive
                            ? 'border-[#c79b45] bg-[#efe1bf] text-[#4b3b29] shadow-[0_0_0_1px_rgba(199,155,69,0.18)_inset]'
                            : 'border-[#d7c7a9]/60 bg-[#fbf8f1] text-[#7f756c] hover:bg-[#f4eadc]'
                        }`}
                      >
                        {entry.dateLabel ? (
                          <span className="mb-1 block font-body text-[0.72rem] font-semibold tracking-[0.18em] text-[#9c845e]">
                            {entry.dateLabel}
                          </span>
                        ) : null}
                        <span className="block break-keep font-headline text-[0.98rem] font-semibold leading-[1.4] tracking-[-0.02em]">
                          {entryLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {!isBonusDay ? (
              <div data-testid="reading-sigil-unit" className="reading-fade-in -mt-2 flex justify-center pt-0 lg:-mt-2">
                <div className="w-full max-w-[7.5rem] sm:max-w-[10rem] lg:max-w-[11.5rem]">
                  {sigilSrc ? (
                    <img
                      src={sigilSrc}
                      alt={`sigil ${activeYaoNum}`}
                      className="block h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.04]"
                    />
                  ) : (
                    <span className="text-sm italic text-[#8b8178]">Sigil not available</span>
                  )}
                </div>
              </div>
            ) : null}

            {!isBonusDay ? (
              <div data-testid="reading-verse-unit" className={`${manuscriptUnitClass} pt-2 md:pt-3`}>
                <p className={`${compactLeftBadgeClass} border-[#d7c7a9]/60 bg-[#f4eadc]/70 uppercase text-[#8e7a5d]`}>
                  효사
                </p>
                <h4 className="max-w-[40ch] break-keep font-headline text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.035em] text-current md:text-[1.78rem]">
                  {activeYaoData.titleLine}
                </h4>

                <p className="max-w-[38ch] break-keep font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-[#566471] md:text-[1.05rem]">
                  {activeYaoData.short}
                </p>
              </div>
            ) : null}

            {!isBonusDay ? (
              <div data-testid="reading-top-unit" className={`${manuscriptUnitClass} pt-2 md:pt-3`}>
                <p className={`${compactLeftBadgeClass} border-[#d7c7a9]/50 bg-[#f4eadc]/55 uppercase text-[#9b886a]`}>
                  괘사
                </p>
                <h3 className="max-w-[40ch] break-keep font-headline text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.035em] text-current md:text-[1.78rem]">
                  {activeGuaData.header}
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
            ) : null}

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

        <aside className="reading-panel reading-panel--right relative flex w-full min-w-0 flex-col bg-[#fbf8f1] lg:h-full lg:min-h-0 lg:overflow-y-auto">
          {selectedDate && onDateChange ? (
            <>
              <button
                type="button"
                aria-label="이전날로 이동"
                onClick={() => shiftSelectedDate(-1)}
                className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8c4a1]/65 bg-[rgba(251,248,241,0.92)] text-[#8a7451] shadow-[0_12px_30px_rgba(105,82,48,0.12)] backdrop-blur-sm transition-colors hover:border-[#c79b45] hover:text-[#6f542d] lg:inline-flex xl:left-4"
              >
                <ChevronLeft size={20} strokeWidth={2.1} />
              </button>
              <button
                type="button"
                aria-label="다음날로 이동"
                onClick={() => shiftSelectedDate(1)}
                className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8c4a1]/65 bg-[rgba(251,248,241,0.92)] text-[#8a7451] shadow-[0_12px_30px_rgba(105,82,48,0.12)] backdrop-blur-sm transition-colors hover:border-[#c79b45] hover:text-[#6f542d] lg:inline-flex xl:right-4"
              >
                <ChevronRight size={20} strokeWidth={2.1} />
              </button>
            </>
          ) : null}
          <div className="mt-1 flex-1 space-y-0">
            {showSoulPanel ? (
              <div key="soul" className="reading-fade-in">
                <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
              </div>
            ) : (
              <div key={resolvedCommentarySource} className="reading-fade-in space-y-[var(--reading-section-gap)]">
                {commentary ? (
                  <div className="space-y-[var(--reading-section-gap)]">
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

                    <div data-testid="commentary-folio" className={commentaryFolioSurfaceClass}>
                      <div className={isComicView ? 'hidden sm:block absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d1b68a]/85 to-transparent' : 'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d1b68a]/85 to-transparent'} />
                      <div className={isComicView ? 'hidden sm:block absolute -right-2 top-2 h-16 w-16 rounded-full bg-[#efdebc]/45 blur-2xl' : 'absolute -right-2 top-2 h-16 w-16 rounded-full bg-[#efdebc]/45 blur-2xl'} />
                      <div className={isComicView ? 'hidden sm:block absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-[#cfb07f]/12 blur-3xl' : 'absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-[#cfb07f]/12 blur-3xl'} />

                      <div className="relative space-y-[var(--reading-block-gap)]">
                        {isComicView ? (
                          learningImageSrc ? (
                            <LearningComicView imageSrc={learningImageSrc} imageAlt={learningImageAlt} />
                          ) : (
                            <LearningComicEmptyState />
                          )
                        ) : (
                          <>
                            {commentary.heading ? (
                              <h5 className={commentaryHeadingClass}>
                                {commentary.heading}
                              </h5>
                            ) : null}

                            {resolvedCommentarySource === 'yao' && !isBonusSelection ? (
                              <div
                                data-testid="commentary-reading-body"
                                className={commentaryBodyClass}
                              >
                                {activeYaoData.body}
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
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};


