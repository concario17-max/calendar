import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MainContent } from './MainContent.tsx';
import { IChingSection } from './IChingSection.tsx';
import type { GuaData, YaoData } from '../types';

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

  const guaKeywordNoImageCommentary = [
    'Gua Keyword No Image Heading',
    '',
    '🔑 핵심 키워드: 테스트, 비어 있음',
    '',
    'General commentary body',
  ].join('\n');

  const guaNestedListCommentary = [
    'Gua Nested List Heading',
    '',
    '🍎 스스로 구하는 입의 열매',
    '',
    '[list]]',
    '[item]] 자구구실의 실천',
    '[list]]',
    '[item]] 나무 아래 누워 감이 떨어지길 기다리지 않기',
    '[item]] 직접 가지를 흔들고 땀을 흘려 결실을 얻기',
    '[/list]]',
    '[item]] 업의 법칙 준수',
    '[list]]',
    '[item]] 결과는 오직 네 행동에서만 비롯됨을 인정하기',
    '[item]] 예외 없는 원인과 결과의 세계를 명확히 인지하기',
    '[/list]]',
    '[/list]]',
  ].join('\n');

  const yaoKeywordCommentary = [
    'Yao Keyword Heading',
    '',
    '🔑 핵심 키워드: 아스파딧, 승리, 확장',
    '',
    'Yao keyword commentary body',
  ].join('\n');

  const yaoProseCommentary = ['Yao Heading', 'Plain prose commentary body'].join('\n');
  const yaoPipeProseCommentary = [
    'Yao Heading',
    'Pipe prose | should stay plain text',
    'still prose with a second line | and punctuation',
  ].join('\n');
  const bonusGuaCommentary1 = ['1. Bonus Gua 1', '', 'Bonus gua 1 commentary body'].join('\n');
  const bonusGuaCommentary4 = ['4. Bonus Gua 4', '', 'Bonus gua 4 commentary body'].join('\n');
  const bonusYaoCommentary1 = ['1. Bonus Yao 1', 'Bonus yao 1 commentary body'].join('\n');
  const bonusYaoCommentary24 = ['24. Bonus Yao 24', 'Bonus yao 24 commentary body'].join('\n');

  return {
    getGuaCommentary: (num: number | null) => {
      if (num === 1) {
        return bonusGuaCommentary1;
      }

      if (num === 4) {
        return bonusGuaCommentary4;
      }

      if (num === 6) {
        return guaCommentary;
      }

      if (num === 8) {
        return guaListCommentary;
      }

      if (num === 10) {
        return guaKeywordCommentary;
      }

      if (num === 66) {
        return guaKeywordNoImageCommentary;
      }

      if (num === 12) {
        return guaNestedListCommentary;
      }

      return undefined;
    },
    getBonusGuaCommentary: (num: number | null) => {
      if (num === 1) {
        return bonusGuaCommentary1;
      }

      if (num === 4) {
        return bonusGuaCommentary4;
      }

      return undefined;
    },
    getYaoCommentary: (num: number | null) => {
      if (num === 1) {
        return bonusYaoCommentary1;
      }

      if (num === 24) {
        return bonusYaoCommentary24;
      }

      if (num === 33) {
        return yaoProseCommentary;
      }

      if (num === 34) {
        return yaoPipeProseCommentary;
      }

      if (num === 59) {
        return yaoKeywordCommentary;
      }

      return undefined;
    },
    getBonusYaoCommentary: (num: number | null) => {
      if (num === 1) {
        return bonusYaoCommentary1;
      }

      if (num === 24) {
        return bonusYaoCommentary24;
      }

      return undefined;
    },
  };
});

type BonusGuaItemFixture = {
  num: number;
  guaData: GuaData;
};

type BonusYaoItemFixture = {
  num: number;
  yaoData: YaoData;
};

type BonusSectionProps = React.ComponentProps<typeof IChingSection> & {
  bonusGuaItems?: BonusGuaItemFixture[];
  bonusYaoItems?: BonusYaoItemFixture[];
};

const bonusGuaItemsContract = Array.from({ length: 4 }, (_, index) => {
  const num = index + 1;

  return {
    num,
    guaData: {
      header: `${num}. Bonus Gua ${num}`,
      meta: `Bonus gua meta ${num}`,
    },
  };
});

const bonusYaoItemsContract = Array.from({ length: 24 }, (_, index) => {
  const num = index + 1;

  return {
    num,
    yaoData: {
      titleLine: `${num}. Bonus Yao ${num}`,
      short: `Bonus yao short ${num}`,
      body: `Bonus yao body ${num}`,
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
    readingSoulTitleUnit: screen.getByTestId('reading-soul-title-unit'),
  };
}

function renderBonusSection(overrides?: Partial<BonusSectionProps>) {
  const BonusIChingSection = IChingSection as React.ComponentType<BonusSectionProps>;

  const view = render(
    <BonusIChingSection
      commentarySource="gua"
      yaoNum={33}
      guaNum={6}
      guaData={{ header: '62. Example', meta: 'Anamil explanation' }}
      yaoData={{
        titleLine: '33. Example',
        short: 'Short reading',
        body: 'Body text',
      }}
      bonusGuaItems={bonusGuaItemsContract}
      bonusYaoItems={bonusYaoItemsContract}
      {...overrides}
    />,
  );

  return {
    container: view.container,
    leftPanel: screen.getAllByRole('article')[0],
    rightPanel: screen.getByRole('complementary'),
    rerender: view.rerender,
  };
}

describe('IChingSection', () => {
  it('renders an empty-state message when there is no passage', () => {
    render(<IChingSection yaoNum={null} guaNum={null} guaData={null} yaoData={null} />);

    expect(screen.getByText('Reading data is not available yet.')).toBeInTheDocument();
  });

  it('renders the reading shell without legacy rail labels or shell chrome controls', () => {
    const { container, leftPanel, rightPanel } = renderSection();
    const readingVerseUnit = screen.getByTestId('reading-verse-unit');

    const main = screen.getByRole('main');
    const shell = container.querySelector('section');
    const grid = container.querySelector('section > div');
    const shellFrame = container.querySelector('.curated-shell__frame');

    expect(main).toHaveClass('min-h-dvh', 'overflow-y-auto', 'lg:h-[100dvh]', 'lg:overflow-hidden');
    expect(main).not.toHaveClass('md:overflow-hidden');
    expect(shell).toHaveClass('flex', 'w-full', 'flex-1', 'flex-col');
    expect(grid).toHaveClass('flex', 'flex-col', 'gap-5', 'lg:grid', 'lg:grid-cols-[336px_minmax(0,1fr)]');
    expect(shellFrame).toHaveClass('flex', 'min-h-0', 'flex-1', 'flex-col', 'overflow-visible', 'lg:overflow-hidden');
    expect(leftPanel).toHaveClass('flex', 'w-full');
    expect(leftPanel).toHaveClass('lg:sticky', 'lg:top-0', 'lg:overflow-y-auto', 'lg:min-w-[320px]');
    expect(leftPanel).toHaveClass('bg-[#f2eadc]');
    expect(leftPanel).not.toHaveClass('border-r');
    expect(rightPanel).toHaveClass('flex', 'w-full', 'min-w-0', 'flex-col');
    expect(rightPanel).toHaveClass('lg:overflow-y-auto');
    expect(rightPanel).toHaveClass('bg-[#fbf8f1]');

    expect(screen.queryByText('Manifesto')).not.toBeInTheDocument();
    expect(screen.queryByText('Reading rail')).not.toBeInTheDocument();
    expect(screen.queryByText('Commentary')).not.toBeInTheDocument();
    expect(readingVerseUnit).toBeInTheDocument();
    expect(readingVerseUnit).toHaveClass('pl-5', 'md:pl-6');
    expect(screen.getByTestId('learning-comic-image').closest('figure')).toHaveClass('max-w-[56rem]');
    expect(screen.queryByText('Reading canvas')).not.toBeInTheDocument();
  });

  it('keeps the commentary control in the header and preserves the left rail content', () => {
    const {
      leftPanel,
      rightPanel,
      readingTopUnit,
      readingVerseUnit,
      readingSigilUnit,
      readingSoulTitleUnit,
    } = renderSection();

    const commentaryControl = screen.getByRole('radiogroup');
    const yaoRadio = screen.getByDisplayValue('yao');
    const guaRadio = screen.getByDisplayValue('gua');
    const soulRadio = screen.getByDisplayValue('soul');

    expect(commentaryControl).toBeInTheDocument();
    expect(yaoRadio).toHaveAttribute('value', 'yao');
    expect(guaRadio).toHaveAttribute('value', 'gua');
    expect(soulRadio).toHaveAttribute('value', 'soul');
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Toggle theme' })).not.toBeInTheDocument();

    expect(within(readingSigilUnit).getByRole('img', { name: 'sigil 33' })).toBeInTheDocument();
    expect(readingVerseUnit.querySelector('p')).toHaveClass('px-1.5', 'tracking-[0.14em]');
    expect(readingTopUnit.querySelector('p')).toHaveClass('px-1.5', 'tracking-[0.14em]');
    expect(readingSoulTitleUnit.querySelector('p')).toHaveClass('px-1.5', 'tracking-[0.14em]');
    expect(
      within(leftPanel).getByRole('heading', { level: 2, name: "Rudolf Steiner's Calendar of the Soul" }),
    ).toBeInTheDocument();
    expect(within(leftPanel).getByText('50주(3월 16일-22일) · 3주(4월 21일-27일)')).toBeInTheDocument();
    expect(within(rightPanel).queryByText("Rudolf Steiner's Calendar of the Soul")).not.toBeInTheDocument();
    expect(screen.getByTestId('commentary-comic-toggle')).toBeInTheDocument();
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
    expect(screen.getByTestId('learning-comic-view')).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('33.png'));
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
    expect(within(leftPanel).queryByText('Manifesto')).not.toBeInTheDocument();
    expect(within(rightPanel).queryByText('Reading canvas')).not.toBeInTheDocument();

    fireEvent.click(guaRadio);
    expect(screen.getByTestId('learning-comic-view')).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('6.png'));
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
    expect(screen.getByTestId('commentary-comic-toggle')).toBeInTheDocument();

    fireEvent.click(soulRadio);
    expect(
      within(rightPanel).getByRole('heading', { level: 2, name: "Rudolf Steiner's Calendar of the Soul" }),
    ).toBeInTheDocument();
    expect(within(rightPanel).queryByText('2 blocks')).not.toBeInTheDocument();
    expect(within(rightPanel).getByText('50주').closest('article')).toHaveTextContent('Soul body');
    expect(within(rightPanel).queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
    expect(within(rightPanel).queryByTestId('commentary-comic-toggle')).not.toBeInTheDocument();
    expect(screen.queryByText('Body text')).not.toBeInTheDocument();
  });

  it('renders bonus 괘사 selections from the real 1..4 contract and keeps commentary tied to the gua source', () => {
    renderBonusSection({ commentarySource: 'gua' });

    const bonusSelector = screen.getByTestId('bonus-reading-selector');
    const leftPanel = screen.getAllByRole('article')[0];
    const guaButtons = within(bonusSelector).getAllByRole('button');

    expect(bonusSelector).toHaveTextContent('보너스 괘사');
    expect(bonusSelector).toHaveTextContent('4개');
    expect(guaButtons).toHaveLength(4);
    expect(guaButtons.map((button) => button.textContent?.trim())).toEqual([
      '1. Bonus Gua 1',
      '2. Bonus Gua 2',
      '3. Bonus Gua 3',
      '4. Bonus Gua 4',
    ]);
    expect(guaButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(guaButtons[3]).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('1.png'));
    expect(screen.getByRole('img', { name: '보너스 괘사 학습 이미지 1' })).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute(
      'src',
      expect.stringContaining('%EB%B3%B4%EB%84%88%EC%8A%A4'),
    );

    fireEvent.click(guaButtons[3]);

    expect(guaButtons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(guaButtons[3]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('4.png'));
    expect(screen.getByRole('img', { name: '보너스 괘사 학습 이미지 4' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

    expect(screen.queryByTestId('learning-comic-view')).not.toBeInTheDocument();
    expect(screen.getByText('Bonus gua 4 commentary body')).toBeInTheDocument();
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
    expect(within(leftPanel).getByRole('button', { name: '4. Bonus Gua 4' })).toBeInTheDocument();
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

    fireEvent.click(screen.getByDisplayValue('gua'));
    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

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

  it('renders nested marker lists even when the source uses single-bracket marker variants', () => {
    renderSection({
      yaoNum: 33,
      guaNum: 12,
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

    fireEvent.click(screen.getByDisplayValue('gua'));
    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

    const commentaryLists = screen.getAllByRole('list');
    const topLevelList = commentaryLists[0];
    const firstTopLevelItem = within(topLevelList).getByText('자구구실의 실천').closest('li');
    const secondTopLevelItem = within(topLevelList).getByText('업의 법칙 준수').closest('li');

    expect(screen.getByText('Gua Nested List Heading')).toBeInTheDocument();
    expect(screen.getByText('🍎 스스로 구하는 입의 열매')).toBeInTheDocument();
    expect(commentaryLists.length).toBeGreaterThan(1);
    expect(firstTopLevelItem).not.toBeNull();
    expect(secondTopLevelItem).not.toBeNull();
    expect(firstTopLevelItem?.querySelector('ul')).not.toBeNull();
    expect(secondTopLevelItem?.querySelector('ul')).not.toBeNull();
    expect(screen.getByText('나무 아래 누워 감이 떨어지길 기다리지 않기')).toBeInTheDocument();
    expect(screen.getByText('직접 가지를 흔들고 땀을 흘려 결실을 얻기')).toBeInTheDocument();
    expect(screen.getByText('결과는 오직 네 행동에서만 비롯됨을 인정하기')).toBeInTheDocument();
    expect(screen.getByText('예외 없는 원인과 결과의 세계를 명확히 인지하기')).toBeInTheDocument();
    expect(screen.queryByText('[item]] 자구구실의 실천')).not.toBeInTheDocument();
    expect(screen.queryByText('[list]]')).not.toBeInTheDocument();
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

    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

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

    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

    const commentaryReadingBody = screen.getByTestId('commentary-reading-body');
    const commentaryBody = screen.getByTestId('commentary-block-0');

    expect(commentaryReadingBody).toHaveTextContent('Body text');
    expect(commentaryBody).toHaveTextContent('Pipe prose | should stay plain text');
    expect(commentaryBody).toHaveTextContent('still prose with a second line | and punctuation');
    expect(within(commentaryBody).queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('shows a 괘사 comic toggle and switches the lower commentary area to the image view', () => {
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

    fireEvent.click(screen.getByDisplayValue('gua'));

    const comicToggle = screen.getByTestId('commentary-comic-toggle');

    expect(comicToggle).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-view')).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('10.png'));
    expect(screen.getByRole('img', { name: '괘사 학습 이미지 10' })).toBeInTheDocument();
    expect(screen.getByTestId('commentary-folio')).toHaveClass('border-0', 'bg-transparent', 'px-0', 'py-0', 'shadow-none');
    expect(screen.getByTestId('learning-comic-view')).toHaveClass('-mx-4', '-my-4', 'px-0', 'py-0', 'sm:rounded-[1.5rem]');
    expect(screen.getByTestId('learning-comic-image')).toHaveClass('w-full', 'object-contain', 'sm:border');
    expect(comicToggle).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByText('General commentary body')).not.toBeInTheDocument();
    expect(screen.queryByTestId('commentary-keyword-line')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

    expect(screen.queryByTestId('learning-comic-view')).not.toBeInTheDocument();
    const keywordLine = screen.getByTestId('commentary-keyword-line');
    const commentaryBody = screen.getByText('General commentary body').closest('p');
    expect(keywordLine).toHaveTextContent('🔑 핵심 키워드:');
    expect(keywordLine).toHaveClass('bg-[#f4eadc]', 'text-[#4b3b29]');
    expect(commentaryBody).not.toHaveClass('bg-[#f4eadc]');
    expect(commentaryBody).not.toHaveClass('text-[#4b3b29]');
    expect(screen.getByText('General commentary body')).toBeInTheDocument();
    expect(screen.getByTestId('commentary-keyword-line')).toBeInTheDocument();
  });

  it('renders bonus 효사 selections from the real 1..24 contract and keeps commentary tied to the yao source', () => {
    renderBonusSection({ commentarySource: 'yao' });

    const bonusSelector = screen.getByTestId('bonus-reading-selector');
    const leftPanel = screen.getAllByRole('article')[0];
    const yaoButtons = within(bonusSelector).getAllByRole('button');

    expect(bonusSelector).toHaveTextContent('보너스 효사');
    expect(bonusSelector).toHaveTextContent('24개');
    expect(yaoButtons).toHaveLength(24);
    expect(yaoButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(yaoButtons[23]).toHaveAttribute('aria-pressed', 'false');
    expect(yaoButtons[0]).toHaveTextContent('1. Bonus Yao 1');
    expect(yaoButtons[23]).toHaveTextContent('24. Bonus Yao 24');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('1.png'));
    expect(screen.getByRole('img', { name: '보너스 효사 학습 이미지 1' })).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute(
      'src',
      expect.stringContaining('%EB%B3%B4%EB%84%88%EC%8A%A4'),
    );

    fireEvent.click(yaoButtons[23]);

    expect(yaoButtons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(yaoButtons[23]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('24.png'));
    expect(screen.getByRole('img', { name: '보너스 효사 학습 이미지 24' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

    expect(screen.queryByTestId('learning-comic-view')).not.toBeInTheDocument();
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
    expect(screen.getByText('Bonus yao 24 commentary body')).toBeInTheDocument();
    expect(within(leftPanel).getByRole('button', { name: '24. Bonus Yao 24' })).toBeInTheDocument();
  });

  it('shows a 효사 comic toggle and switches the lower commentary area to the image view', () => {
    renderSection({
      yaoNum: 59,
      guaNum: 6,
      guaData: { header: '62. Example', meta: 'Example meta' },
      yaoData: {
        titleLine: '59. Example',
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

    const comicToggle = screen.getByTestId('commentary-comic-toggle');

    expect(comicToggle).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-view')).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-image')).toHaveAttribute('src', expect.stringContaining('59.png'));
    expect(screen.getByRole('img', { name: '효사 학습 이미지 59' })).toBeInTheDocument();
    expect(comicToggle).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByTestId('commentary-reading-body')).not.toBeInTheDocument();
    expect(screen.queryByText('Yao keyword commentary body')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

    expect(screen.getByTestId('commentary-reading-body')).toHaveTextContent('Body text');
    expect(screen.getByText('Yao keyword commentary body')).toBeInTheDocument();
  });

  it('shows an empty comic state when no matching image file exists', () => {
    renderSection({
      yaoNum: 33,
      guaNum: 66,
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

    fireEvent.click(screen.getByDisplayValue('gua'));

    expect(screen.getByTestId('commentary-comic-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('learning-comic-empty-state')).toBeInTheDocument();
    expect(screen.getByText('아직 업로드된 만화 이미지가 없다')).toBeInTheDocument();
    expect(screen.queryByText('General commentary body')).not.toBeInTheDocument();
    expect(screen.queryByTestId('commentary-keyword-line')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '텍스트 해설 보기' }));

    expect(screen.getByText('General commentary body')).toBeInTheDocument();
    expect(screen.getByTestId('commentary-keyword-line')).toBeInTheDocument();
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





