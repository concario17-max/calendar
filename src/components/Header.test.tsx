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
    expect(screen.getByText('괘사 / 효사 / 영혼의 달력을 한 화면에서 읽는 아카이브')).toBeInTheDocument();

    const segmentedControl = screen.getByRole('radiogroup', { name: '해설 선택' });
    expect(segmentedControl).toBeVisible();
    expect(within(segmentedControl).getByRole('radio', { name: '효사' })).toBeInTheDocument();
    expect(within(segmentedControl).getByRole('radio', { name: '괘사' })).toBeInTheDocument();
    expect(within(segmentedControl).getByRole('radio', { name: '영혼' })).toBeInTheDocument();

    const todayButton = screen.getByRole('button', { name: '오늘' });

    expect(screen.getByLabelText('Open date picker')).toBeInTheDocument();
    expect(todayButton).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Toggle theme' })).not.toBeInTheDocument();

    const header = container.querySelector('header');
    const controlsRow = header?.children[1];
    expect(header).toBeInTheDocument();
    expect(controlsRow).toBeInTheDocument();
    expect(controlsRow?.children).toHaveLength(2);
    expect(controlsRow?.firstElementChild).toContainElement(segmentedControl);

    const utilityRow = controlsRow?.lastElementChild;
    expect(utilityRow).toContainElement(screen.getByLabelText('Open date picker'));
    expect(utilityRow).toContainElement(todayButton);
    expect(utilityRow?.children).toHaveLength(2);
  });
});
