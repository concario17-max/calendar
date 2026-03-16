import { DatePicker } from './DatePicker';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, Telescope } from 'lucide-react';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const dateLabel = selectedDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="sticky top-0 z-40 border-b border-warm-gray-200/60 bg-warm-gray-50/82 backdrop-blur-2xl transition-colors duration-300 dark:border-warm-gray-800/60 dark:bg-ray-dark/84">
      <div className="max-w-5xl mx-auto px-3 sm:px-5 lg:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <div className="min-w-0 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-elegant-gold to-yellow-600 flex items-center justify-center shadow-lg gold-glow flex-shrink-0">
            <Telescope className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs tracking-[0.22em] text-warm-gray-500 dark:text-warm-gray-400 mb-0.5 sm:mb-1">
              DAILY I CHING & SOUL CALENDAR
            </div>
            <h1 className="text-lg sm:text-[1.75rem] leading-none font-display font-semibold tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-elegant-gold to-yellow-600 truncate">
              Celestial Ephemeris
            </h1>
            <p className="hidden sm:block text-sm text-warm-gray-600 dark:text-warm-gray-300 mt-1 truncate">
              {dateLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="flex items-center bg-white/60 dark:bg-warm-gray-800/70 p-1 rounded-full border border-warm-gray-200/70 dark:border-warm-gray-700/70 shadow-inner">
            <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
            <button
              onClick={() => onDateChange(new Date())}
              className="px-3 sm:px-4 py-1.5 text-[11px] sm:text-sm font-medium tracking-[-0.02em] text-warm-gray-700 dark:text-warm-gray-200 hover:text-elegant-gold dark:hover:text-elegant-gold transition-all hover:bg-elegant-gold/10 rounded-full whitespace-nowrap active-scale"
            >
              오늘
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-full bg-white/60 dark:bg-warm-gray-800/70 border border-warm-gray-200 dark:border-warm-gray-700 hover:border-elegant-gold/50 dark:hover:border-elegant-gold/50 transition-all text-warm-gray-600 dark:text-warm-gray-300 hover:text-elegant-gold dark:hover:text-elegant-gold shadow-sm hover:shadow-md active-scale"
            aria-label="테마 전환"
          >
            {isDark ? <Sun size={17} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={17} className="sm:w-[18px] sm:h-[18px]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
