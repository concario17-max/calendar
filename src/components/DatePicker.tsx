import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedDate, setFocusedDate] = useState(new Date(selectedDate));
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusedDayRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(isOpen);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      triggerRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    focusedDayRef.current?.focus();
  }, [isOpen, focusedDate]);

  const focusDate = (date: Date) => {
    setFocusedDate(date);
  };

  const moveFocusedDate = (offset: number) => {
    const newDate = new Date(focusedDate);
    newDate.setDate(newDate.getDate() + offset);
    focusDate(newDate);
    onDateChange(newDate);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(focusedDate);
    const focusedDay = newDate.getDate();

    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + offset);

    const daysInMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    newDate.setDate(Math.min(focusedDay, daysInMonth));

    focusDate(newDate);
  };

  const handleDateClick = (day: number) => {
    onDateChange(new Date(focusedDate.getFullYear(), focusedDate.getMonth(), day));
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const year = focusedDate.getFullYear();
    const month = focusedDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();
    const focusedDay = focusedDate.getDate();

    const emptyDays = Array.from({ length: firstDay }, (_, index) => <div key={`empty-${index}`} />);
    const dayButtons = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const isSelected = year === selectedYear && month === selectedMonth && day === selectedDay;

      return (
        <button
          type="button"
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          ref={day === focusedDay ? focusedDayRef : undefined}
          aria-label={`${monthNames[month]} ${day}, ${year}`}
          aria-current={isSelected ? 'date' : undefined}
          className={`ui-button flex h-10 w-10 items-center justify-center rounded-full p-0 text-[0.8rem] transition-colors transition-shadow active-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low sm:h-9 sm:w-9 sm:text-xs ${
            isSelected
              ? 'ui-button--secondary font-bold'
              : 'ui-button--ghost text-on-surface-variant hover:bg-surface-container-high/70 hover:text-on-surface'
          }`}
        >
          {day}
        </button>
      );
    });

    return (
      <div
        id="date-picker-popup"
        role="dialog"
        aria-modal="false"
        aria-labelledby="date-picker-title"
        tabIndex={-1}
        className="ui-modal ui-surface--overlay fixed inset-x-4 top-20 z-50 mt-2 w-auto p-5 text-on-surface transition-all duration-300 transform scale-100 opacity-100 backdrop-blur-2xl sm:absolute sm:inset-auto sm:right-0 sm:top-14 sm:w-[320px] sm:p-6"
          onKeyDown={(event) => {
            const { key } = event;

            if (key === 'Escape') {
              event.preventDefault();
              setIsOpen(false);
              return;
            }

            if (key === 'Home' || key === 'End') {
              event.preventDefault();
              const newDate = new Date(focusedDate);
              const dayOfWeek = newDate.getDay();
              const delta = key === 'Home' ? -dayOfWeek : 6 - dayOfWeek;
              moveFocusedDate(delta);
              return;
            }

            if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
              event.preventDefault();
              if (key === 'ArrowLeft') {
                moveFocusedDate(-1);
              } else if (key === 'ArrowRight') {
              moveFocusedDate(1);
            } else if (key === 'ArrowUp') {
              moveFocusedDate(-7);
            } else {
              moveFocusedDate(7);
            }
            return;
          }

          if (key === 'PageUp' || key === 'PageDown') {
            event.preventDefault();
            changeMonth(key === 'PageUp' ? -1 : 1);
          }
        }}
      >
        <div className="mb-5 flex items-center justify-between gap-2 px-1.5">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="ui-button ui-button--ghost h-11 w-11 rounded-full p-0 text-on-surface-variant sm:h-10 sm:w-10"
            aria-label="Previous month"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeft size={20} />
          </button>
          <span
            id="date-picker-title"
            aria-live="polite"
            aria-atomic="true"
            className="font-headline text-[1rem] font-semibold tracking-tight text-on-surface sm:text-lg"
          >
            {monthNames[month]} {year}
          </span>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="ui-button ui-button--ghost h-11 w-11 rounded-full p-0 text-on-surface-variant sm:h-10 sm:w-10"
            aria-label="Next month"
          >
            <span className="sr-only">Next month</span>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-x-2.5 gap-y-3 text-center text-sm">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-on-surface-variant sm:text-xs">
              {day}
            </div>
          ))}
          {emptyDays}
          {dayButtons}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex items-center" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setFocusedDate(new Date(selectedDate));
          setIsOpen((open) => !open);
        }}
        className="ui-button ui-button--secondary group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-0 text-secondary active-scale sm:h-11 sm:w-11"
        title="날짜 선택"
        aria-label="Open date picker"
        aria-haspopup="dialog"
        aria-controls="date-picker-popup"
        aria-expanded={isOpen}
      >
        <CalendarDays className="h-5 w-5 transition-transform group-hover:scale-110 sm:h-[1.05rem] sm:w-[1.05rem]" />
      </button>

      {isOpen && renderCalendar()}
    </div>
  );
};
