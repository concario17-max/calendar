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
        yaoTitle="369. ???"
        guaData={{ header: '62. ???', meta: '?????' }}
        yaoData={{ titleLine: '369. ???', short: '??? ???', body: '?????' }}
        soulSections={[{ week: 50, range: '3??16-22', text: '???' }]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /TXT/ }));
    fireEvent.click(screen.getAllByRole('menuitem')[0]);

    expect(createObjectUrlSpy).toHaveBeenCalledTimes(1);
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();

    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('exports the current passage with the updated soul title', async () => {
    render(
      <JournalModal
        isOpen
        onClose={() => {}}
        selectedDate={new Date(2026, 2, 18)}
        yaoTitle="369. ???"
        guaData={{ header: '62. ???', meta: '?????' }}
        yaoData={{ titleLine: '369. ???', short: '??? ???', body: '?????' }}
        soulSections={[{ week: 50, range: '3??16-22', text: '???' }]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /TXT/ }));
    fireEvent.click(screen.getAllByRole('menuitem')[0]);

    const blobCall = createObjectUrlSpy.mock.calls.at(0) as unknown as [Blob] | undefined;
    const blob = blobCall?.[0];
    expect(blob).toBeDefined();
    const content = await blob!.text();

    expect(content).toContain("Rudolf Steiner's Calendar of the Soul");
    expect(content).toContain('??');
    expect(content).toContain('??');
  });

  it('closes the download menu when clicking outside', () => {
    render(
      <JournalModal
        isOpen
        onClose={() => {}}
        selectedDate={new Date(2026, 2, 18)}
        yaoTitle="369. ???"
        guaData={null}
        yaoData={null}
        soulSections={[]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /TXT/ }));
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);

    fireEvent.mouseDown(document.body);
    expect(screen.queryAllByRole('menuitem')).toHaveLength(0);
  });
});
