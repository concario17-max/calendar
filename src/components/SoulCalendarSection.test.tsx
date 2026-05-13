import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { formatWeeksLabel, SoulCalendarSection } from './SoulCalendarSection';

describe('SoulCalendarSection', () => {
  it('formats week labels with explicit parenthesized date ranges', () => {
    expect(
      formatWeeksLabel(
        {
          titleLine: 'Weeks 3',
          weeksLabel: '50주(3월 16-22일) / 3주(4월 21-27일)',
          weekA: 50,
          weekB: 3,
          ranges: [],
          block: '',
        },
        [],
      ),
    ).toBe('50주(3월 16-22일) · 3주(4월 21-27일)');
  });

  it('formats fallback week labels from soul sections', () => {
    expect(
      formatWeeksLabel(undefined, [
        { week: 50, range: '3월 16-22일', text: 'Soul body A' },
        { week: 3, range: '4월 21-27일', text: 'Soul body B' },
      ]),
    ).toBe('50주(3월 16-22일) · 3주(4월 21-27일)');
  });

  it('renders the soul panel header and shared empty state when there are no verses', () => {
    render(<SoulCalendarSection hitSoulGroup={undefined} soulSections={[]} />);

    expect(screen.getByText('루돌프 슈타이너의 영혼의 달력')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
    expect(screen.getByText('영혼 본문이 아직 없어.')).toBeInTheDocument();
  });

  it('renders the soul title and body on the same commentary canvas rhythm', () => {
    render(
      <SoulCalendarSection
        hitSoulGroup={undefined}
        soulSections={[
          { week: 50, range: '3월 16-22일', text: 'Soul body A' },
          { week: 3, range: '4월 21-27일', text: 'Soul body B' },
        ]}
      />,
    );

    expect(screen.getByText('루돌프 슈타이너의 영혼의 달력')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
    expect(screen.getByText('50주(3월 16-22일) · 3주(4월 21-27일)')).toBeInTheDocument();
    expect(screen.getByText('Soul body A')).toBeInTheDocument();
    expect(screen.getByText('Soul body B')).toBeInTheDocument();
    expect(screen.queryByText('영혼 본문이 아직 없어.')).not.toBeInTheDocument();
  });
});
