import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IChingSection } from './IChingSection.tsx';

describe('IChingSection', () => {
  it('renders an empty-state message when there is no passage', () => {
    render(<IChingSection yaoNum={null} guaData={null} yaoData={null} />);

    expect(screen.getByText('이 날짜는 연간 전환 구간이라 역경 항목이 연결되지 않습니다.')).toBeInTheDocument();
  });

  it('renders the current passage and commentary split when commentary exists', () => {
    render(
      <IChingSection
        yaoNum={369}
        guaData={{ header: '62. Example', meta: 'Example meta' }}
        yaoData={{
          titleLine: '369. Example',
          short: 'Short reading',
          body: 'Body text',
          commentary: 'Commentary heading\nCommentary body',
        }}
      />,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(screen.getByText('Short reading')).toBeInTheDocument();
    expect(screen.queryByText('Reading Summary')).not.toBeInTheDocument();
    expect(screen.queryByText('Current Line')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Commentary' })).toBeInTheDocument();
    expect(screen.getByText('Commentary heading')).toBeInTheDocument();
    expect(screen.getByText('Commentary body')).toBeInTheDocument();
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
      />,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '62. Example' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Commentary' })).toBeInTheDocument();
    expect(screen.getByText('Commentary is not available for this selection yet.')).toBeInTheDocument();
  });
});
