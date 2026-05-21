import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { IChingSection } from './IChingSection.tsx';
import type { GuaData, YaoData } from '../types';

vi.mock('../utils/readingDataLoader', () => ({
  loadReadingDataBundle: async () => ({
    GUA_TEXT: [
      '6. Example Gua',
      'Example gua meta',
      '',
      '8. Example Gua',
      'Example gua meta 8',
      '',
      '10. Example Gua',
      'Example gua meta 10',
      '',
      '12. Example Gua',
      'Example gua meta 12',
      '',
      '66. Example Gua',
      'Example gua meta 66',
    ].join('\n'),
    YAO_TEXT: [
      '33. Example Yao',
      'Short reading',
      '',
      'Body text',
      '',
      '34. Example Yao',
      'Short reading 34',
      '',
      'Body text 34',
      '',
      '59. Example Yao',
      'Short reading 59',
      '',
      'Body text 59',
    ].join('\n'),
    SOUL_TEXT: '',
    getGuaCommentary: (num: number | null) => {
      if (num === 6) {
        return [
          'Gua Heading',
          '',
          'Col A | Col B | Col C',
          'A1 | B1 | C1',
          'A2 | B2 | C2',
          '',
          'Commentary body',
        ].join('\n');
      }

      if (num === 8) {
        return [
          'Gua List Heading',
          '',
          '[[list]]',
          '[[item]] First list item',
          '[[item]] Second list item',
          '[[item]] Third list item',
          '[[/list]]',
        ].join('\n');
      }

      if (num === 10) {
        return [
          'Gua Keyword Heading',
          '',
          'Core keywords line',
          '',
          'General commentary body',
        ].join('\n');
      }

      if (num === 12) {
        return [
          'Gua Nested List Heading',
          '',
          'Nested list intro',
          '',
          '[list]]',
          '[item]] First nested item',
          '[list]]',
          '[item]] Nested child one',
          '[item]] Nested child two',
          '[/list]]',
          '[item]] Second nested item',
          '[list]]',
          '[item]] Another child one',
          '[item]] Another child two',
          '[/list]]',
          '[/list]]',
        ].join('\n');
      }

      if (num === 66) {
        return [
          'Gua Keyword No Image Heading',
          '',
          'No-image keyword line',
          '',
          'General commentary body',
        ].join('\n');
      }

      if (num === 10) {
        return [
          'Gua Keyword Heading',
          '',
          'Core keywords line',
          '',
          'General commentary body',
        ].join('\n');
      }

      if (typeof num === 'number' && num >= 1 && num <= 4) {
        return [`${num}. Bonus Gua ${num}`, '', `Bonus gua ${num} commentary body`].join('\n');
      }

      return undefined;
    },
    getYaoCommentary: (num: number | null) => {
      if (num === 33) {
        return ['Yao Heading', 'Plain prose commentary body'].join('\n');
      }

      if (num === 34) {
        return [
          'Yao Heading',
          'Pipe prose | should stay plain text',
          'still prose with a second line | and punctuation',
        ].join('\n');
      }

      if (num === 59) {
        return [
          'Yao Keyword Heading',
          '',
          'Core keywords line',
          '',
          'Yao keyword commentary body',
        ].join('\n');
      }

      if (num === 1) {
        return ['1. Bonus Yao 1', 'Bonus yao 1 commentary body'].join('\n');
      }

      if (num === 24) {
        return ['24. Bonus Yao 24', 'Bonus yao 24 commentary body'].join('\n');
      }

      if (typeof num === 'number' && num >= 1 && num <= 24) {
        return [`${num}. Bonus Yao ${num}`, `Bonus yao ${num} commentary body`].join('\n');
      }

      return undefined;
    },
    getBonusGuaCommentary: (num: number | null) => {
      if (num === 1) {
        return ['1. Bonus Gua 1', '', 'Bonus gua 1 commentary body'].join('\n');
      }

      if (num === 4) {
        return ['4. Bonus Gua 4', '', 'Bonus gua 4 commentary body'].join('\n');
      }

      return undefined;
    },
    getBonusYaoCommentary: (num: number | null) => {
      if (num === 1) {
        return ['1. Bonus Yao 1', 'Bonus yao 1 commentary body'].join('\n');
      }

      if (num === 24) {
        return ['24. Bonus Yao 24', 'Bonus yao 24 commentary body'].join('\n');
      }

      return undefined;
    },
  }),
}));

type BonusGuaItemFixture = {
  num: number;
  guaData: GuaData;
  commentary?: string;
  label?: string;
  dateLabel?: string;
  id?: string;
};

type BonusYaoItemFixture = {
  num: number;
  yaoData: YaoData;
  commentary?: string;
  label?: string;
  dateLabel?: string;
  id?: string;
};

type IChingSectionProps = ComponentProps<typeof IChingSection>;

function renderSection(overrides?: Partial<IChingSectionProps>) {
  return render(
    <IChingSection
      commentarySource="gua"
      yaoNum={33}
      guaNum={6}
      guaData={{ header: '6. Example Gua', meta: 'Example gua meta' }}
      yaoData={{ titleLine: '33. Example Yao', short: 'Short reading', body: 'Body text' }}
      {...overrides}
    />,
  );
}

async function waitForCommentaryReady() {
  await waitFor(() => {
    expect(screen.getByTestId('commentary-comic-toggle')).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByTestId('learning-comic-loading-state')).not.toBeInTheDocument();
  });
}

function makeBonusGuaItems(): BonusGuaItemFixture[] {
  return Array.from({ length: 4 }, (_, index) => {
    const num = index + 1;
    return {
      num,
      guaData: {
        header: `${num}. Bonus Gua ${num}`,
        meta: `Bonus gua meta ${num}`,
      },
      commentary: `${num}. Bonus Gua ${num}\n\nBonus gua ${num} commentary body`,
    };
  });
}

function makeBonusYaoItems(): BonusYaoItemFixture[] {
  return Array.from({ length: 24 }, (_, index) => {
    const num = index + 1;
    return {
      num,
      yaoData: {
        titleLine: `${num}. Bonus Yao ${num}`,
        short: `Bonus yao short ${num}`,
        body: `Bonus yao body ${num}`,
      },
      commentary: `${num}. Bonus Yao ${num}\nBonus yao ${num} commentary body`,
    };
  });
}

describe('IChingSection', () => {
  it('loads leaf-module data asynchronously and keeps the regular gua flow intact', async () => {
    renderSection();

    await waitForCommentaryReady();

    expect(screen.getByTestId('commentary-comic-toggle')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('6.png'));
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('commentary-comic-toggle'));

    expect(screen.queryByTestId('learning-comic-view')).not.toBeInTheDocument();
    expect(screen.getByText('Gua Heading')).toBeInTheDocument();
    expect(screen.getByText('Commentary body')).toBeInTheDocument();
  });

  it('keeps the regular yao text body and comic toggle behavior unchanged', async () => {
    renderSection({
      commentarySource: 'yao',
      yaoNum: 59,
      yaoData: {
        titleLine: '59. Example Yao',
        short: 'Short reading',
        body: 'Body text',
      },
    });

    await waitForCommentaryReady();

    expect(screen.getByTestId('commentary-comic-toggle')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('59.png'));
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('commentary-comic-toggle'));

    expect(screen.getByTestId('commentary-reading-body')).toHaveTextContent('Body text');
    expect(screen.getByText('Yao Keyword Heading')).toBeInTheDocument();
    expect(screen.getByText('Yao keyword commentary body')).toBeInTheDocument();
  });

  it('renders commentary lists the same way after the leaf-module load', async () => {
    renderSection({
      guaNum: 8,
      yaoNum: 33,
      guaData: { header: '8. Example Gua', meta: 'Example gua meta' },
    });

    await waitForCommentaryReady();
    fireEvent.click(screen.getByTestId('commentary-comic-toggle'));

    const commentaryList = screen.getByRole('list');

    expect(screen.getByText('Gua List Heading')).toBeInTheDocument();
    expect(commentaryList).toBeInTheDocument();
    expect(within(commentaryList).getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('First list item')).toBeInTheDocument();
    expect(screen.getByText('Second list item')).toBeInTheDocument();
    expect(screen.getByText('Third list item')).toBeInTheDocument();
  });

  it('keeps the bonus gua selector and fallback commentary flow unchanged', async () => {
    renderSection({
      commentarySource: 'gua',
      guaNum: 6,
      bonusGuaItems: makeBonusGuaItems(),
    });

    await waitForCommentaryReady();

    const bonusSelector = screen.getByTestId('bonus-reading-selector');
    const bonusButtons = within(bonusSelector).getAllByRole('button');

    expect(bonusButtons).toHaveLength(4);
    expect(bonusButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute(
      'src',
      expect.stringContaining('%EB%B3%B4%EB%84%88%EC%8A%A4'),
    );

    fireEvent.click(bonusButtons[3]);

    await waitForCommentaryReady();
    expect(bonusButtons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(bonusButtons[3]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('4.png'));

    fireEvent.click(screen.getByTestId('commentary-comic-toggle'));

    expect(screen.getByText('Bonus gua 4 commentary body')).toBeInTheDocument();
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
  });

  it('keeps the bonus yao selector and text fallback behavior unchanged', async () => {
    renderSection({
      commentarySource: 'yao',
      yaoNum: 59,
      bonusYaoItems: makeBonusYaoItems(),
    });

    await waitForCommentaryReady();

    const bonusSelector = screen.getByTestId('bonus-reading-selector');
    const bonusButtons = within(bonusSelector).getAllByRole('button');

    expect(bonusButtons).toHaveLength(24);
    expect(bonusButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute(
      'src',
      expect.stringContaining('%EB%B3%B4%EB%84%88%EC%8A%A4'),
    );

    fireEvent.click(bonusButtons[23]);

    await waitForCommentaryReady();
    expect(bonusButtons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(bonusButtons[23]).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByTestId('commentary-comic-toggle'));

    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
    expect(screen.getByText('Bonus yao 24 commentary body')).toBeInTheDocument();
  });

  it('keeps the empty comic state and missing commentary shell unchanged', async () => {
    const emptyComicView = renderSection({
      commentarySource: 'gua',
      guaNum: 66,
      yaoNum: 33,
      guaData: { header: '66. Example Gua', meta: 'Example gua meta' },
    });

    await waitForCommentaryReady();

    expect(screen.getByTestId('commentary-comic-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('commentary-folio')).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-empty-state')).toBeInTheDocument();
    expect(screen.getByText('General commentary body')).toBeInTheDocument();

    emptyComicView.unmount();

    renderSection({
      commentarySource: 'gua',
      guaNum: 999,
      yaoNum: 999,
      guaData: { header: '999. Example Gua', meta: 'Example gua meta' },
      yaoData: { titleLine: '999. Example Yao', short: 'Short reading', body: 'Body text' },
    });

    await waitFor(() => {
      expect(screen.getByText('Commentary is not available for this selection yet.')).toBeInTheDocument();
    });
  });
});
