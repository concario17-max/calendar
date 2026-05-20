import type { CommentarySource } from '../types';
import { BookText, ScrollText, Sparkles } from 'lucide-react';

interface CommentaryModeTabsProps {
  value: CommentarySource;
  onChange: (source: CommentarySource) => void;
}

export function CommentaryModeTabs({ value, onChange }: CommentaryModeTabsProps) {
  const options: Array<{ value: CommentarySource; label: string; icon: typeof ScrollText }> = [
    { value: 'yao', label: '효사', icon: ScrollText },
    { value: 'gua', label: '괘사', icon: BookText },
    { value: 'soul', label: '영혼', icon: Sparkles },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="해설 선택"
      className="ui-nav archive-segmented-control inline-flex items-stretch gap-1 rounded-full px-1 py-1"
    >
      {options.map((option) => {
        const active = value === option.value;
        const Icon = option.icon;

        return (
          <label
            key={option.value}
            className={`archive-segmented-control__option ui-nav__item flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-[9px] font-semibold leading-none whitespace-nowrap transition-colors focus-within:ring-2 focus-within:ring-secondary/30 focus-within:ring-offset-2 focus-within:ring-offset-transparent ${
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
            <Icon size={12} strokeWidth={2.3} className="shrink-0" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
