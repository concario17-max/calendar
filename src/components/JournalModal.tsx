import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download, Save, X } from 'lucide-react';
import type { GuaData, SoulSection, YaoData } from '../types';
import { GUA_TEXT, SOUL_TEXT, YAO_TEXT } from '../data';
import { generateGuidedQuestion } from '../utils/logic';

const SOUL_JOURNAL_TITLE = "Rudolf Steiner's Calendar of the Soul";

function formatJournalDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
}

function getJournalStorageKeys(date: Date) {
  const dateKey = formatJournalDateKey(date);

  return {
    dateKey,
    entryKey: `journal_${dateKey}`,
    questionKey: `journal_q_${dateKey}`,
  };
}

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  yaoTitle: string;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  soulSections: SoulSection[];
}

function triggerDownload(filename: string, content: string) {
  const blob = new Blob([`\uFEFF${content}`], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function buildCurrentPassageText(
  selectedDate: Date,
  guaData: GuaData | null,
  yaoData: YaoData | null,
  soulSections: SoulSection[],
) {
  const dateDisplay = selectedDate.toLocaleDateString('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const guaBlock = guaData
    ? `괴사\n${guaData.header}\n${guaData.meta}`
    : '괴사\n해당 날짜에 연결된 구절이 없습니다.';

  const yaoBlock = yaoData
    ? `효사\n${yaoData.titleLine}\n\n${yaoData.short}\n\n${yaoData.body}`
    : '효사\n해당 날짜에 연결된 구절이 없습니다.';

  const soulBlock =
    soulSections.length > 0
      ? `${SOUL_JOURNAL_TITLE}\n${soulSections
          .map((section) => `${section.week}주 (${section.range})\n${section.text}`)
          .join('\n\n')}`
      : `${SOUL_JOURNAL_TITLE}\n해당 날짜에 연결된 구절이 없습니다.`;

  return `날짜: ${dateDisplay}\n\n${guaBlock}\n\n${yaoBlock}\n\n${soulBlock}`;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  yaoTitle,
  guaData,
  yaoData,
  soulSections,
}) => {
  const { dateKey: dateStr, entryKey, questionKey } = getJournalStorageKeys(selectedDate);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  const [entry, setEntry] = useState(() => {
    return localStorage.getItem(entryKey) || '';
  });

  const [question] = useState(() => {
    const savedQuestion = localStorage.getItem(questionKey);
    return savedQuestion || generateGuidedQuestion(yaoTitle);
  });

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!downloadMenuRef.current) return;
      if (!downloadMenuRef.current.contains(event.target as Node)) {
        setIsDownloadMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDownloadMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSave = () => {
    localStorage.setItem(entryKey, entry);
    localStorage.setItem(questionKey, question);

    const toastEvent = new CustomEvent('show-toast', { detail: '저장되었습니다' });
    window.dispatchEvent(toastEvent);
    onClose();
  };

  const handleDownloadCurrentPassage = () => {
    const content = buildCurrentPassageText(selectedDate, guaData, yaoData, soulSections);
    triggerDownload(`Celestial_Ephemeris_Selected_Passages_${dateStr}.txt`, content);
    setIsDownloadMenuOpen(false);
  };

  const handleDownloadAllPassages = () => {
    const content = [
      'Celestial Ephemeris 전체 구절',
      '',
      '[역경 괘 원문]',
      GUA_TEXT,
      '',
      '[역경 효 원문]',
      YAO_TEXT,
      '',
      '[루돌프 슈타이너의 영혼의 달력 원문]',
      SOUL_TEXT,
    ].join('\n');

    triggerDownload('Celestial_Ephemeris_All_Passages.txt', content);
    setIsDownloadMenuOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="journal-modal-title"
        className="ui-modal ui-surface--overlay relative w-full max-w-2xl overflow-hidden text-on-surface transition-all transform scale-100 opacity-100"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/50 bg-surface-container/70 px-6 py-5">
          <div className="flex flex-col">
            <h3 id="journal-modal-title" className="font-headline text-xl font-semibold tracking-tight text-on-surface">
              저널 기록
            </h3>
            <span className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <button
            onClick={onClose}
            className="ui-button ui-button--ghost h-10 w-10 rounded-full p-0 text-on-surface-variant"
            aria-label="Close journal modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 rounded-2xl border border-secondary/15 bg-secondary/5 p-5">
            <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
              안내 질문
            </h4>
            <p className="font-body text-base leading-relaxed tracking-tight text-on-surface md:text-[17px]">
              {question}
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center opacity-10 pointer-events-none">
              <span className="font-headline text-6xl italic text-secondary">"</span>
            </div>
            <textarea
              value={entry}
              onChange={(event) => setEntry(event.target.value)}
              className="ui-input h-48 w-full resize-none rounded-2xl p-5 pl-14 font-body text-base leading-relaxed text-on-surface transition-colors placeholder:text-on-surface-variant focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 md:h-64 md:text-lg"
              placeholder="오늘 마음에 떠오르는 것을 적어보세요..."
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/50 bg-surface-container/50 px-6 py-4 sm:flex-row">
          <div className="relative w-full sm:w-auto" ref={downloadMenuRef}>
            <button
              onClick={() => setIsDownloadMenuOpen((open) => !open)}
              className="ui-button ui-button--ghost flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-on-surface-variant sm:w-auto"
              aria-haspopup="menu"
              aria-expanded={isDownloadMenuOpen}
            >
              <Download size={18} />
              <span>TXT 다운로드</span>
              <ChevronDown size={16} className={`transition-transform ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDownloadMenuOpen && (
              <div
                className="ui-card ui-surface--raised absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-2xl backdrop-blur-xl sm:w-72"
                role="menu"
              >
                <button
                  onClick={handleDownloadCurrentPassage}
                  className="ui-button ui-button--ghost w-full justify-start rounded-none px-4 py-3 text-left text-sm font-medium text-on-surface"
                  role="menuitem"
                >
                  이 구절 저장
                </button>
                <button
                  onClick={handleDownloadAllPassages}
                  className="ui-button ui-button--ghost w-full justify-start rounded-none border-t border-outline-variant/40 px-4 py-3 text-left text-sm font-medium text-on-surface"
                  role="menuitem"
                >
                  전체 구절 저장
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="ui-button ui-button--ghost flex-1 rounded-xl px-6 py-2.5 font-semibold text-on-surface-variant sm:flex-none"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="ui-button ui-button--primary flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-2.5 font-semibold sm:flex-none"
            >
              <Save size={18} />
              <span>저장하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
