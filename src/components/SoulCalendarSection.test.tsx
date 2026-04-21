import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SoulCalendarSection } from './SoulCalendarSection';

describe('SoulCalendarSection', () => {
  it('renders the Korean soul label when there are no verses', () => {
    render(<SoulCalendarSection hitSoulGroup={undefined} soulSections={[]} />);

    expect(screen.getByText('슈타이너의 영혼의 달력')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '영혼의 달력' })).toBeInTheDocument();
    expect(screen.getByRole('heading').closest('section')).toHaveClass('min-w-0');
  });

  it('renders the current soul week range in the title slot', () => {
    render(
      <SoulCalendarSection
        hitSoulGroup={{
          titleLine: 'Weeks 3',
          weeksLabel: '50주(3월 16-22일) / 3주(4월 21-27일)',
          weekA: 50,
          weekB: 3,
          ranges: [],
          block: '',
        }}
        soulSections={[
          { week: 50, range: '3월 16-22일', text: 'Soul body A' },
          { week: 3, range: '4월 21-27일', text: 'Soul body B' },
        ]}
      />,
    );

    expect(screen.getByText('슈타이너의 영혼의 달력')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '50주(3월 16-22일) / 3주(4월 21-27일)' })).toBeInTheDocument();
    expect(screen.queryByText("Rudolf Steiner's Calendar of the Soul")).not.toBeInTheDocument();
    expect(screen.queryByText('Soul body A')).not.toBeInTheDocument();
    expect(screen.queryByText('Soul body B')).not.toBeInTheDocument();
  });
});
