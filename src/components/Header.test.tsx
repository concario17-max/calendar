import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('toggles dark mode and persists the preference', () => {
    render(
      <Header
        selectedDate={new Date(2026, 2, 18)}
        onDateChange={() => {}}
        commentarySource="yao"
        onCommentarySourceChange={() => {}}
      />,
    );

    fireEvent.click(screen.getByLabelText('Toggle theme'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('renders the commentary segmented control beside the calendar controls', () => {
    const onCommentarySourceChange = vi.fn();

    render(
      <Header
        selectedDate={new Date(2026, 2, 18)}
        onDateChange={() => {}}
        commentarySource="yao"
        onCommentarySourceChange={onCommentarySourceChange}
      />,
    );

    const commentaryControl = screen.getByRole('radiogroup', { name: '해설 선택' });

    expect(screen.getByRole('button', { name: 'Open date picker' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(within(commentaryControl).getByRole('radio', { name: '효사' })).toBeInTheDocument();
    expect(within(commentaryControl).getByRole('radio', { name: '괘사' })).toBeInTheDocument();
    expect(within(commentaryControl).getByRole('radio', { name: '영혼' })).toBeInTheDocument();

    fireEvent.click(within(commentaryControl).getByRole('radio', { name: '괘사' }));
    expect(onCommentarySourceChange).toHaveBeenCalledWith('gua');
  });
});
