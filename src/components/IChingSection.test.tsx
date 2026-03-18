import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IChingSection } from './IChingSection';

describe('IChingSection', () => {
  it('renders an empty-state message when there is no passage', () => {
    render(<IChingSection yaoNum={null} guaData={null} yaoData={null} />);

    expect(screen.getByText('이 날짜는 연간 전환 구간이라 역경 항목이 연결되지 않습니다.')).toBeInTheDocument();
  });

  it('renders the current passage when data exists', () => {
    render(
      <IChingSection
        yaoNum={369}
        guaData={{ header: '62. 중부', meta: '중부에 관한 설명' }}
        yaoData={{ titleLine: '369. 九三', short: '짧은 요약', body: '긴 본문' }}
      />,
    );

    expect(screen.getByText('62. 중부')).toBeInTheDocument();
    expect(screen.getByText('369. 九三')).toBeInTheDocument();
    expect(screen.getByText('짧은 요약')).toBeInTheDocument();
  });
});
