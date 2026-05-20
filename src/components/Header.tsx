import { Crown } from 'lucide-react';
import type { CommentarySource } from '../types';
import { DatePicker } from './DatePicker';
import { CommentaryModeTabs } from './CommentaryModeTabs';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  commentarySource: CommentarySource;
  onCommentarySourceChange: (source: CommentarySource) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDate,
  onDateChange,
  commentarySource,
  onCommentarySourceChange,
}) => {
  const handleTodayClick = () => onDateChange(new Date());

  return (
    <header className="ui-surface--raised archive-header sticky top-0 z-30 -mb-px flex min-h-[3.25rem] w-full flex-wrap items-center gap-2 border-0 bg-transparent px-3 py-2 text-on-surface backdrop-blur-xl sm:px-4 lg:px-8">
      <div className="archive-header__masthead flex min-w-0 flex-[1_1_16rem] flex-col items-start gap-1">
        <h1 className="archive-header__title inline-flex min-w-0 items-center gap-2 truncate font-headline text-[1.18rem] italic leading-none text-primary sm:text-[1.58rem]">
          <span
            aria-hidden="true"
            className="ui-surface--raised flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-secondary"
          >
            <Crown size={15} strokeWidth={2.2} />
          </span>
          <span className="truncate">Celestial Ephemeris</span>
        </h1>
        <p className="max-w-[18rem] text-[0.72rem] leading-snug text-on-surface-variant sm:max-w-[28rem] sm:text-[0.78rem]">
          괘사 / 효사 / 영혼의 달력을 한 화면에서 읽는 아카이브
        </p>
      </div>

      <div className="archive-header__controls flex min-w-0 flex-[0_1_auto] items-center justify-end gap-1.5 sm:ml-auto sm:gap-2">
        <div className="flex min-w-0 items-center justify-start">
          <CommentaryModeTabs value={commentarySource} onChange={onCommentarySourceChange} />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-1">
          <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
          <button
            type="button"
            onClick={handleTodayClick}
            className="ui-button ui-button--ghost min-h-10 rounded-full px-3 py-1.5 font-label text-[0.64rem] uppercase tracking-[0.16em] text-on-surface-variant active-scale"
          >
            오늘
          </button>
        </div>
      </div>
    </header>
  );
};
