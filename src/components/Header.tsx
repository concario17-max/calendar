import { DatePicker } from './DatePicker';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, Telescope } from 'lucide-react';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-warm-gray-50/80 dark:bg-ray-dark/80 backdrop-blur-xl border-b border-warm-gray-200/50 dark:border-warm-gray-800/50 transition-colors duration-300">
      <div className="w-full px-3 sm:px-6 lg:px-8 py-3.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-elegant-gold to-yellow-600 flex items-center justify-center shadow-lg gold-glow flex-shrink-0">
            <Telescope className="text-white w-4.5 h-4.5 sm:w-6 sm:h-6" />
          </div>
          <h1 className="text-[1.15rem] sm:text-[2.25rem] font-brand font-semibold tracking-[0.03em] text-transparent bg-clip-text bg-gradient-to-r from-elegant-gold to-yellow-600 truncate leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:max-w-[18rem]">
            Celestial Ephemeris
          </h1>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 self-end sm:self-auto">
          <div className="flex items-center bg-white/50 dark:bg-warm-gray-800/50 p-0.5 sm:p-1 rounded-full border border-warm-gray-200/50 dark:border-warm-gray-700/50 shadow-inner">
            <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
            <button
              onClick={() => onDateChange(new Date())}
              className="px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-bold uppercase tracking-wider text-warm-gray-600 dark:text-warm-gray-300 hover:text-elegant-gold dark:hover:text-elegant-gold transition-all hover:bg-elegant-gold/10 rounded-full whitespace-nowrap active-scale"
            >
              오늘
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-warm-gray-600 shadow-sm transition-all hover:border-elegant-gold/50 hover:text-elegant-gold hover:shadow-md active-scale dark:bg-warm-gray-800/50 dark:text-warm-gray-300 dark:hover:border-elegant-gold/50 dark:hover:text-elegant-gold sm:h-11 sm:w-11 border border-warm-gray-200 dark:border-warm-gray-700"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
