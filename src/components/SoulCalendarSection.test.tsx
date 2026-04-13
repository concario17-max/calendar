import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SoulCalendarSection } from './SoulCalendarSection';

describe('SoulCalendarSection', () => {
  it('renders a fallback when there are no verses', () => {
    render(<SoulCalendarSection hitSoulGroup={undefined} soulSections={[]} />);

    expect(screen.getByText('이 구간에 해당하는 영혼의 달력 본문을 찾지 못했습니다.')).toBeInTheDocument();
  });

  it('renders a single verse card when only one section exists', () => {
    render(
      <SoulCalendarSection
        hitSoulGroup={{ titleLine: 'Weeks 3', weeksLabel: '3주', weekA: 3, weekB: null, ranges: [], block: '' }}
        soulSections={[{ week: 3, range: '4월 21-27', text: '봄\n봄의 본문' }]}
      />,
    );

    expect(screen.getAllByText('3주')).toHaveLength(2);
    expect(screen.getByText('4월 21-27')).toBeInTheDocument();
    expect(screen.getByText('봄')).toBeInTheDocument();
    expect(screen.getByText('봄의 본문')).toBeInTheDocument();
  });
});
