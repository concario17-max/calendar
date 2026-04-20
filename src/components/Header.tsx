import { DatePicker } from './DatePicker';
import type { CommentarySource } from '../types';
import { BookText, ScrollText, Sparkles } from 'lucide-react';

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
    <div role="radiogroup" aria-label="해설 선택" className="inline-flex items-center gap-1.5">
      {options.map((option) => {
        const active = value === option.value;
        const Icon = option.icon;

        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.16em] transition-colors duration-200 ${
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
  return (
    <header className="sticky top-0 z-30 flex min-h-[4.25rem] w-full items-center justify-between gap-4 border-b border-outline-variant/12 bg-surface/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="truncate font-headline text-[1.45rem] italic leading-none text-primary sm:text-[1.7rem]">
          Celestial Ephemeris
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <CommentarySegmentedControl
          value={commentarySource}
          onChange={onCommentarySourceChange}
        />

        <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
      </div>
    </header>
  );
};
