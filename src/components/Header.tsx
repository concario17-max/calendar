import { DatePicker } from './DatePicker';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl border border-warm-gray-200/70 bg-white/70 px-3 py-2 shadow-sm shadow-warm-gray-300/10 backdrop-blur-md dark:border-warm-gray-800/70 dark:bg-ray-dark/65 dark:shadow-black/20 sm:flex-nowrap sm:px-4">
      <div className="flex items-center gap-1.5">
        <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
        <button
          type="button"
          onClick={() => onDateChange(new Date())}
          className="rounded-full px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-warm-gray-600 transition-all hover:bg-elegant-gold/10 hover:text-elegant-gold active-scale dark:text-warm-gray-300 dark:hover:text-elegant-gold"
        >
          Today
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-gray-200/70 bg-white/55 text-warm-gray-600 shadow-sm transition-all hover:border-elegant-gold/50 hover:text-elegant-gold hover:shadow-md active-scale dark:border-warm-gray-700/70 dark:bg-warm-gray-800/55 dark:text-warm-gray-300 dark:hover:border-elegant-gold/50 dark:hover:text-elegant-gold"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={17} className="sm:w-4.5 sm:h-4.5" /> : <Moon size={17} className="sm:w-4.5 sm:h-4.5" />}
        </button>
      </div>
    </div>
  );
};
