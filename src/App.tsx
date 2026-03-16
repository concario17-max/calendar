import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { JournalModal } from './components/JournalModal';
import { useCalendarLogic } from './hooks/useCalendarLogic';

function App() {
  const {
    selectedDate,
    setSelectedDate,
    yaoNum,
    guaNum,
    guaData,
    yaoData,
    hitSoulGroup,
    soulSections,
  } = useCalendarLogic();

  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail);
      setTimeout(() => setToastMessage(null), 3000);
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-display selection:bg-elegant-gold/30">
      <Header selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[52vh] bg-[radial-gradient(circle_at_top,rgba(184,134,11,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_55%)] -z-10 transition-colors duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-warm-gray-100/90 via-transparent to-transparent dark:from-warm-gray-900/55 -z-10 transition-colors duration-300"></div>

        <MainContent
          selectedDate={selectedDate}
          yaoNum={yaoNum}
          guaNum={guaNum}
          guaData={guaData}
          yaoData={yaoData}
          hitSoulGroup={hitSoulGroup}
          soulSections={soulSections}
          onOpenJournal={() => setIsJournalOpen(true)}
        />
      </div>

      {isJournalOpen && (
        <JournalModal
          key={selectedDate.toISOString().split('T')[0]}
          isOpen={isJournalOpen}
          onClose={() => setIsJournalOpen(false)}
          selectedDate={selectedDate}
          yaoTitle={yaoData?.titleLine || ''}
        />
      )}

      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-in-out ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}
      >
        <div className="bg-elegant-gold text-white dark:text-ray-dark font-medium px-7 py-3.5 rounded-full shadow-2xl shadow-elegant-gold/30 flex items-center gap-3 border border-yellow-400/50 dark:border-white/20 backdrop-blur-md animate-fade-in-up">
          <span className="material-icons opacity-90 text-[20px]">check_circle</span>
          <span className="tracking-[0.04em] text-sm md:text-base font-display">{toastMessage}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
