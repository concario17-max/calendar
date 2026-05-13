import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders the renamed title and keeps the archive controls accessible in a compact row', () => {
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

    const segmentedControl = screen.getByRole('radiogroup', { name: '해설 선택' });
    expect(within(segmentedControl).getByRole('radio', { name: '효사' })).toBeInTheDocument();
    expect(within(segmentedControl).getByRole('radio', { name: '괘사' })).toBeInTheDocument();
    expect(within(segmentedControl).getByRole('radio', { name: '영혼' })).toBeInTheDocument();

    const yaoOptionLabel = within(segmentedControl).getByRole('radio', { name: '효사' }).closest('label');
    expect(yaoOptionLabel).toHaveClass('px-2.5', 'py-1.5', 'text-[9px]');

    expect(screen.getByLabelText('Open date picker')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Today' })).toHaveClass('py-1.5');
    expect(screen.queryByRole('button', { name: 'Toggle theme' })).not.toBeInTheDocument();

    const header = container.querySelector('header');
    const controlsRow = header?.children[1];
    expect(header).toHaveClass('archive-header', 'flex-wrap', 'items-center');
    expect(controlsRow).toHaveClass('archive-header__controls');
    expect(controlsRow).not.toHaveClass('flex-col');
    expect(controlsRow?.children).toHaveLength(2);
    expect(controlsRow?.firstElementChild).toContainElement(segmentedControl);

    const utilityRow = controlsRow?.lastElementChild;
    expect(utilityRow).toContainElement(screen.getByLabelText('Open date picker'));
    expect(utilityRow).toContainElement(screen.getByRole('button', { name: 'Today' }));
    expect(utilityRow?.children).toHaveLength(2);
  });
});
