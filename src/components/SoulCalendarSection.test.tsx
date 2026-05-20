import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SoulCalendarSection } from './SoulCalendarSection';
import { formatWeeksLabel } from '../utils/soulLogic';

describe('SoulCalendarSection', () => {
  it('formats week labels with explicit parenthesized date ranges', () => {
    expect(
      formatWeeksLabel(
        {
          titleLine: 'Weeks 3',
          weeksLabel: '47주(2월 23일-3월 1일) / 6주(5월 12일-18일)',
          weekA: 47,
          weekB: 6,
          ranges: [],
          block: '',
        },
        [],
      ),
    ).toBe('47주(2월 23일-3월 1일) · 6주(5월 12일-18일)');
  });

  it('formats fallback week labels from soul sections', () => {
    expect(
      formatWeeksLabel(undefined, [
        { week: 47, range: '2월 23일-3월 1일', text: 'Soul body A' },
        { week: 6, range: '5월 12일-18일', text: 'Soul body B' },
      ]),
    ).toBe('47주(2월 23일-3월 1일) · 6주(5월 12일-18일)');
  });

  it('renders the soul panel header and shared empty state when there are no verses', () => {
    render(<SoulCalendarSection hitSoulGroup={undefined} soulSections={[]} />);

    expect(screen.getByText('SOUL')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
    expect(screen.getByText('Soul verses are not available yet.')).toBeInTheDocument();
  });

  it('renders normalized week labels in the soul panel body', () => {
    render(
      <SoulCalendarSection
        hitSoulGroup={undefined}
        soulSections={[
          { week: 47, range: '2월 23일-3월 1일', text: 'Soul body A' },
          { week: 6, range: '5월 12일-18일', text: 'Soul body B' },
        ]}
      />,
    );

    expect(screen.getByText('SOUL')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
    expect(screen.getByText('47주(2월 23일-3월 1일) · 6주(5월 12일-18일)')).toBeInTheDocument();
    expect(screen.getByText('2월 23일-3월 1일')).toBeInTheDocument();
    expect(screen.getByText('5월 12일-18일')).toBeInTheDocument();
    expect(screen.getByText('Soul body A')).toBeInTheDocument();
    expect(screen.getByText('Soul body B')).toBeInTheDocument();
  });
});
