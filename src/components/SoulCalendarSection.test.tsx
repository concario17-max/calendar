import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SoulCalendarSection } from './SoulCalendarSection';

describe('SoulCalendarSection', () => {
  it('renders a fallback when there are no verses', () => {
    render(<SoulCalendarSection hitSoulGroup={undefined} soulSections={[]} />);

    expect(screen.getByText('Soul readings are not available yet.')).toBeInTheDocument();
  });

  it('renders soul entries as stacked sections without boxed cards', () => {
    render(
      <SoulCalendarSection
        hitSoulGroup={{ titleLine: 'Weeks 3', weeksLabel: '3 weeks', weekA: 3, weekB: null, ranges: [], block: '' }}
        soulSections={[{ week: 3, range: '4/21-27', text: 'First line\nSoul body' }]}
      />,
    );

    const soulSection = screen.getByTestId('soul-section');
    const soulEntry = screen.getByTestId('soul-entry-3');

    expect(screen.getByText('Rudolf Steiner\'s Calendar of the Soul')).toBeInTheDocument();
    expect(screen.getByText('3 weeks')).toBeInTheDocument();
    expect(screen.getByText('4/21-27')).toBeInTheDocument();
    expect(screen.getByText('Soul body')).toBeInTheDocument();
    expect(soulSection).toBeInTheDocument();
    expect(soulEntry).toBeInTheDocument();
    expect(soulEntry.className).not.toContain('rounded');
    expect(soulEntry.className).not.toContain('shadow');
  });
});
