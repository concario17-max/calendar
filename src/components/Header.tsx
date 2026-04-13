import { DatePicker } from './DatePicker';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 rounded-full border border-warm-gray-200/70 bg-white/80 px-2 py-1.5 shadow-lg shadow-warm-gray-300/30 backdrop-blur-xl transition-colors duration-300 dark:border-warm-gray-700/70 dark:bg-ray-dark/80 dark:shadow-black/20">
      <div className="flex items-center rounded-full bg-white/60 dark:bg-warm-gray-800/60 p-0.5 shadow-inner">
        <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
        <button
          onClick={() => onDateChange(new Date())}
          className="px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-warm-gray-600 transition-all hover:bg-elegant-gold/10 hover:text-elegant-gold dark:text-warm-gray-300 dark:hover:text-elegant-gold rounded-full whitespace-nowrap active-scale"
        >
          오늘
        </button>
      </div>

      <button
        onClick={toggleTheme}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-gray-200/80 bg-white/60 text-warm-gray-600 shadow-sm transition-all hover:border-elegant-gold/50 hover:text-elegant-gold hover:shadow-md active-scale dark:border-warm-gray-700/80 dark:bg-warm-gray-800/60 dark:text-warm-gray-300 dark:hover:border-elegant-gold/50 dark:hover:text-elegant-gold"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
      </button>
    </div>
  );
};
