import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SoulCalendarSection } from './SoulCalendarSection';

describe('SoulCalendarSection', () => {
  it('renders the soul title and decorated empty state when there are no verses', () => {
    render(<SoulCalendarSection hitSoulGroup={undefined} soulSections={[]} />);

    expect(screen.getByText("Rudolf Steiner's Calendar of the Soul")).toBeInTheDocument();
    expect(screen.getByText('슈타이너의 영혼의 달력')).toBeInTheDocument();
    expect(screen.getByText('연결된 영혼 본문이 아직 없어.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
    expect(screen.getByRole('heading').closest('section')).toHaveClass('min-w-0');
  });

  it('renders the current soul week range and decorative body cards', () => {
    render(
      <SoulCalendarSection
        hitSoulGroup={{
          titleLine: 'Weeks 3',
          weeksLabel: '50주(3월 16-22) / 3주(4월 21-27)',
          weekA: 50,
          weekB: 3,
          ranges: [],
          block: '',
        }}
        soulSections={[
          { week: 50, range: '3월 16-22', text: 'Soul body A' },
          { week: 3, range: '4월 21-27', text: 'Soul body B' },
        ]}
      />,
    );

    expect(screen.getByText("Rudolf Steiner's Calendar of the Soul")).toBeInTheDocument();
    expect(screen.getByText('50주(3월 16-22) / 3주(4월 21-27)')).toBeInTheDocument();
    expect(screen.getByText('Soul body A')).toBeInTheDocument();
    expect(screen.getByText('Soul body B')).toBeInTheDocument();
    expect(screen.queryByText('슈타이너의 영혼의 달력')).toBeInTheDocument();
    expect(screen.queryByText('연결된 영혼 본문이 아직 없어.')).not.toBeInTheDocument();
  });
});
