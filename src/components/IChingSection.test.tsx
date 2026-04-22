import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MainContent } from './MainContent.tsx';
import { IChingSection } from './IChingSection.tsx';

vi.mock('../data', () => {
  const guaCommentary = [
    'Gua Heading',
    '',
    'Col A | Col B | Col C',
    'A1 | B1 | C1',
    'A2 | B2 | C2',
    '',
    'Commentary body',
  ].join('\n');

  const guaListCommentary = [
    'Gua List Heading',
    '',
    '[[list]]',
    '[[item]] First list item',
    '[[item]] Second list item',
    '[[item]] Third list item',
    '[[/list]]',
  ].join('\n');

  const guaKeywordCommentary = [
    'Gua Keyword Heading',
    '',
    '🔑 핵심 키워드: 아르길로, 왼쪽 옆, 지배자, 빛과 어둠, 물질화, 아스트랄체, 진실한 사랑',
    '',
    'General commentary body',
  ].join('\n');

  const yaoProseCommentary = ['Yao Heading', 'Plain prose commentary body'].join('\n');
  const yaoPipeProseCommentary = [
    'Yao Heading',
    'Pipe prose | should stay plain text',
    'still prose with a second line | and punctuation',
  ].join('\n');

  return {
    getGuaCommentary: (num: number | null) => {
      if (num === 6) {
        return guaCommentary;
      }

      if (num === 8) {
        return guaListCommentary;
      }

      if (num === 10) {
        return guaKeywordCommentary;
      }

      return undefined;
    },
    getYaoCommentary: (num: number | null) => {
      if (num === 33) {
        return yaoProseCommentary;
      }

      if (num === 34) {
        return yaoPipeProseCommentary;
      }

      return undefined;
    },
  };
});

function renderSection(overrides?: Partial<React.ComponentProps<typeof MainContent>>) {
  const view = render(
    <MainContent
      selectedDate={new Date(2026, 3, 19)}
      onDateChange={vi.fn()}
      yaoNum={33}
      guaNum={6}
      guaData={{ header: '62. Example', meta: 'Anamil explanation' }}
      yaoData={{
        titleLine: '33. Example',
        short: 'Short reading',
        body: 'Body text',
      }}
      hitSoulGroup={{
        titleLine: '31. Example Soul Group',
        weeksLabel: '50주(3월 16-22일) / 3주(4월 21-27일)',
        weekA: 50,
        weekB: 3,
        ranges: [],
        block: '',
      }}
      soulSections={[
        {
          week: 50,
          range: '3월 16-22',
          text: 'Soul heading\nSoul body',
        },
        {
          week: 3,
          range: '4월 21-27',
          text: 'Soul heading 2\nSoul body 2',
        },
      ]}
      {...overrides}
    />,
  );

  return {
    container: view.container,
    leftPanel: screen.getAllByRole('article')[0],
    rightPanel: screen.getByRole('complementary'),
    readingTopUnit: screen.getByTestId('reading-top-unit'),
    readingVerseUnit: screen.getByTestId('reading-verse-unit'),
    readingSigilUnit: screen.getByTestId('reading-sigil-unit'),
  };
}

describe('IChingSection', () => {
  it('renders an empty-state message when there is no passage', () => {
    render(<IChingSection yaoNum={null} guaNum={null} guaData={null} yaoData={null} />);

    expect(screen.getByText('Reading data is not available yet.')).toBeInTheDocument();
  });

  it('renders the reading shell without legacy rail labels or shell chrome controls', () => {
    const { container, leftPanel, rightPanel } = renderSection();

    const main = screen.getByRole('main');
    const shell = container.querySelector('section');
    const grid = container.querySelector('section > div');

    expect(main).toHaveClass('min-h-dvh', 'overflow-y-auto', 'md:h-[100dvh]', 'md:overflow-hidden');
    expect(shell).toHaveClass('flex', 'w-full', 'flex-1', 'flex-col');
    expect(grid).toHaveClass('flex', 'flex-col', 'gap-5', 'lg:grid', 'lg:grid-cols-[360px_minmax(0,1fr)]');
    expect(leftPanel).toHaveClass('flex', 'w-full');
    expect(leftPanel).toHaveClass('lg:sticky', 'lg:top-0', 'lg:overflow-y-auto');
    expect(leftPanel).toHaveClass('bg-[#f2eadc]');
    expect(leftPanel).not.toHaveClass('border-r');
    expect(rightPanel).toHaveClass('flex', 'w-full', 'min-w-0', 'flex-col');
    expect(rightPanel).toHaveClass('lg:overflow-y-auto');
    expect(rightPanel).toHaveClass('bg-[#fbf8f1]');

    expect(screen.queryByText('Manifesto')).not.toBeInTheDocument();
    expect(screen.queryByText('Reading rail')).not.toBeInTheDocument();
    expect(screen.queryByText('Commentary')).not.toBeInTheDocument();
    expect(screen.getByText('오늘의 효사')).toBeInTheDocument();
    expect(screen.queryByText('Reading canvas')).not.toBeInTheDocument();
  });

  it('keeps the commentary control in the header and preserves the left rail content', () => {
    const { leftPanel, rightPanel, readingTopUnit, readingVerseUnit, readingSigilUnit } = renderSection();

    const commentaryControl = screen.getByRole('radiogroup', { name: '해설 선택' });

    expect(commentaryControl).toBeInTheDocument();
    expect(within(commentaryControl).getAllByRole('radio')).toHaveLength(3);
    expect(within(commentaryControl).getByRole('radio', { name: '효사' })).toBeInTheDocument();
    expect(within(commentaryControl).getByRole('radio', { name: '괘사' })).toBeInTheDocument();
    expect(within(commentaryControl).getByRole('radio', { name: '영혼' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();

    expect(within(readingSigilUnit).getByRole('img', { name: 'sigil 33' })).toBeInTheDocument();
    expect(within(readingVerseUnit).getByText('효사')).toBeInTheDocument();
    expect(within(readingTopUnit).getByText('괘사')).toBeInTheDocument();
    expect(within(leftPanel).getByText('영혼')).toBeInTheDocument();
    expect(
      within(leftPanel).getByRole('heading', { level: 2, name: "Rudolf Steiner's Calendar of the Soul" }),
    ).toBeInTheDocument();
    expect(within(leftPanel).getByText('50주(3월 16-22일) · 3주(4월 21-27일)')).toBeInTheDocument();
    expect(within(rightPanel).queryByText("Rudolf Steiner's Calendar of the Soul")).not.toBeInTheDocument();
    const leftRailBlocks = Array.from(
      leftPanel.querySelectorAll('[data-testid="reading-verse-unit"], [data-testid="reading-top-unit"]'),
    );

    expect(leftRailBlocks[0]).toBe(readingVerseUnit);
    expect(leftRailBlocks[1]).toBe(readingTopUnit);
    expect(within(readingTopUnit).getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(within(readingTopUnit).getByText('Anamil explanation')).toBeInTheDocument();
    expect(within(readingVerseUnit).getByRole('heading', { level: 4, name: '33. Example' })).toBeInTheDocument();
    expect(within(readingVerseUnit).getByText('Short reading')).toBeInTheDocument();

    expect(screen.queryByTestId('commentary-shell')).not.toBeInTheDocument();
    expect(screen.getByTestId('commentary-reading-body')).toHaveTextContent('Body text');
    expect(within(leftPanel).queryByText('Manifesto')).not.toBeInTheDocument();
    expect(within(rightPanel).queryByText('Reading canvas')).not.toBeInTheDocument();

    fireEvent.click(within(commentaryControl).getByRole('radio', { name: '괘사' }));
    expect(screen.getByText('오늘의 괘사')).toBeInTheDocument();
    expect(screen.getByText('Gua Heading')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Col A' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'B1' })).toBeInTheDocument();
    expect(screen.getByText('Commentary body')).toBeInTheDocument();
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();

    fireEvent.click(within(commentaryControl).getByRole('radio', { name: '영혼' }));
    expect(within(leftPanel).getByText('영혼')).toBeInTheDocument();
    expect(
      within(rightPanel).getByRole('heading', { level: 2, name: "Rudolf Steiner's Calendar of the Soul" }),
    ).toBeInTheDocument();
    expect(within(rightPanel).getByText('루돌프 슈타이너의 영혼의 달력')).toBeInTheDocument();
    expect(within(rightPanel).queryByText('2 blocks')).not.toBeInTheDocument();
    expect(within(rightPanel).getByText('50주').closest('article')).toHaveTextContent('Soul body');
    expect(within(rightPanel).queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
    expect(screen.queryByText('Body text')).not.toBeInTheDocument();
  });

  it('renders bullet-marked commentary blocks as semantic lists', () => {
    renderSection({
      yaoNum: 33,
      guaNum: 8,
      guaData: { header: '62. Example', meta: 'Example meta' },
      yaoData: {
        titleLine: '33. Example',
        short: 'Short reading',
        body: 'Body text',
      },
      hitSoulGroup: {
        titleLine: '31. Example Soul Group',
        weeksLabel: '50주(3월 16-22일) / 3주(4월 21-27일)',
        weekA: 50,
        weekB: 3,
        ranges: [],
        block: '',
      },
      soulSections: [],
    });

    fireEvent.click(screen.getByRole('radio', { name: '괘사' }));

    const commentaryList = screen.getByRole('list');

    expect(screen.getByText('Gua List Heading')).toBeInTheDocument();
    expect(commentaryList).toHaveClass('list-disc');
    expect(within(commentaryList).getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('First list item')).toBeInTheDocument();
    expect(screen.getByText('Second list item')).toBeInTheDocument();
    expect(screen.getByText('Third list item')).toBeInTheDocument();
    expect(screen.queryByText('[[item]] First list item')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders plain commentary prose without forcing a table', () => {
    renderSection({
      yaoNum: 33,
      guaNum: 6,
      guaData: { header: '62. Example', meta: 'Example meta' },
      yaoData: {
        titleLine: '33. Example',
        short: 'Short reading',
        body: 'Body text',
      },
      hitSoulGroup: {
        titleLine: '31. Example Soul Group',
        weeksLabel: '50주(3월 16-22일) / 3주(4월 21-27일)',
        weekA: 50,
        weekB: 3,
        ranges: [],
        block: '',
      },
      soulSections: [],
    });

    expect(screen.getByText('Yao Heading')).toBeInTheDocument();
    expect(screen.getByText('Plain prose commentary body')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('keeps pipe-heavy prose as a paragraph when it is not a real table', () => {
    renderSection({
      yaoNum: 34,
      guaNum: 6,
      guaData: { header: '62. Example', meta: 'Example meta' },
      yaoData: {
        titleLine: '34. Example',
        short: 'Short reading',
        body: 'Body text',
      },
      hitSoulGroup: {
        titleLine: '31. Example Soul Group',
        weeksLabel: '50주(3월 16-22일) / 3주(4월 21-27일)',
        weekA: 50,
        weekB: 3,
        ranges: [],
        block: '',
      },
      soulSections: [],
    });

    const commentaryReadingBody = screen.getByTestId('commentary-reading-body');
    const commentaryBody = screen.getByTestId('commentary-block-0');

    expect(commentaryReadingBody).toHaveTextContent('Body text');
    expect(commentaryBody).toHaveTextContent('Pipe prose | should stay plain text');
    expect(commentaryBody).toHaveTextContent('still prose with a second line | and punctuation');
    expect(within(commentaryBody).queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('highlights the keyword lead line without styling the rest of commentary', () => {
    renderSection({
      yaoNum: 33,
      guaNum: 10,
      guaData: { header: '62. Example', meta: 'Example meta' },
      yaoData: {
        titleLine: '33. Example',
        short: 'Short reading',
        body: 'Body text',
      },
      hitSoulGroup: {
        titleLine: '31. Example Soul Group',
        weeksLabel: '50주(3월 16-22일) / 3주(4월 21-27일)',
        weekA: 50,
        weekB: 3,
        ranges: [],
        block: '',
      },
      soulSections: [],
    });

    fireEvent.click(screen.getByRole('radio', { name: '괘사' }));

    const keywordLine = screen.getByTestId('commentary-keyword-line');
    const commentaryBody = screen.getByText('General commentary body').closest('p');

    expect(keywordLine).toHaveTextContent('🔑 핵심 키워드:');
    expect(keywordLine).toHaveClass('bg-[#f4eadc]', 'text-[#4b3b29]');
    expect(commentaryBody).not.toHaveClass('bg-[#f4eadc]');
    expect(commentaryBody).not.toHaveClass('text-[#4b3b29]');
  });

  it('keeps the commentary shell visible when commentary is missing', () => {
    renderSection({
      yaoNum: 999,
      guaNum: 999,
      guaData: { header: '62. Example', meta: 'Example meta' },
      yaoData: {
        titleLine: '999. Example',
        short: 'Short reading',
        body: 'Body text',
      },
      hitSoulGroup: {
        titleLine: '31. Example Soul Group',
        weeksLabel: '50주(3월 16-22일) / 3주(4월 21-27일)',
        weekA: 50,
        weekB: 3,
        ranges: [],
        block: '',
      },
      soulSections: [],
    });

    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 4, name: 'Commentary' })).not.toBeInTheDocument();
    expect(screen.getByText('Commentary is not available for this selection yet.')).toBeInTheDocument();
    expect(screen.getByText('Commentary is not available for this selection yet.').closest('article')).not.toBeNull();
  });
});





