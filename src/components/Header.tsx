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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: Brand Area */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start order-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-elegant-gold to-yellow-600 flex items-center justify-center shadow-lg gold-glow">
              <Telescope className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-elegant-gold to-yellow-600">
              Celestial Ephemeris
            </h1>
          </div>
        </div>

        {/* Right: Date and Theme Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end order-2">
          <div className="flex items-center gap-2 bg-white/50 dark:bg-warm-gray-800/50 p-1.5 rounded-full border border-warm-gray-200/50 dark:border-warm-gray-700/50 shadow-inner">
            <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
            <button 
              onClick={() => onDateChange(new Date())}
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-warm-gray-600 dark:text-warm-gray-300 hover:text-elegant-gold dark:hover:text-elegant-gold transition-all hover:bg-elegant-gold/10 rounded-full"
            >
              Today
            </button>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white/50 dark:bg-warm-gray-800/50 border border-warm-gray-200 dark:border-warm-gray-700 hover:border-elegant-gold/50 dark:hover:border-elegant-gold/50 transition-all text-warm-gray-600 dark:text-warm-gray-300 hover:text-elegant-gold dark:hover:text-elegant-gold shadow-sm hover:shadow-md ml-1"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
