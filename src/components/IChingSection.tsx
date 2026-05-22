import React from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import type { CommentarySource, GuaData, SoulGroup, SoulSection, YaoData } from '../types';
import { splitCommentary } from '../utils/commentaryParser';
import { getLearningImageLoader } from '../utils/learningImage';
import { loadReadingDataBundle, type ReadingDataBundle } from '../utils/readingDataLoader';
import { formatWeeksLabel } from '../utils/soulLogic';
import { CommentaryFrame } from './shared/CommentaryFrame';
import { SurfaceStateCard } from './shared/SurfaceStateCard';
import { SoulCalendarSection } from './SoulCalendarSection';

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";
const compactLeftBadgeClass =
  'inline-flex w-fit items-center rounded-full border border-secondary/15 bg-secondary/10 px-1.5 py-0.5 text-[8px] font-semibold leading-none tracking-[0.14em] text-secondary';
const manuscriptUnitClass =
  'reading-section reading-fade-in border-l border-outline-variant/60 pl-5 md:pl-6';
const commentaryHeadingClass =
  'mx-auto w-full max-w-[56rem] break-keep font-headline text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.035em] text-on-surface md:text-[2.7rem]';
const commentaryBodyClass =
  'mx-auto w-full max-w-[56rem] break-keep font-body text-[1rem] leading-[1.92] tracking-[-0.01em] text-on-surface-variant md:text-[1.08rem]';
const commentaryLeadLineClass =
  'mx-auto flex w-full max-w-[56rem] flex-wrap items-start gap-2 break-keep rounded-[1rem] border border-secondary/15 bg-secondary/5 px-3 py-2 text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-on-surface md:text-[16px]';
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

type CommentaryViewMode = 'text' | 'comic';

type ReadingDataStatus = 'loading' | 'ready' | 'error';

function getDefaultCommentaryViewMode(source: CommentarySource): CommentaryViewMode {
  return source === 'soul' ? 'text' : 'comic';
}

function normalizeCommentaryText(text: string | undefined): string {
  return text?.trim() ?? '';
}

function isKeywordLeadLine(text: string): boolean {
  return text.trim().startsWith('🔑');
}

function renderCommentaryListItems(items: CommentaryListItem[], depth: number = 0): React.ReactNode {
  return (
    <ul
      className={[
        'list-disc text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-on-surface-variant md:text-[16px]',
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
        className="ui-card ui-surface--raised mx-auto w-full max-w-[56rem] overflow-x-auto rounded-[1.4rem] px-5 py-4"
      >
        <table className="min-w-full border-collapse text-left text-[0.95rem] md:text-[1rem]">
          <thead>
            <tr>
              {headerRow.map((cell, cellIndex) => (
                <th
                  key={`table-${index}-head-${cellIndex}`}
                  scope="col"
                  className="px-0 py-3 pr-5 font-semibold text-on-surface"
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
                    className="py-3 pr-5 align-top text-on-surface-variant"
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
      <p key={`keyword-${index}`} data-testid="commentary-keyword-line" className={commentaryLeadLineClass}>
        <span className="inline-flex shrink-0 items-center rounded-full border border-secondary/15 bg-secondary/10 px-2 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-secondary">
          핵심
        </span>
        {block.text}
      </p>
    );
  }

  return (
    <p
      key={`paragraph-${index}`}
      className="mx-auto w-full max-w-[56rem] break-keep text-[15px] font-body leading-[1.95] tracking-[-0.01em] text-on-surface-variant md:text-[16px]"
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
  readingData: ReadingDataBundle | null,
  source: Exclude<CommentarySource, 'soul'>,
  activeGuaNum: number | null,
  activeYaoNum: number | null,
  activeBonusItem: BonusReadingItemLike | null,
): string {
  if (!readingData) {
    return '';
  }

  if (source === 'gua') {
    if (activeBonusItem) {
      return (
        normalizeCommentaryText(activeBonusItem.commentary) ||
        normalizeCommentaryText(readingData.getBonusGuaCommentary(activeGuaNum))
      );
    }

    return normalizeCommentaryText(readingData.getGuaCommentary(activeGuaNum));
  }

  if (activeBonusItem) {
    return (
      normalizeCommentaryText(activeBonusItem.commentary) ||
      normalizeCommentaryText(readingData.getBonusYaoCommentary(activeYaoNum))
    );
  }

  return normalizeCommentaryText(readingData.getYaoCommentary(activeYaoNum));
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
      aria-busy="false"
      className="ui-card ui-surface--raised -mx-4 -my-4 px-0 py-0 sm:mx-0 sm:my-0 sm:rounded-[1.5rem] sm:px-4 sm:py-4"
    >
      <figure className="reading-section mx-auto w-full max-w-[56rem]">
        <img
          src={imageSrc}
          alt={imageAlt}
          data-testid="learning-comic-image"
          className="mx-auto h-auto w-full object-contain"
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
      role="status"
      aria-live="polite"
      className="ui-card ui-surface--raised mx-auto flex w-full max-w-[56rem] flex-col items-center justify-center rounded-[1.5rem] border-dashed border-outline-variant/60 px-6 py-10 text-center"
    >
      <p className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-secondary">학습 만화</p>
      <p className="mt-3 font-headline text-[1.15rem] font-semibold text-on-surface">
        아직 업로드된 만화 이미지가 없다
      </p>
      <p className="mt-2 max-w-[28rem] font-body text-[0.98rem] leading-[1.8] text-on-surface-variant">
        이 항목은 학습만화 버튼은 열리지만, 연결된 이미지 파일이 아직 준비되지 않았다.
      </p>
    </div>
  );
}

function LearningComicLoadingState() {
  return (
    <div
      data-testid="learning-comic-loading-state"
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="ui-card ui-surface--raised mx-auto flex w-full max-w-[56rem] flex-col items-center justify-center rounded-[1.5rem] border border-outline-variant/40 px-6 py-10 text-center"
    >
      <p className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-secondary">학습 만화</p>
      <p className="mt-3 font-headline text-[1.15rem] font-semibold text-on-surface">이미지를 불러오는 중이다</p>
      <p className="mt-2 max-w-[28rem] font-body text-[0.98rem] leading-[1.8] text-on-surface-variant">
        선택한 학습 만화 이미지를 지연 로딩하는 중이다.
      </p>
    </div>
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
  const [readingData, setReadingData] = React.useState<ReadingDataBundle | null>(null);
  const [readingDataStatus, setReadingDataStatus] = React.useState<ReadingDataStatus>('loading');
  const [commentaryViewMode, setCommentaryViewMode] = React.useState<CommentaryViewMode>(() =>
    getDefaultCommentaryViewMode(commentarySource),
  );
  const [learningImageSrc, setLearningImageSrc] = React.useState<string | null>(null);
  const [isLearningImageLoading, setIsLearningImageLoading] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    void loadReadingDataBundle()
      .then((module) => {
        if (!cancelled) {
          setReadingData(module);
          setReadingDataStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReadingData(null);
          setReadingDataStatus('error');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeCommentarySource = commentarySource === 'soul' ? null : commentarySource;
  const activeBonusItems = React.useMemo(
    () => (activeCommentarySource === 'gua' ? bonusGuaItems : activeCommentarySource === 'yao' ? bonusYaoItems : []),
    [activeCommentarySource, bonusGuaItems, bonusYaoItems],
  );
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
  const hasAnyBonusItems = activeBonusItems.length > 0;

  React.useEffect(() => {
    setCommentaryViewMode(getDefaultCommentaryViewMode(commentarySource));
  }, [commentarySource, activeYaoNum, activeGuaNum, activeBonusItem?.id]);

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

  const shiftSelectedDate = (offset: number) => {
    if (!selectedDate || !onDateChange) {
      return;
    }

    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + offset);
    onDateChange(nextDate);
  };

  const commentaryText = React.useMemo(() => {
    if (commentarySource === 'gua') {
      return getSelectedCommentaryText(readingData, 'gua', activeGuaNum, activeYaoNum, activeBonusItem);
    }

    if (commentarySource === 'yao') {
      return getSelectedCommentaryText(readingData, 'yao', activeGuaNum, activeYaoNum, activeBonusItem);
    }

    return '';
  }, [readingData, activeBonusItem, activeGuaNum, activeYaoNum, commentarySource]);

  const commentary = React.useMemo(
    () => (commentaryText.length > 0 ? splitCommentary(commentaryText) : null),
    [commentaryText],
  );

  const isComicView = (commentarySource === 'gua' || commentarySource === 'yao') && commentaryViewMode === 'comic';
  const isBonusSelection = activeBonusItem !== null;
  const learningImageLoader = React.useMemo(
    () =>
      getLearningImageLoader(
        commentarySource,
        commentarySource === 'gua' ? activeGuaNum : commentarySource === 'yao' ? activeYaoNum : null,
        isBonusSelection,
      ),
    [commentarySource, activeGuaNum, activeYaoNum, isBonusSelection],
  );
  const commentaryHeaderLabel = getCommentaryHeaderLabel(commentarySource);
  const canShowComicToggle = commentarySource === 'gua' || commentarySource === 'yao';
  const guaMeta = activeGuaData?.meta.trim() ?? '';
  const leftSoulWeeksLabel = formatWeeksLabel(hitSoulGroup, soulSections);
  const commentaryFolioSurfaceClass = isComicView
    ? 'relative overflow-visible border-0 bg-transparent px-0 py-0 shadow-none sm:overflow-hidden sm:rounded-[2rem] sm:border sm:border-outline-variant/60 sm:bg-surface-container-low/95 sm:px-4 sm:py-4'
    : undefined;

  React.useEffect(() => {
    let cancelled = false;

    if (!isComicView) {
      setLearningImageSrc(null);
      setIsLearningImageLoading(false);
      return;
    }

    if (!learningImageLoader) {
      setLearningImageSrc(null);
      setIsLearningImageLoading(false);
      return;
    }

    setIsLearningImageLoading(true);
    setLearningImageSrc(null);

    void learningImageLoader()
      .then((src) => {
        if (!cancelled) {
          setLearningImageSrc(src);
          setIsLearningImageLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLearningImageSrc(null);
          setIsLearningImageLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isComicView, learningImageLoader]);

  if (readingDataStatus === 'loading') {
    return (
      <SurfaceStateCard
        testId="reading-data-loading-state"
        role="status"
        ariaLive="polite"
        className="px-6 py-6 md:px-8 md:py-8 lg:px-10"
      >
        <p className="sr-only">Reading data loading state.</p>
        <div className="text-sm italic text-on-surface-variant opacity-70">Reading data is not available yet.</div>
      </SurfaceStateCard>
    );
  }

  if (readingDataStatus === 'error') {
    return (
      <SurfaceStateCard
        testId="reading-data-error-state"
        role="alert"
        ariaLive="assertive"
        className="px-6 py-6 md:px-8 md:py-8 lg:px-10"
      >
        <p className="sr-only">Reading data unavailable state.</p>
        <div className="text-sm italic text-on-surface-variant opacity-70">Reading data is not available yet.</div>
      </SurfaceStateCard>
    );
  }

  if (!activeGuaData || !activeYaoData) {
    return (
      <SurfaceStateCard
        testId="reading-data-empty-state"
        role="status"
        ariaLive="polite"
        className="px-6 py-6 md:px-8 md:py-8 lg:px-10"
      >
        <p className="sr-only">Reading data empty state.</p>
        <div className="text-sm italic text-on-surface-variant opacity-70">Reading data is not available yet.</div>
      </SurfaceStateCard>
    );
  }

  const commentaryHeading = commentary?.heading ?? null;
  const renderedCommentaryBlocks = commentary
    ? commentary.blocks.map((block, index) => (
        <div key={`commentary-block-${index}`} data-testid={`commentary-block-${index}`}>
          <div className="reading-section">{renderCommentaryBlock(block, index)}</div>
        </div>
      ))
    : [];

  const renderCommentaryTextContent = () => (
    <>
      {commentaryHeading ? <h5 className={commentaryHeadingClass}>{commentaryHeading}</h5> : null}

      {commentarySource === 'yao' && !isBonusSelection ? (
        <div data-testid="commentary-reading-body" className={commentaryBodyClass}>
          {activeYaoData.body}
        </div>
      ) : null}

      <div className="space-y-[var(--reading-section-gap)] border-t border-outline-variant/35 pt-[var(--reading-block-gap)]">
        {renderedCommentaryBlocks}
      </div>
    </>
  );

  const renderComicArea = () => {
    if (isLearningImageLoading) {
      return <LearningComicLoadingState />;
    }

    if (learningImageSrc) {
      return <LearningComicView imageSrc={learningImageSrc} imageAlt={learningImageAlt(commentarySource, isBonusSelection, activeGuaNum, activeYaoNum)} />;
    }

    return (
      <>
        <LearningComicEmptyState />
        {commentary ? renderCommentaryTextContent() : null}
      </>
    );
  };

  return (
    <section className="flex w-full flex-1 flex-col overflow-visible gap-4 stagger-1 lg:overflow-hidden">
      <div className="flex min-h-0 w-full flex-col gap-4 md:gap-5 lg:grid lg:h-full lg:min-w-[720px] lg:grid-cols-[336px_minmax(0,1fr)] lg:gap-0 lg:overflow-x-auto">
        <article className="reading-panel reading-panel--left flex w-full flex-col bg-surface-container-low text-on-surface lg:sticky lg:top-0 lg:h-full lg:min-h-0 lg:min-w-[320px] lg:overflow-y-auto">
          <div className="flex min-h-0 flex-1 flex-col gap-4 md:gap-5">
            {hasAnyBonusItems && activeCommentarySource !== null ? (
              <div data-testid="bonus-reading-selector" className="ui-card ui-surface--raised reading-fade-in rounded-[1.35rem] px-4 py-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className={compactLeftBadgeClass}>{activeCommentarySource === 'gua' ? '보너스 괘사' : '보너스 효사'}</p>
                  <span className="font-body text-[0.72rem] font-medium tracking-[0.18em] text-secondary">
                    {activeBonusItems.length}개
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
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
                        className={`ui-button min-h-11 w-full rounded-[1rem] border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low ${
                          isActive
                            ? 'ui-button--secondary text-on-surface'
                            : 'ui-button--ghost border-outline-variant/60 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high/70 hover:text-on-surface'
                        }`}
                      >
                        {entry.dateLabel ? (
                          <span className="mb-1 block font-body text-[0.72rem] font-semibold tracking-[0.18em] text-secondary">
                            {entry.dateLabel}
                          </span>
                        ) : null}
                        <span className="block break-keep font-headline text-[0.98rem] font-semibold leading-[1.4] tracking-[-0.02em] text-on-surface">
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
                    <span className="text-sm italic text-on-surface-variant">Sigil not available</span>
                  )}
                </div>
              </div>
            ) : null}

            {!isBonusDay ? (
              <div data-testid="reading-verse-unit" className={`${manuscriptUnitClass} pt-2 md:pt-3`}>
                <p className={`${compactLeftBadgeClass} uppercase`}>효사</p>
                <h4 className="max-w-[40ch] break-keep font-headline text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.035em] text-on-surface md:text-[1.78rem]">
                  {activeYaoData.titleLine}
                </h4>

                <p className="max-w-[38ch] break-keep font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-on-surface-variant md:text-[1.05rem]">
                  {activeYaoData.short}
                </p>
              </div>
            ) : null}

            {!isBonusDay ? (
              <div data-testid="reading-top-unit" className={`${manuscriptUnitClass} pt-2 md:pt-3`}>
                <p className={`${compactLeftBadgeClass} uppercase`}>괘사</p>
                <h3 className="max-w-[40ch] break-keep font-headline text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.035em] text-on-surface md:text-[1.78rem]">
                  {activeGuaData.header}
                </h3>

                {guaMeta ? (
                  <p
                    data-testid="reading-gua-meta"
                    className="max-w-[38ch] break-keep font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-on-surface-variant md:text-[1.05rem]"
                  >
                    {guaMeta}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div data-testid="reading-soul-title-unit" className={`${manuscriptUnitClass} pb-3 pt-1 md:pb-4`}>
              <p className={compactLeftBadgeClass}>영혼</p>
              <h2 className="max-w-[40ch] font-headline text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.035em] text-on-surface md:text-[1.78rem]">
                {SOUL_TITLE}
              </h2>
              {leftSoulWeeksLabel ? (
                <p className="max-w-[38ch] font-body text-[1rem] font-medium italic leading-[1.82] tracking-[-0.01em] text-on-surface-variant md:text-[1.05rem]">
                  {leftSoulWeeksLabel}
                </p>
              ) : null}
            </div>
          </div>
        </article>

        <aside className="reading-panel reading-panel--right relative flex w-full min-w-0 flex-col bg-surface-container-lowest lg:h-full lg:min-h-0 lg:overflow-y-auto">
          {selectedDate && onDateChange ? (
            <div className="pointer-events-none sticky top-1/2 z-20 hidden h-0 -translate-y-1/2 lg:block">
              <div className="relative h-0">
                <button
                  type="button"
                  aria-label="이전날로 이동"
                  onClick={() => shiftSelectedDate(-1)}
                  className="ui-button ui-button--ghost pointer-events-auto absolute left-5 h-12 w-12 -translate-y-1/2 rounded-full p-0 text-secondary backdrop-blur-sm xl:left-6"
                >
                  <ChevronLeft size={20} strokeWidth={2.1} />
                </button>
                <button
                  type="button"
                  aria-label="다음날로 이동"
                  onClick={() => shiftSelectedDate(1)}
                  className="ui-button ui-button--ghost pointer-events-auto absolute right-5 h-12 w-12 -translate-y-1/2 rounded-full p-0 text-secondary backdrop-blur-sm xl:right-6"
                >
                  <ChevronRight size={20} strokeWidth={2.1} />
                </button>
              </div>
            </div>
          ) : null}
          <div className="flex-1 space-y-0">
            {commentarySource === 'soul' ? (
              <div key="soul" className="reading-fade-in">
                <SoulCalendarSection hitSoulGroup={hitSoulGroup} soulSections={soulSections} />
              </div>
            ) : (
              <div key={commentarySource} className="reading-fade-in space-y-[var(--reading-section-gap)]">
                {commentary ? (
                  <div className="space-y-[var(--reading-section-gap)]">
                    <div className="flex items-center justify-between gap-3 border-b border-outline-variant/50 pb-2">
                      <span className="inline-flex items-center rounded-full border border-secondary/15 bg-secondary/10 px-3 py-0.5 text-[9px] font-semibold tracking-[0.24em] text-secondary">
                        {commentaryHeaderLabel}
                      </span>
                      {canShowComicToggle ? (
                        <button
                          type="button"
                          data-testid="commentary-comic-toggle"
                          aria-pressed={isComicView}
                          aria-label={isComicView ? '텍스트 해설 보기' : '학습 만화 보기'}
                          onClick={() => setCommentaryViewMode((current) => (current === 'comic' ? 'text' : 'comic'))}
                          className={`ui-button inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest sm:h-12 sm:w-12 ${
                            isComicView
                              ? 'ui-button--secondary text-secondary'
                              : 'ui-button--ghost border-outline-variant/60 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high/70 hover:text-on-surface'
                          }`}
                        >
                          <Images size={16} strokeWidth={2.2} />
                        </button>
                      ) : null}
                    </div>

                    <CommentaryFrame
                      testId="commentary-folio"
                      className={commentaryFolioSurfaceClass}
                      decorationClassName={isComicView ? 'hidden sm:block' : ''}
                    >
                      <div className="space-y-[var(--reading-block-gap)]">
                        {isComicView ? (
                          renderComicArea()
                        ) : (
                          renderCommentaryTextContent()
                        )}
                      </div>
                    </CommentaryFrame>
                  </div>
                ) : (
                  <SurfaceStateCard testId="commentary-empty-state" role="status" ariaLive="polite">
                    <div className="pt-1 text-[0.98rem] leading-relaxed text-on-surface-variant">
                      Commentary is not available for this selection yet.
                    </div>
                  </SurfaceStateCard>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

function learningImageAlt(
  source: CommentarySource,
  isBonusSelection: boolean,
  activeGuaNum: number | null,
  activeYaoNum: number | null,
): string {
  if (source === 'gua') {
    return `${isBonusSelection ? '보너스 ' : ''}괘사 학습 이미지 ${activeGuaNum ?? ''}`.trim();
  }

  return `${isBonusSelection ? '보너스 ' : ''}효사 학습 이미지 ${activeYaoNum ?? ''}`.trim();
}
