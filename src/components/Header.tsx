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
    <header className="ui-surface--raised archive-header sticky top-0 z-30 -mb-px flex min-h-[4rem] w-full flex-col gap-3 border-0 bg-transparent px-4 py-4 text-on-surface backdrop-blur-xl sm:flex-row sm:items-center sm:gap-2 sm:px-4 sm:py-3 lg:px-8">
      <div className="archive-header__masthead flex min-w-0 flex-[1_1_16rem] flex-col items-start gap-1 sm:gap-1.5">
        <h1 className="archive-header__title inline-flex min-w-0 items-center gap-2 truncate font-headline text-[1.18rem] italic leading-none text-primary sm:text-[1.58rem]">
          <span
            aria-hidden="true"
            className="ui-surface--raised flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-secondary"
          >
            <Crown size={15} strokeWidth={2.2} />
          </span>
          <span className="truncate">Celestial Ephemeris</span>
        </h1>
      </div>

      <div className="archive-header__controls flex w-full min-w-0 flex-wrap items-stretch justify-between gap-3 sm:ml-auto sm:w-auto sm:flex-nowrap sm:items-center sm:justify-end sm:gap-2">
        <div className="flex min-w-0 items-center justify-start sm:w-auto">
          <CommentaryModeTabs value={commentarySource} onChange={onCommentarySourceChange} />
        </div>

        <div className="flex w-full shrink-0 items-center justify-between gap-2 sm:w-auto sm:justify-end">
          <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
          <button
            type="button"
            onClick={handleTodayClick}
            className="ui-button ui-button--ghost min-h-11 rounded-full px-4 py-2 font-label text-[0.68rem] uppercase tracking-[0.16em] text-on-surface-variant active-scale sm:px-3.5 sm:py-1.5"
          >
            ?¤ëŠ˜
          </button>
        </div>
      </div>
    </header>
  );
};
