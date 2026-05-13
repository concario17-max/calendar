import { DatePicker } from './DatePicker';
import type { CommentarySource } from '../types';
import { BookText, Crown, ScrollText, Sparkles } from 'lucide-react';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  commentarySource: CommentarySource;
  onCommentarySourceChange: (source: CommentarySource) => void;
}

function CommentarySegmentedControl({
  value,
  onChange,
}: {
  value: CommentarySource;
  onChange: (source: CommentarySource) => void;
}) {
  const options: Array<{ value: CommentarySource; label: string; icon: typeof ScrollText }> = [
    { value: 'yao', label: '효사', icon: ScrollText },
    { value: 'gua', label: '괘사', icon: BookText },
    { value: 'soul', label: '영혼', icon: Sparkles },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="해설 선택"
      className="archive-segmented-control inline-flex items-center gap-1 rounded-full px-1 py-1"
    >
      {options.map((option) => {
        const active = value === option.value;
        const Icon = option.icon;

        return (
          <label
            key={option.value}
            className={`archive-segmented-control__option flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1.5 text-[9px] font-semibold leading-none whitespace-nowrap ${
              active
                ? 'bg-[#efe8db] text-[#342515] shadow-[0_0_0_1px_rgba(186,147,82,0.18)_inset]'
                : 'text-[#8b8178] hover:text-[#5a4a39]'
            }`}
          >
            <input
              type="radio"
              name="header-commentary-target"
              value={option.value}
              checked={active}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <Icon size={12} strokeWidth={2.3} className="shrink-0" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
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
          <CommentarySegmentedControl
            value={commentarySource}
            onChange={onCommentarySourceChange}
          />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-1">
          <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
          <button
            type="button"
            onClick={() => onDateChange(new Date())}
            className="rounded-full px-2.5 py-1.5 font-label text-[0.64rem] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:bg-secondary/8 hover:text-secondary active-scale"
          >
            Today
          </button>
        </div>
      </div>
    </header>
  );
};
