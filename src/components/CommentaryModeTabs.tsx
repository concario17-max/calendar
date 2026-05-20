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
      className="archive-segmented-control inline-flex items-stretch gap-1 rounded-full px-1 py-1"
    >
      {options.map((option) => {
        const active = value === option.value;
        const Icon = option.icon;

        return (
          <label
            key={option.value}
            className={`archive-segmented-control__option flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-[9px] font-semibold leading-none whitespace-nowrap transition-colors focus-within:ring-2 focus-within:ring-[#c79b45]/40 focus-within:ring-offset-2 focus-within:ring-offset-transparent ${
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
