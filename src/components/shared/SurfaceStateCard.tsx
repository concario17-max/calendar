import type { AriaRole, ReactNode } from 'react';

interface SurfaceStateCardProps {
  children: ReactNode;
  testId?: string;
  className?: string;
  role?: AriaRole;
  ariaLive?: 'polite' | 'assertive' | 'off';
}

const baseClassName =
  'ui-card ui-surface--raised relative overflow-hidden rounded-[1.5rem] px-4 py-4 backdrop-blur-sm';

export function SurfaceStateCard({
  children,
  testId,
  className = '',
  role,
  ariaLive,
}: SurfaceStateCardProps) {
  return (
    <article
      data-testid={testId}
      role={role}
      aria-live={ariaLive}
      className={[baseClassName, className].filter(Boolean).join(' ')}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-secondary/10 blur-2xl" />
      <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-secondary/5 blur-3xl" />
      <div className="relative">{children}</div>
    </article>
  );
}
