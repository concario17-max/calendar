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
    <header className="ui-surface--raised archive-header sticky top-0 z-30 flex min-h-[3.25rem] w-full flex-col gap-1.5 border-0 bg-transparent px-4 py-2 text-on-surface sm:flex-row sm:items-center sm:gap-2 sm:px-4 sm:py-1.5 lg:px-8">
      <div className="archive-header__masthead flex min-w-0 flex-[1_1_16rem] flex-col items-start gap-0.5 sm:gap-1">
        <h1 className="archive-header__title inline-flex min-w-0 items-center gap-1.5 truncate font-headline text-[1.05rem] italic leading-none text-primary sm:text-[1.4rem]">
          <span
            aria-hidden="true"
            className="ui-surface--raised flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-secondary"
          >
            <Crown size={13} strokeWidth={2.2} />
          </span>
          <span className="truncate">Celestial Ephemeris</span>
        </h1>
      </div>

      <div className="archive-header__controls flex w-full min-w-0 flex-wrap items-stretch justify-between gap-1.5 sm:ml-auto sm:w-auto sm:flex-nowrap sm:items-center sm:justify-end sm:gap-1.5">
        <div className="flex min-w-0 items-center justify-start sm:w-auto">
          <CommentaryModeTabs value={commentarySource} onChange={onCommentarySourceChange} />
        </div>

        <div className="flex w-full shrink-0 items-center justify-between gap-2 sm:w-auto sm:justify-end">
          <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
          <button
            type="button"
            onClick={handleTodayClick}
            className="ui-button ui-button--ghost min-h-11 rounded-full px-3.5 py-2 font-label text-[0.7rem] uppercase tracking-[0.16em] text-on-surface-variant active-scale sm:px-3 sm:py-1"
          >
            오늘
          </button>
        </div>
      </div>
    </header>
  );
};
