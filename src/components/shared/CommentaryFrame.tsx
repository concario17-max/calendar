import type { ReactNode } from 'react';

interface CommentaryFrameProps {
  children: ReactNode;
  className?: string;
  testId?: string;
  decorationClassName?: string;
}

const baseClassName = 'ui-card ui-surface--raised relative overflow-hidden rounded-[2rem] px-4 py-2';

export function CommentaryFrame({
  children,
  className = '',
  testId,
  decorationClassName = '',
}: CommentaryFrameProps) {
  return (
    <div data-testid={testId} className={[baseClassName, className].filter(Boolean).join(' ')}>
      <div
        className={[
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent',
          decorationClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <div
        className={['absolute -right-2 top-2 h-16 w-16 rounded-full bg-secondary/10 blur-2xl', decorationClassName]
          .filter(Boolean)
          .join(' ')}
      />
      <div
        className={['absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-secondary/5 blur-3xl', decorationClassName]
          .filter(Boolean)
          .join(' ')}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
