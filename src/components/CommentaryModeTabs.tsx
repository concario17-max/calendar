import { BookText, ScrollText, Sparkles } from 'lucide-react';
import type { CommentarySource } from '../types';

interface CommentaryModeTabsProps {
  value: CommentarySource;
  onChange: (source: CommentarySource) => void;
}

const COMMENTARY_MODE_OPTIONS: Array<{ value: CommentarySource; label: string; icon: typeof ScrollText }> = [
  { value: 'yao', label: '효사', icon: ScrollText },
  { value: 'gua', label: '괘사', icon: BookText },
  { value: 'soul', label: '영혼', icon: Sparkles },
];

export function CommentaryModeTabs({ value, onChange }: CommentaryModeTabsProps) {
  return (
    <div
      role="radiogroup"
      aria-label="해설 선택"
      aria-orientation="horizontal"
      className="ui-nav archive-segmented-control flex w-full items-stretch gap-1 rounded-full px-1 py-0.5 sm:w-auto sm:gap-1"
    >
      {COMMENTARY_MODE_OPTIONS.map((option) => {
        const active = value === option.value;
        const Icon = option.icon;

        return (
          <label
            key={option.value}
            className={`archive-segmented-control__option ui-nav__item flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full px-3.5 py-2.5 text-[10px] font-semibold leading-none whitespace-nowrap transition-colors transition-shadow focus-within:ring-2 focus-within:ring-secondary/30 focus-within:ring-offset-2 focus-within:ring-offset-transparent sm:flex-none sm:px-2.5 sm:py-1.5 sm:text-[8.5px] ${
              active
                ? 'bg-surface-container-high text-on-surface'
                : 'text-on-surface-variant hover:bg-surface-container-high/70 hover:text-on-surface'
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
            <Icon size={13} strokeWidth={2.3} className="shrink-0 sm:size-[11px]" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
