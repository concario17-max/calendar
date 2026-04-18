import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { useCalendarLogic } from './hooks/useCalendarLogic';

function App() {
  const {
    selectedDate,
    setSelectedDate,
    commentarySource,
    setCommentarySource,
    yaoNum,
    guaNum,
    guaData,
    yaoData,
    hitSoulGroup,
    soulSections
  } = useCalendarLogic();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail);
      setTimeout(() => setToastMessage(null), 3000);
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  useEffect(() => {
    const threshold = 32;

    const updateHeaderState = () => {
      setIsHeaderCollapsed(window.scrollY > threshold);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    return () => window.removeEventListener('scroll', updateHeaderState);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col font-display selection:bg-elegant-gold/30">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 w-[44%] bg-gradient-to-b from-[#e1cda2] via-[#d4b97f] to-[#c79f57] dark:from-[#120d08] dark:via-[#0c0806] dark:to-[#050403]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-[44%] w-px bg-gradient-to-b from-transparent via-warm-gray-300/70 to-transparent dark:via-warm-gray-700/55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 right-0 left-[44%] bg-gradient-to-b from-[#fffcf8]/97 via-[#fcfaf6]/95 to-[#faf5ef]/92 dark:from-[#2b241c]/92 dark:via-[#241d17]/90 dark:to-[#1b1712]/88"
      />

      <Header selectedDate={selectedDate} onDateChange={setSelectedDate} isCollapsed={isHeaderCollapsed} />

      <div className="relative z-10 flex-1">
        <MainContent
          commentarySource={commentarySource}
          setCommentarySource={setCommentarySource}
          yaoNum={yaoNum}
          guaNum={guaNum}
          guaData={guaData}
          yaoData={yaoData}
          hitSoulGroup={hitSoulGroup}
          soulSections={soulSections}
        />
      </div>

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
