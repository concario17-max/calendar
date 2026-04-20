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

function renderSection(overrides?: Partial<React.ComponentProps<typeof IChingSection>>) {
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
        weeksLabel: '31주(4월 13-19일)',
        weekA: 31,
        weekB: 33,
        ranges: [],
        block: '',
      }}
      soulSections={[
        {
          week: 31,
          range: '4월 13-19',
          text: 'Soul heading\nSoul body',
        },
      ]}
      {...overrides}
    />,
  );

  return {
    container: view.container,
    leftPanel: screen.getByRole('article'),
    readingTitleRow: screen.getByTestId('reading-title-row'),
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

  it('keeps the left reading rail sticky and lets the commentary panel scroll independently', () => {
    const { container } = renderSection();

    const main = screen.getByRole('main');
    const shell = container.querySelector('section');
    const grid = container.querySelector('section > div');
    const leftRail = screen.getByRole('article');
    const rightRail = screen.getByRole('complementary');

    expect(main).toHaveClass('h-[100dvh]', 'overflow-hidden');
    expect(shell).toHaveClass('min-h-0');
    expect(grid).toHaveClass('h-full', 'min-h-0', 'overflow-x-auto', 'min-w-[720px]');
    expect(leftRail).toHaveClass('sticky', 'top-0', 'overflow-y-auto', 'min-w-[340px]');
    expect(rightRail).toHaveClass('overflow-y-auto');
    expect(within(leftRail).getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
  });

  it('keeps a single segmented commentary control in the Today\'s Reading row and renders the soul header in the left panel', () => {
    const { leftPanel, readingTitleRow, readingTopUnit, readingVerseUnit, readingSigilUnit } = renderSection();
    const commentaryControl = within(readingTitleRow).getByRole('radiogroup', { name: '해설 선택' });

    expect(commentaryControl).toBeInTheDocument();
    expect(within(commentaryControl).getAllByRole('radio')).toHaveLength(3);
    expect(within(commentaryControl).getByRole('radio', { name: '효사' })).toBeInTheDocument();
    expect(within(commentaryControl).getByRole('radio', { name: '괘사' })).toBeInTheDocument();
    expect(within(commentaryControl).getByRole('radio', { name: '영혼' })).toBeInTheDocument();

    expect(within(leftPanel).getByRole('heading', { name: "Rudolf Steiner's Calendar of the Soul" })).toBeInTheDocument();
    expect(within(leftPanel).getByText('31주(4월 13-19일)')).toBeInTheDocument();
    expect(within(leftPanel).queryByText('4/13 - 4/19')).not.toBeInTheDocument();
    expect(within(leftPanel).queryByText('Soul heading')).not.toBeInTheDocument();
    expect(within(leftPanel).queryByText('Soul body')).not.toBeInTheDocument();

    expect(within(readingSigilUnit).getByRole('img', { name: 'sigil 33' })).toBeInTheDocument();
    expect(within(readingTopUnit).getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(within(readingTopUnit).getByText('Anamil explanation')).toBeInTheDocument();
    expect(within(readingVerseUnit).getByRole('heading', { level: 4, name: '33. Example' })).toBeInTheDocument();
    expect(within(readingVerseUnit).getByText('Short reading')).toBeInTheDocument();

    expect(screen.getByTestId('commentary-reading-body')).toHaveTextContent('Body text');

    fireEvent.click(within(commentaryControl).getByRole('radio', { name: '괘사' }));
    expect(screen.getByText('Gua Heading')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Col A' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'B1' })).toBeInTheDocument();
    expect(screen.getByText('Commentary body')).toBeInTheDocument();
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();

    fireEvent.click(within(commentaryControl).getByRole('radio', { name: '영혼' }));
    expect(screen.getByTestId('commentary-block-0')).toHaveTextContent('Soul heading');
    expect(screen.getByTestId('commentary-block-0')).toHaveTextContent('Soul body');
    expect(screen.queryByText('Body text')).not.toBeInTheDocument();
  });

  it("places the date controls on the commentary row to the left of the theme toggle", () => {
    renderSection({
      selectedDate: new Date(2026, 3, 19),
      onDateChange: vi.fn(),
    });

    const readingTitleRow = screen.getByTestId('reading-title-row');
    const todayBadge = within(readingTitleRow).getByText("Today's Reading");
    const commentaryControl = within(readingTitleRow).getByRole('radiogroup', { name: '해설 선택' });
    const commentaryPanel = screen.getByRole('complementary');
    const todayControls = within(commentaryPanel).getByTestId('today-controls');
    const themeToggle = within(commentaryPanel).getByRole('button', { name: 'Toggle theme' });

    expect(todayBadge).toBeInTheDocument();
    expect(within(todayControls).getByRole('button', { name: 'Open date picker' })).toBeInTheDocument();
    expect(within(todayControls).getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(todayControls.nextElementSibling).toBe(themeToggle);
    expect(commentaryControl).toBeInTheDocument();
    expect(themeToggle).toBeInTheDocument();
  });

  it('renders bullet-marked commentary blocks as semantic lists', () => {
    const { readingTitleRow } = renderSection({
      commentarySource: 'gua',
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
        weeksLabel: '31주(4월 13-19일)',
        weekA: 31,
        weekB: 33,
        ranges: [],
        block: '',
      },
      soulSections: [],
    });

    const commentaryControl = within(readingTitleRow).getByRole('radiogroup', { name: '해설 선택' });
    fireEvent.click(within(commentaryControl).getByRole('radio', { name: '괘사' }));

    const commentaryList = screen.getByRole('list');
    const firstListItem = within(commentaryList).getAllByRole('listitem')[0];

    expect(screen.getByText('Gua List Heading')).toBeInTheDocument();
    expect(commentaryList).toHaveClass('list-disc');
    expect(within(commentaryList).getAllByRole('listitem')).toHaveLength(3);
    expect(firstListItem).not.toHaveClass("before:content-['勇?]");
    expect(screen.getByText('First list item')).toBeInTheDocument();
    expect(screen.getByText('Second list item')).toBeInTheDocument();
    expect(screen.getByText('Third list item')).toBeInTheDocument();
    expect(screen.queryByText('[[item]] First list item')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders plain commentary prose without forcing a table', () => {
    renderSection({
      commentarySource: 'yao',
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
        weeksLabel: '31주(4월 13-19일)',
        weekA: 31,
        weekB: 33,
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
      commentarySource: 'yao',
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
        weeksLabel: '31주(4월 13-19일)',
        weekA: 31,
        weekB: 33,
        ranges: [],
        block: '',
      },
      soulSections: [],
    });

    const commentaryReadingBody = screen.getByTestId('commentary-reading-body');
    const commentaryBody = commentaryReadingBody.nextElementSibling as HTMLElement;

    expect(commentaryReadingBody).toHaveTextContent('Body text');
    expect(commentaryBody).toHaveTextContent('Pipe prose | should stay plain text');
    expect(commentaryBody).toHaveTextContent('still prose with a second line | and punctuation');
    expect(within(commentaryBody).queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
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
        weeksLabel: '31주(4월 13-19일)',
        weekA: 31,
        weekB: 33,
        ranges: [],
        block: '',
      },
      soulSections: [],
    });

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 4, name: 'Commentary' })).not.toBeInTheDocument();
    expect(screen.getByText('Commentary is not available for this selection yet.')).toBeInTheDocument();
  });
});



