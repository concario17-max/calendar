import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('opens the calendar and selects a day', () => {
    const onDateChange = vi.fn();
    render(<DatePicker selectedDate={new Date(2026, 2, 18)} onDateChange={onDateChange} />);

    fireEvent.click(screen.getByLabelText('Open date picker'));
    fireEvent.click(screen.getByLabelText('March 10, 2026'));

    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange.mock.calls[0]?.[0]).toEqual(new Date(2026, 2, 10));
  });

  it('keeps keyboard focus on the visible month after paging and uses it for arrow navigation', () => {
    const onDateChange = vi.fn();
    render(<DatePicker selectedDate={new Date(2026, 2, 31)} onDateChange={onDateChange} />);

    fireEvent.click(screen.getByLabelText('Open date picker'));

    const marchDialog = screen.getByRole('dialog', { name: 'March 2026' });
    fireEvent.keyDown(marchDialog, { key: 'PageDown' });

    const aprilDialog = screen.getByRole('dialog', { name: 'April 2026' });
    expect(screen.getByLabelText('April 30, 2026')).toHaveFocus();

    fireEvent.keyDown(aprilDialog, { key: 'ArrowDown' });

    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange.mock.calls[0]?.[0]).toEqual(new Date(2026, 4, 7));

    fireEvent.keyDown(aprilDialog, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Open date picker')).toHaveFocus();
  });
});
