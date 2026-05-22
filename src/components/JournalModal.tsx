import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download, Save, X } from 'lucide-react';
import type { GuaData, SoulSection, YaoData } from '../types';
import { GUA_TEXT } from '../data/guaData';
import { YAO_TEXT } from '../data/yaoData';
import { SOUL_TEXT } from '../data/soulData';
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
    ? `Í¥¥ÏÇ¨\n${guaData.header}\n${guaData.meta}`
    : 'Í¥¥ÏÇ¨\n?¥Îãπ ?†Ïßú???∞Í≤∞??Íµ¨Ï†à???ÜÏäµ?àÎã§.';

  const yaoBlock = yaoData
    ? `?®ÏÇ¨\n${yaoData.titleLine}\n\n${yaoData.short}\n\n${yaoData.body}`
    : '?®ÏÇ¨\n?¥Îãπ ?†Ïßú???∞Í≤∞??Íµ¨Ï†à???ÜÏäµ?àÎã§.';

  const soulBlock =
    soulSections.length > 0
      ? `${SOUL_JOURNAL_TITLE}\n${soulSections
          .map((section) => `${section.week}Ï£?(${section.range})\n${section.text}`)
          .join('\n\n')}`
      : `${SOUL_JOURNAL_TITLE}\n?¥Îãπ ?†Ïßú???∞Í≤∞??Íµ¨Ï†à???ÜÏäµ?àÎã§.`;

  return `?†Ïßú: ${dateDisplay}\n\n${guaBlock}\n\n${yaoBlock}\n\n${soulBlock}`;
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

    const toastEvent = new CustomEvent('show-toast', { detail: '?Ä?•Îêò?àÏäµ?àÎã§' });
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
      'Celestial Ephemeris ?ÑÏ≤¥ Íµ¨Ï†à',
      '',
      '[??≤Ω Í¥??êÎ¨∏]',
      GUA_TEXT,
      '',
      '[??≤Ω ???êÎ¨∏]',
      YAO_TEXT,
      '',
      '[Î£®Îèå???àÌ??¥ÎÑà???ÅÌòº???¨Î†• ?êÎ¨∏]',
      SOUL_TEXT,
    ].join('\n');

    triggerDownload('Celestial_Ephemeris_All_Passages.txt', content);
    setIsDownloadMenuOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="journal-modal-title"
        className="ui-modal ui-surface--overlay relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden text-on-surface transition-all transform scale-100 opacity-100 sm:max-h-[calc(100dvh-2rem)]"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/50 bg-surface-container/70 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col">
            <h3 id="journal-modal-title" className="font-headline text-xl font-semibold tracking-tight text-on-surface">
              ?Ä??Í∏∞Î°ù
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
            className="ui-button ui-button--ghost h-11 w-11 rounded-full p-0 text-on-surface-variant sm:h-10 sm:w-10"
            aria-label="Close journal modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="mb-5 rounded-[1.25rem] border border-secondary/15 bg-secondary/5 p-4 sm:mb-6 sm:p-5">
            <h4 className="mb-2 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-secondary">
              <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
              ?àÎÇ¥ ÏßàÎ¨∏
            </h4>
            <p className="font-body text-[0.98rem] leading-relaxed tracking-tight text-on-surface sm:text-base md:text-[17px]">
              {question}
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute top-4 left-4 flex h-12 w-12 items-center justify-center opacity-10">
              <span className="font-headline text-5xl italic text-secondary sm:text-6xl">"</span>
            </div>
            <textarea
              value={entry}
              onChange={(event) => setEntry(event.target.value)}
              className="ui-input h-52 w-full resize-none rounded-2xl p-4 pl-14 font-body text-[0.98rem] leading-relaxed text-on-surface transition-colors placeholder:text-on-surface-variant focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 sm:p-5 sm:pl-14 sm:text-base md:h-64 md:text-lg"
              placeholder="?§Îäò ÎßàÏùå???†Ïò§Î•¥Îäî Í≤ÉÏùÑ ?ÅÏñ¥Î≥¥ÏÑ∏??.."
            />
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-between gap-3 border-t border-outline-variant/50 bg-surface-container/50 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
          <div className="relative w-full sm:w-auto" ref={downloadMenuRef}>
            <button
              onClick={() => setIsDownloadMenuOpen((open) => !open)}
              className="ui-button ui-button--ghost flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-on-surface-variant sm:w-auto"
              aria-haspopup="menu"
              aria-expanded={isDownloadMenuOpen}
            >
              <Download size={18} />
              <span>TXT ?§Ïö¥Î°úÎìú</span>
              <ChevronDown size={16} className={`transition-transform ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDownloadMenuOpen && (
              <div
                className="ui-card ui-surface--raised absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-2xl backdrop-blur-xl sm:w-72"
                role="menu"
              >
                <button
                  onClick={handleDownloadCurrentPassage}
                  className="ui-button ui-button--ghost min-h-11 w-full justify-start rounded-none px-5 py-3 text-left text-sm font-medium text-on-surface"
                  role="menuitem"
                >
                  ??Íµ¨Ï†à ?Ä??
                </button>
                <button
                  onClick={handleDownloadAllPassages}
                  className="ui-button ui-button--ghost min-h-11 w-full justify-start rounded-none border-t border-outline-variant/40 px-5 py-3 text-left text-sm font-medium text-on-surface"
                  role="menuitem"
                >
                  ?ÑÏ≤¥ Íµ¨Ï†à ?Ä??
                </button>
              </div>
            )}
          </div>

          <div className="flex w-full gap-3 sm:w-auto">
            <button
              onClick={onClose}
              className="ui-button ui-button--ghost flex-1 min-h-11 rounded-xl px-6 py-3 font-semibold text-on-surface-variant sm:flex-none"
            >
              Ï∑®ÏÜå
            </button>
            <button
              onClick={handleSave}
              className="ui-button ui-button--primary flex flex-1 min-h-11 items-center justify-center gap-2 rounded-xl px-8 py-3 font-semibold sm:flex-none"
            >
              <Save size={18} />
              <span>?Ä?•ÌïòÍ∏?</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
