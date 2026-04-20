import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SoulCalendarSection } from './SoulCalendarSection';

describe('SoulCalendarSection', () => {
  it('renders the header when there are no verses', () => {
    render(<SoulCalendarSection hitSoulGroup={undefined} soulSections={[]} />);

    expect(screen.getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
    expect(screen.getByText('해당 날짜 항목 없음')).toBeInTheDocument();
    expect(screen.queryByText('해당되는 영혼의 일일 묵상 본문을 찾지 못했습니다.')).not.toBeInTheDocument();
  });

  it('keeps the soul section header visible and omits body cards', () => {
    render(
      <SoulCalendarSection
        hitSoulGroup={{ titleLine: 'Weeks 3', weeksLabel: '3주(4월 21-27일)', weekA: 3, weekB: null, ranges: [], block: '' }}
        soulSections={[{ week: 3, range: '4월 21-27', text: 'Soul body' }]}
      />,
    );

    expect(screen.getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
    expect(screen.getByText('3주(4월 21-27일)')).toBeInTheDocument();
    expect(screen.queryByText('4월 21-27')).not.toBeInTheDocument();
    expect(screen.queryByText('Soul body')).not.toBeInTheDocument();
  });
});
