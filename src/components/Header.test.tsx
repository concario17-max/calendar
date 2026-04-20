import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders the renamed title and keeps the segmented control left of the calendar button', () => {
    const onDateChange = vi.fn();
    const onCommentarySourceChange = vi.fn();
    const { container } = render(
      <Header
        selectedDate={new Date(2026, 3, 20)}
        onDateChange={onDateChange}
        commentarySource="yao"
        onCommentarySourceChange={onCommentarySourceChange}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Celestial Ephemeris' })).toBeInTheDocument();

    const segmentedControl = screen.getByRole('radiogroup', { name: '해설 선택' });
    expect(within(segmentedControl).getByRole('radio', { name: '효사' })).toBeInTheDocument();
    expect(within(segmentedControl).getByRole('radio', { name: '괘사' })).toBeInTheDocument();
    expect(within(segmentedControl).getByRole('radio', { name: '영혼' })).toBeInTheDocument();

    expect(screen.getByLabelText('Open date picker')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Today' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Toggle theme' })).not.toBeInTheDocument();

    const header = container.querySelector('header');
    const controlsRow = header?.children[1];
    expect(controlsRow?.firstElementChild).toBe(segmentedControl);
    expect(controlsRow?.lastElementChild?.querySelector('button[aria-label="Open date picker"]')).toBeInTheDocument();
  });
});
