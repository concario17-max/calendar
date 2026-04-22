import { DatePicker } from './DatePicker';
import type { CommentarySource } from '../types';
import { useTheme } from '../hooks/useTheme';
import { BookText, Moon, ScrollText, Sparkles, Sun } from 'lucide-react';

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
    <div role="radiogroup" aria-label="해설 선택" className="inline-flex items-center gap-1">
      {options.map((option) => {
        const active = value === option.value;
        const Icon = option.icon;

        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-1 rounded-full px-1.5 py-1 text-[9px] font-semibold tracking-[0.14em] transition-colors duration-200 ${
              active ? 'bg-[#efe8db] text-[#342515]' : 'text-[#8b8178] hover:bg-secondary/8 hover:text-[#5a4a39]'
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
            <Icon size={11} strokeWidth={2.4} className="shrink-0" aria-hidden="true" />
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
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex min-h-[3.5rem] w-full flex-col gap-2 border-b border-outline-variant/8 bg-surface/90 px-3 py-2.5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="truncate font-headline text-[1.3rem] italic leading-none text-primary sm:text-[1.7rem]">
          Celestial Ephemeris
        </h1>
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:gap-2.5">
        <div className="flex w-full items-center justify-center sm:w-auto sm:justify-start">
          <CommentarySegmentedControl
            value={commentarySource}
            onChange={onCommentarySourceChange}
          />
        </div>

        <div className="flex items-center justify-end gap-1 self-end sm:self-auto">
          <div className="flex items-center gap-1 shrink-0">
            <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
            <button
              type="button"
              onClick={() => onDateChange(new Date())}
              className="rounded-full px-2.5 py-1.25 font-label text-[0.64rem] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:bg-secondary/8 hover:text-secondary active-scale"
            >
              Today
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant transition-colors hover:bg-secondary/8 hover:text-secondary active-scale"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={17} className="sm:h-4.5 sm:w-4.5" /> : <Moon size={17} className="sm:h-4.5 sm:w-4.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
