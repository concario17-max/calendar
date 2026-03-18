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
    soulSections
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

      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-warm-gray-100 to-transparent dark:from-warm-gray-900 -z-10 transition-colors duration-300"></div>
        <MainContent
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
          yaoTitle={yaoData?.titleLine || ""}
          guaData={guaData}
          yaoData={yaoData}
          soulSections={soulSections}
        />
      )}

      <div
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-700 ease-in-out ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}
      >
        <div className="bg-elegant-gold text-white dark:text-ray-dark font-bold px-8 py-4 rounded-full shadow-2xl shadow-elegant-gold/30 flex items-center gap-3 border border-yellow-400/50 dark:border-white/20 backdrop-blur-md animate-fade-in-up">
          <span className="material-icons opacity-90 text-[20px]">check_circle</span>
          <span className="tracking-widest text-sm md:text-base uppercase font-bold">{toastMessage}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
