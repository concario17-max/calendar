import { DatePicker } from './DatePicker';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  isCollapsed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange, isCollapsed = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`fixed top-2 right-2 sm:top-3 sm:right-3 z-50 flex items-center gap-1 rounded-full border border-warm-gray-200/50 bg-white/65 px-1.5 py-1 shadow-sm shadow-warm-gray-300/20 backdrop-blur-md transition-all duration-300 dark:border-warm-gray-700/40 dark:bg-ray-dark/65 dark:shadow-black/20 ${
        isCollapsed ? '-translate-y-6 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="flex items-center rounded-full p-0">
        <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
        <button
          onClick={() => onDateChange(new Date())}
          className="px-2 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-warm-gray-600 transition-all hover:bg-elegant-gold/10 hover:text-elegant-gold dark:text-warm-gray-300 dark:hover:text-elegant-gold rounded-full whitespace-nowrap active-scale"
        >
          오늘
        </button>
      </div>

      <button
        onClick={toggleTheme}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-gray-200/70 bg-white/55 text-warm-gray-600 shadow-sm transition-all hover:border-elegant-gold/50 hover:text-elegant-gold hover:shadow-md active-scale dark:border-warm-gray-700/70 dark:bg-warm-gray-800/55 dark:text-warm-gray-300 dark:hover:border-elegant-gold/50 dark:hover:text-elegant-gold"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={17} className="sm:w-4.5 sm:h-4.5" /> : <Moon size={17} className="sm:w-4.5 sm:h-4.5" />}
      </button>
    </div>
  );
};
