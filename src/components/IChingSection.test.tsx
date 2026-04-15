import { fireEvent, render, screen, within } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { IChingSection } from './IChingSection.tsx';
import type { CommentarySource } from '../types';

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

describe('IChingSection', () => {
  it('renders an empty-state message when there is no passage', () => {
    render(<IChingSection yaoNum={null} guaNum={null} guaData={null} yaoData={null} />);

    expect(
      screen.getByText((content, element) => element?.tagName === 'P' && content.length > 0),
    ).toBeInTheDocument();
  });

  it('renders pipe-delimited commentary as a semantic table', () => {
    render(
      <IChingSection
        commentarySource="gua"
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
          weeksLabel: 'Weeks 31-33',
          weekA: 31,
          weekB: 33,
          ranges: [],
          block: '',
        }}
        soulSections={[
          {
            week: 31,
            range: '4/13 - 4/19',
            text: 'Soul heading\nSoul body',
          },
        ]}
      />,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    const readingTopUnit = screen.getByTestId('reading-top-unit');
    const readingVerseUnit = screen.getByTestId('reading-verse-unit');
    const verseLayout = within(readingVerseUnit).getByTestId('verse-layout');
    const verseTopRow = within(readingVerseUnit).getByTestId('verse-top-row');
    const verseBody = within(readingVerseUnit).getByTestId('verse-body');
    const verseTopChildren = Array.from(verseTopRow.children) as HTMLElement[];
    const verseLead = verseTopChildren[0]!;
    const verseSigil = verseTopChildren[1]!;

    expect(within(readingTopUnit).getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(within(readingTopUnit).getByText('Anamil explanation')).toBeInTheDocument();
    expect(within(readingTopUnit).queryByRole('img', { name: 'sigil 33' })).not.toBeInTheDocument();
    expect(within(readingTopUnit).queryByTestId('reading-gua-meta')).not.toBeInTheDocument();
    expect(within(readingTopUnit).queryByTestId('verse-body')).not.toBeInTheDocument();
    expect(verseLead).toContainElement(within(verseLead).getByRole('heading', { level: 4, name: '33. Example' }));
    expect(verseLead).toContainElement(within(verseLead).getByText('Short reading'));
    expect(verseSigil).toContainElement(within(verseSigil).getByRole('img', { name: 'sigil 33' }));
    expect(verseTopChildren).toHaveLength(2);
    expect(verseTopRow).toHaveClass('md:items-center');
    expect(within(readingVerseUnit).queryByTestId('reading-gua-meta')).not.toBeInTheDocument();
    expect(verseLayout).toBeInTheDocument();
    expect(verseTopRow).toBeInTheDocument();
    expect(verseBody).toHaveTextContent('Body text');
    expect(verseBody).toHaveClass('w-full');
    expect(verseBody.parentElement).toBe(verseLayout);
    expect(verseBody.closest('[data-testid="verse-top-row"]')).toBeNull();
    expect(verseBody).not.toHaveTextContent('Short reading');

    expect(screen.getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(screen.queryByText('Reading Summary')).not.toBeInTheDocument();
    expect(screen.queryByText('Current Line')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 4, name: 'Commentary' })).not.toBeInTheDocument();
    expect(screen.getByText('Gua Heading')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Col A' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'B1' })).toBeInTheDocument();
    expect(screen.getByText('Commentary body')).toBeInTheDocument();
    expect(screen.queryAllByText("Rudolf Steiner's Calendar of the Soul")).toHaveLength(1);
    expect(screen.getByRole('article')).toHaveTextContent("Rudolf Steiner's Calendar of the Soul");
  });

  it('renders bullet-marked commentary blocks as semantic lists', () => {
    render(
      <IChingSection
        commentarySource="gua"
        yaoNum={33}
        guaNum={8}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '33. Example',
          short: 'Short reading',
          body: 'Body text',
        }}
        hitSoulGroup={{
          titleLine: '31. Example Soul Group',
          weeksLabel: 'Weeks 31-33',
          weekA: 31,
          weekB: 33,
          ranges: [],
          block: '',
        }}
        soulSections={[]}
      />,
    );

    const commentaryList = screen.getByRole('list');

    expect(screen.getByText('Gua List Heading')).toBeInTheDocument();
    expect(commentaryList).toBeInTheDocument();
    expect(within(commentaryList).getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('First list item')).toBeInTheDocument();
    expect(screen.getByText('Second list item')).toBeInTheDocument();
    expect(screen.getByText('Third list item')).toBeInTheDocument();
    expect(screen.queryByText('[[item]] First list item')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders plain commentary prose without forcing a table', () => {
    render(
      <IChingSection
        commentarySource="yao"
        yaoNum={33}
        guaNum={6}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '33. Example',
          short: 'Short reading',
          body: 'Body text',
        }}
        hitSoulGroup={{
          titleLine: '31. Example Soul Group',
          weeksLabel: 'Weeks 31-33',
          weekA: 31,
          weekB: 33,
          ranges: [],
          block: '',
        }}
        soulSections={[]}
      />,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByText('Yao Heading')).toBeInTheDocument();
    expect(screen.getByText('Plain prose commentary body')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('keeps pipe-heavy prose as a paragraph when it is not a real table', () => {
    render(
      <IChingSection
        commentarySource="yao"
        yaoNum={34}
        guaNum={6}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '34. Example',
          short: 'Short reading',
          body: 'Body text',
        }}
        hitSoulGroup={{
          titleLine: '31. Example Soul Group',
          weeksLabel: 'Weeks 31-33',
          weekA: 31,
          weekB: 33,
          ranges: [],
          block: '',
        }}
        soulSections={[]}
      />,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    const commentaryHeading = screen.getByRole('heading', { level: 5, name: 'Yao Heading' });
    const commentaryBody = commentaryHeading.nextElementSibling as HTMLElement;

    expect(commentaryBody).toHaveTextContent('Pipe prose | should stay plain text');
    expect(commentaryBody).toHaveTextContent('still prose with a second line | and punctuation');
    expect(within(commentaryBody).queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('keeps the commentary shell visible when commentary is missing', () => {
    render(
      <IChingSection
        yaoNum={999}
        guaNum={999}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '999. Example',
          short: 'Short reading',
          body: 'Body text',
        }}
        hitSoulGroup={{
          titleLine: '31. Example Soul Group',
          weeksLabel: 'Weeks 31-33',
          weekA: 31,
          weekB: 33,
          ranges: [],
          block: '',
        }}
        soulSections={[]}
      />,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 4, name: 'Commentary' })).not.toBeInTheDocument();
    expect(screen.getByText('Commentary is not available for this selection yet.')).toBeInTheDocument();
  });

  it('switches the rendered commentary source when the toggle is used', () => {
    function CommentaryToggleHarness() {
      const [commentarySource, setCommentarySource] = useState<CommentarySource>('yao');

      return (
        <IChingSection
          commentarySource={commentarySource}
          onCommentarySourceChange={setCommentarySource}
          yaoNum={33}
          guaNum={6}
          guaData={{ header: '62. Example', meta: 'Example meta' }}
          yaoData={{
            titleLine: '33. Example',
            short: 'Short reading',
            body: 'Body text',
          }}
          hitSoulGroup={{
            titleLine: '31. Example Soul Group',
            weeksLabel: 'Weeks 31-33',
            weekA: 31,
            weekB: 33,
            ranges: [],
            block: '',
          }}
          soulSections={[]}
        />
      );
    }

    render(<CommentaryToggleHarness />);

    expect(screen.getByText('Yao Heading')).toBeInTheDocument();
    expect(screen.getByText('Plain prose commentary body')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();

    const [firstToggleButton] = screen.getAllByRole('button');
    fireEvent.click(firstToggleButton);

    expect(screen.getByText('Gua Heading')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'B2' })).toBeInTheDocument();
    expect(screen.queryByText('Yao Heading')).not.toBeInTheDocument();
  });
});
