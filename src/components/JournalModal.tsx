import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download, Save, X } from 'lucide-react';
import type { GuaData, SoulSection, YaoData } from '../types';
import { GUA_TEXT, SOUL_TEXT, YAO_TEXT } from '../data';
import { generateGuidedQuestion } from '../utils/logic';

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
    ? `역경\n${guaData.header}\n${guaData.meta}`
    : '역경\n해당 날짜에 연결된 구절이 없습니다.';

  const yaoBlock = yaoData
    ? `오늘의 구절\n${yaoData.titleLine}\n\n${yaoData.short}\n\n${yaoData.body}`
    : '오늘의 구절\n해당 날짜에 연결된 구절이 없습니다.';

  const soulBlock = soulSections.length > 0
    ? `루돌프 슈타이너의 영혼의 달력\n${soulSections
        .map((section) => `${section.week}주 (${section.range})\n${section.text}`)
        .join('\n\n')}`
    : '루돌프 슈타이너의 영혼의 달력\n해당 날짜에 연결된 구절이 없습니다.';

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
  const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  const [entry, setEntry] = useState(() => {
    const savedKey = `journal_${dateStr}`;
    return localStorage.getItem(savedKey) || '';
  });

  const [question] = useState(() => {
    const savedQuestionKey = `journal_q_${dateStr}`;
    const savedQuestion = localStorage.getItem(savedQuestionKey);
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
    localStorage.setItem(`journal_${dateStr}`, entry);
    localStorage.setItem(`journal_q_${dateStr}`, question);

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
        className="absolute inset-0 bg-warm-gray-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white/95 dark:bg-ray-dark/95 backdrop-blur-xl w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-warm-gray-200 dark:border-warm-gray-800 transition-all transform scale-100 opacity-100">
        <div className="px-6 py-5 border-b border-warm-gray-100 dark:border-warm-gray-800 flex justify-between items-center bg-warm-gray-50/50 dark:bg-warm-gray-900/50">
          <div className="flex flex-col">
            <h3 className="text-xl font-display font-bold text-warm-gray-800 dark:text-warm-gray-200 tracking-tight">
              저널 기록
            </h3>
            <span className="text-xs font-bold text-warm-gray-400 dark:text-warm-gray-500 uppercase tracking-widest mt-1">
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
            className="p-2 text-warm-gray-400 hover:text-elegant-gold dark:hover:text-elegant-gold bg-white dark:bg-ray-dark hover:bg-warm-gray-50 dark:hover:bg-warm-gray-800 rounded-full transition-colors shadow-sm"
            aria-label="Close journal modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 bg-elegant-gold/5 dark:bg-elegant-gold/10 border border-elegant-gold/20 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-elegant-gold uppercase tracking-widest mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elegant-gold"></div>
              안내 질문
            </h4>
            <p className="text-warm-gray-800 dark:text-warm-gray-200 font-display text-base md:text-[17px] leading-relaxed tracking-tight">
              {question}
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center opacity-10 pointer-events-none">
              <span className="font-display italic text-6xl text-elegant-gold">"</span>
            </div>
            <textarea
              value={entry}
              onChange={(event) => setEntry(event.target.value)}
              className="w-full h-48 md:h-64 p-5 pl-14 bg-warm-gray-50/50 dark:bg-warm-gray-900/50 border border-warm-gray-200 dark:border-warm-gray-700 rounded-2xl resize-none focus:ring-1 focus:ring-elegant-gold focus:border-elegant-gold dark:focus:ring-elegant-gold dark:focus:border-elegant-gold dark:text-warm-gray-200 transition-colors font-display text-base md:text-lg leading-relaxed"
              placeholder="오늘 마음에 떠오르는 것을 적어보세요..."
            />
          </div>
        </div>

        <div className="bg-warm-gray-50/50 dark:bg-warm-gray-900/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-warm-gray-100 dark:border-warm-gray-800">
          <div className="relative w-full sm:w-auto" ref={downloadMenuRef}>
            <button
              onClick={() => setIsDownloadMenuOpen((open) => !open)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-warm-gray-600 dark:text-warm-gray-400 hover:text-elegant-gold dark:hover:text-elegant-gold font-bold text-sm transition-colors border-2 border-transparent hover:border-elegant-gold/30 rounded-xl"
              aria-haspopup="menu"
              aria-expanded={isDownloadMenuOpen}
            >
              <Download size={18} />
              <span>TXT 다운로드</span>
              <ChevronDown size={16} className={`transition-transform ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDownloadMenuOpen && (
              <div
                className="absolute left-0 bottom-full mb-2 w-full sm:w-72 rounded-2xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white/95 dark:bg-ray-dark/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                role="menu"
              >
                <button
                  onClick={handleDownloadCurrentPassage}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-warm-gray-700 dark:text-warm-gray-200 hover:bg-warm-gray-50 dark:hover:bg-warm-gray-800 transition-colors"
                  role="menuitem"
                >
                  이 구절 저장
                </button>
                <button
                  onClick={handleDownloadAllPassages}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-warm-gray-700 dark:text-warm-gray-200 hover:bg-warm-gray-50 dark:hover:bg-warm-gray-800 transition-colors border-t border-warm-gray-100 dark:border-warm-gray-800"
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
              className="flex-1 sm:flex-none px-6 py-2.5 text-warm-gray-500 dark:text-warm-gray-400 font-bold hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 rounded-xl transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-elegant-gold hover:bg-yellow-600 dark:hover:bg-yellow-500 text-white dark:text-ray-dark font-bold rounded-xl transition-colors shadow-lg shadow-elegant-gold/20"
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
