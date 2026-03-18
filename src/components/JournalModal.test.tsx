import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { JournalModal } from './JournalModal';

const createObjectUrlSpy = vi.fn(() => 'blob:test');
const revokeObjectUrlSpy = vi.fn();

describe('JournalModal', () => {
  let clickSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    Object.defineProperty(globalThis, 'URL', {
      configurable: true,
      value: {
        createObjectURL: createObjectUrlSpy,
        revokeObjectURL: revokeObjectUrlSpy,
      },
    });
    clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  afterEach(() => {
    localStorage.clear();
    createObjectUrlSpy.mockClear();
    revokeObjectUrlSpy.mockClear();
    clickSpy.mockRestore();
  });

  it('opens the download menu and exports the current passage', () => {
    const appendSpy = vi.spyOn(document.body, 'appendChild');
    const removeSpy = vi.spyOn(document.body, 'removeChild');

    render(
      <JournalModal
        isOpen
        onClose={() => {}}
        selectedDate={new Date(2026, 2, 18)}
        yaoTitle="369. 九三"
        guaData={{ header: '62. 중부', meta: '괘 메타' }}
        yaoData={{ titleLine: '369. 九三', short: '짧은 요약', body: '긴 본문' }}
        soulSections={[{ week: 50, range: '3월 16-22', text: '본문' }]}
      />,
    );

    fireEvent.click(screen.getByText('TXT 다운로드'));
    fireEvent.click(screen.getByText('이 구절 저장'));

    expect(createObjectUrlSpy).toHaveBeenCalledTimes(1);
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();

    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('closes the download menu when clicking outside', () => {
    render(
      <JournalModal
        isOpen
        onClose={() => {}}
        selectedDate={new Date(2026, 2, 18)}
        yaoTitle="369. 九三"
        guaData={null}
        yaoData={null}
        soulSections={[]}
      />,
    );

    fireEvent.click(screen.getByText('TXT 다운로드'));
    expect(screen.getByText('전체 구절 저장')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('전체 구절 저장')).not.toBeInTheDocument();
  });
});
