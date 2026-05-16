import { useEffect, useState } from 'react';
import { MainContent } from './components/MainContent';
import { useCalendarLogic } from './hooks/useCalendarLogic';
import type { GuaData, YaoData } from './types';

interface BonusGuaUiItem {
  id: string;
  label: string;
  dateLabel: string;
  commentary?: string;
  num: number;
  guaData: GuaData;
}

interface BonusYaoUiItem {
  id: string;
  label: string;
  dateLabel: string;
  commentary?: string;
  num: number;
  yaoData: YaoData;
}

function formatBonusDateLabel(month: number, day: number): string {
  return `${month}\uC6D4 ${day}\uC77C`;
}

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
    bonusDay,
    bonusGuaItems: rawBonusGuaItems = [],
    bonusYaoItems: rawBonusYaoItems = [],
  } = useCalendarLogic();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const bonusDateLabel = bonusDay ? formatBonusDateLabel(bonusDay.month, bonusDay.day) : '';
  const bonusGuaItems: BonusGuaUiItem[] = rawBonusGuaItems.map((item) => ({
    commentary: (item as { commentary?: string }).commentary,
    id: `gua-${item.num}`,
    label: item.guaData.header,
    dateLabel: bonusDateLabel,
    num: item.num,
    guaData: item.guaData,
  }));
  const bonusYaoItems: BonusYaoUiItem[] = rawBonusYaoItems.map((item) => ({
    commentary: (item as { commentary?: string }).commentary,
    id: `yao-${item.num}`,
    label: item.yaoData.titleLine,
    dateLabel: bonusDateLabel,
    num: item.num,
    yaoData: item.yaoData,
  }));

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
    <div className="relative min-h-screen flex flex-col font-body selection:bg-elegant-gold/30">
      <div className="relative z-10 flex-1">
        <MainContent
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          yaoNum={yaoNum}
          guaNum={guaNum}
          guaData={guaData}
          yaoData={yaoData}
          hitSoulGroup={hitSoulGroup}
          soulSections={soulSections}
          bonusGuaItems={bonusGuaItems}
          bonusYaoItems={bonusYaoItems}
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
