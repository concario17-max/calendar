import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('toggles dark mode and persists the preference', () => {
    render(<Header selectedDate={new Date(2026, 2, 18)} onDateChange={() => {}} />);

    fireEvent.click(screen.getByLabelText('Toggle theme'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
