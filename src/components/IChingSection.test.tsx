import { fireEvent, render, screen, within } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { IChingSection } from './IChingSection.tsx';
import type { CommentarySource } from '../types';

describe('IChingSection', () => {
  it('renders an empty-state message when there is no passage', () => {
    render(<IChingSection yaoNum={null} guaData={null} yaoData={null} />);

    expect(screen.getByText('이 날짜는 연간 전환 구간이라 역경 항목이 연결되지 않습니다.')).toBeInTheDocument();
  });

  it('renders pipe-delimited commentary as a semantic table', () => {
    render(
      <IChingSection
        yaoNum={369}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '369. Example',
          short: 'Short reading',
          body: 'Body text',
          commentary: [
            'Commentary heading',
            '',
            '훈련 단계 | 세부 지침 | 기대 효과',
            '인식 단계 | 힘들다고 느껴지는 감정과 마주하기 | 감정의 실체 파악',
            '조절 단계 | 강렬한 느낌을 스스로 통제하려고 노력하기 | 내면의 중심 유지',
            '준비 단계 | 일상의 통제를 통한 기초 체력 확보 | 달마법 실행의 기반 마련',
            '',
            'Commentary body',
          ].join('\n'),
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
    expect(screen.getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(screen.getByText('Short reading')).toBeInTheDocument();
    expect(screen.queryByText('Reading Summary')).not.toBeInTheDocument();
    expect(screen.queryByText('Current Line')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 4, name: 'Commentary' })).not.toBeInTheDocument();
    expect(screen.getByText('Commentary heading')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '훈련 단계' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '감정의 실체 파악' })).toBeInTheDocument();
    expect(screen.getByText('Commentary body')).toBeInTheDocument();
    expect(screen.queryAllByText("Rudolf Steiner's Calendar of the Soul")).toHaveLength(1);
    expect(screen.getByRole('article')).toHaveTextContent("Rudolf Steiner's Calendar of the Soul");
  });

  it('renders plain commentary prose without forcing a table', () => {
    render(
      <IChingSection
        yaoNum={369}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '369. Example',
          short: 'Short reading',
          body: 'Body text',
          commentary: 'Commentary heading\nPlain prose commentary body',
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
    expect(screen.getByText('Commentary heading')).toBeInTheDocument();
    expect(screen.getByText('Plain prose commentary body')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('keeps pipe-heavy prose as a paragraph when it is not a real table', () => {
    render(
      <IChingSection
        yaoNum={369}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '369. Example',
          short: 'Short reading',
          body: 'Body text',
          commentary: 'Commentary heading\nPipe prose | should stay plain text\nstill prose with a second line | and punctuation',
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
    const commentaryHeading = screen.getByRole('heading', { level: 5, name: 'Commentary heading' });
    const commentaryBody = commentaryHeading.nextElementSibling as HTMLElement;

    expect(commentaryBody).toHaveTextContent('Pipe prose | should stay plain text');
    expect(commentaryBody).toHaveTextContent('still prose with a second line | and punctuation');
    expect(within(commentaryBody).queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('keeps the commentary shell visible when commentary is missing', () => {
    render(
      <IChingSection
        yaoNum={369}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '369. Example',
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
          commentarySources={{
            gua: [
              'Gua Heading',
              '',
              '열 1 | 열 2 | 열 3',
              'A | B | C',
            ].join('\n'),
            yao: 'Yao Heading\nPlain prose commentary body',
          }}
          onCommentarySourceChange={setCommentarySource}
          yaoNum={369}
          guaData={{ header: '62. Example', meta: 'Example meta' }}
          yaoData={{
            titleLine: '369. Example',
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

    fireEvent.click(screen.getByRole('button', { name: 'Gua' }));

    expect(screen.getByText('Gua Heading')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'A' })).toBeInTheDocument();
    expect(screen.queryByText('Yao Heading')).not.toBeInTheDocument();
  });
});
