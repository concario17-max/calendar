import React, { useState } from 'react';
import { X, Save, Download } from 'lucide-react';
import { generateGuidedQuestion } from '../utils/logic';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  yaoTitle: string;
}

export const JournalModal: React.FC<JournalModalProps> = ({ isOpen, onClose, selectedDate, yaoTitle }) => {
  const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  const [entry, setEntry] = useState(() => {
    const savedKey = `journal_${dateStr}`;
    return localStorage.getItem(savedKey) || '';
  });
  const [question] = useState(() => {
    const savedQuestionKey = `journal_q_${dateStr}`;
    const savedQuestion = localStorage.getItem(savedQuestionKey);
    return savedQuestion || generateGuidedQuestion(yaoTitle);
  });

  const handleSave = () => {
    localStorage.setItem(`journal_${dateStr}`, entry);
    localStorage.setItem(`journal_q_${dateStr}`, question);

    const toastEvent = new CustomEvent('show-toast', { detail: '저장되었습니다' });
    window.dispatchEvent(toastEvent);

    onClose();
  };

  const handleDownloadToday = () => {
    const dateDisplay = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const content = `\uFEFF날짜: ${dateDisplay}\n\n안내 질문:\n${question}\n\n저널 기록:\n------------------\n${entry}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SimSang_Journal_${dateStr}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
              onChange={(e) => setEntry(e.target.value)}
              className="w-full h-48 md:h-64 p-5 pl-14 bg-warm-gray-50/50 dark:bg-warm-gray-900/50 border border-warm-gray-200 dark:border-warm-gray-700 rounded-2xl resize-none focus:ring-1 focus:ring-elegant-gold focus:border-elegant-gold dark:focus:ring-elegant-gold dark:focus:border-elegant-gold dark:text-warm-gray-200 transition-colors font-display text-base md:text-lg leading-relaxed"
              placeholder="오늘 마음에 떠오르는 것을 적어보세요..."
            />
          </div>
        </div>

        <div className="bg-warm-gray-50/50 dark:bg-warm-gray-900/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-warm-gray-100 dark:border-warm-gray-800">
          <button
            onClick={handleDownloadToday}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-warm-gray-600 dark:text-warm-gray-400 hover:text-elegant-gold dark:hover:text-elegant-gold font-bold text-sm transition-colors border-2 border-transparent hover:border-elegant-gold/30 rounded-xl"
          >
            <Download size={18} />
            <span>TXT 다운로드</span>
          </button>

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
