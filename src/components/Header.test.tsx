import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders the title and keeps the archive controls accessible in a compact row', () => {
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
    expect(screen.getByRole('heading', { name: 'Celestial Ephemeris' }).querySelector('svg')).toBeInTheDocument();

    const segmentedControl = screen.getByRole('radiogroup');
    expect(segmentedControl).toBeVisible();
    expect(within(segmentedControl).getAllByRole('radio')).toHaveLength(3);

    const utilityButtons = screen.getAllByRole('button');
    const datePickerButton = screen.getByLabelText('Open date picker');

    expect(datePickerButton).toBeInTheDocument();
    expect(utilityButtons.length).toBeGreaterThanOrEqual(2);
    expect(screen.queryByRole('button', { name: 'Toggle theme' })).not.toBeInTheDocument();

    const header = container.querySelector('header');
    const controlsRow = header?.children[1];
    expect(header).toBeInTheDocument();
    expect(controlsRow).toBeInTheDocument();
    expect(controlsRow?.children).toHaveLength(2);
    expect(controlsRow?.firstElementChild).toContainElement(segmentedControl);

    const utilityRow = controlsRow?.lastElementChild;
    expect(utilityRow).toContainElement(datePickerButton);
    expect(utilityRow?.children).toHaveLength(2);
  });
});
