import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SoulCalendarSection } from './SoulCalendarSection';

const SOUL_TITLE = "Rudolf Steiner's Calendar of the Soul";

describe('SoulCalendarSection', () => {
  it('renders the soul panel header and a flatter empty state when there are no verses', () => {
    const { container } = render(<SoulCalendarSection hitSoulGroup={undefined} soulSections={[]} />);

    expect(screen.getByRole('heading', { name: SOUL_TITLE })).toBeInTheDocument();
    expect(container.querySelector('[class*="rounded-[2rem]"]')).toBeNull();
    expect(container.querySelector('[class*="border-dashed"]')).toBeInTheDocument();
    expect(screen.queryByText('Soul body A')).not.toBeInTheDocument();
    expect(screen.queryByText('Soul body B')).not.toBeInTheDocument();
  });

  it('renders the soul panel header and weekly cards without a boxed outer shell', () => {
    const { container } = render(
      <SoulCalendarSection
        hitSoulGroup={{
          titleLine: 'Weeks 3',
          weeksLabel: '50二?3??16-22?? 쨌 3二?4??21-27??',
          weekA: 50,
          weekB: 3,
          ranges: [],
          block: '',
        }}
        soulSections={[
          { week: 50, range: '3??16-22??', text: 'Soul body A' },
          { week: 3, range: '4??21-27??', text: 'Soul body B' },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { name: SOUL_TITLE })).toBeInTheDocument();
    expect(screen.getByText('Soul body A')).toBeInTheDocument();
    expect(screen.getByText('Soul body B')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(container.querySelector('[class*="rounded-[2rem]"]')).toBeNull();
  });
});
