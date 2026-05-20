import { DatePicker } from './DatePicker';
import type { CommentarySource } from '../types';
import { Crown } from 'lucide-react';
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
  return (
    <header className="archive-header sticky top-0 z-30 -mb-px flex min-h-[3.25rem] w-full flex-wrap items-center gap-2 border-b border-outline-variant/10 px-3 py-2 backdrop-blur-xl sm:px-4 lg:px-8">
      <div className="archive-header__masthead flex min-w-0 flex-[1_1_16rem] items-center gap-2">
        <h1 className="archive-header__title inline-flex min-w-0 items-center gap-2 truncate font-headline text-[1.18rem] italic leading-none text-primary sm:text-[1.58rem]">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary ring-1 ring-secondary/12 shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset]"
          >
            <Crown size={15} strokeWidth={2.2} />
          </span>
          <span className="truncate">Celestial Ephemeris</span>
        </h1>
      </div>

      <div className="archive-header__controls flex min-w-0 flex-[0_1_auto] items-center justify-end gap-1.5 sm:ml-auto sm:gap-2">
        <div className="flex min-w-0 items-center justify-start">
          <CommentaryModeTabs
            value={commentarySource}
            onChange={onCommentarySourceChange}
          />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-1">
          <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
          <button
            type="button"
            onClick={() => onDateChange(new Date())}
            className="inline-flex min-h-10 items-center justify-center rounded-full px-3 py-1.5 font-label text-[0.64rem] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:bg-secondary/8 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 active-scale"
          >
            Today
          </button>
        </div>
      </div>
    </header>
  );
};
