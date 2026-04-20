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
    <header className="sticky top-0 z-30 flex min-h-[4.75rem] w-full items-center justify-between gap-4 border-b border-outline-variant/12 bg-surface/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="truncate font-headline text-[1.45rem] italic leading-none text-primary sm:text-[1.7rem]">
          The Curated Archive
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className="hidden items-center gap-1.5 sm:flex">
          <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
          <button
            type="button"
            onClick={() => onDateChange(new Date())}
            className="rounded-full px-3 py-1.5 font-label text-[0.66rem] uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:bg-secondary/8 hover:text-secondary active-scale"
          >
            Today
          </button>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant transition-colors hover:bg-secondary/8 hover:text-secondary active-scale"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={17} className="sm:h-4.5 sm:w-4.5" /> : <Moon size={17} className="sm:h-4.5 sm:w-4.5" />}
        </button>
      </div>
    </header>
  );
};
