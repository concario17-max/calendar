import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date(selectedDate));
  const [focusedDate, setFocusedDate] = useState(new Date(selectedDate));
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusedDayRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(isOpen);

  useEffect(() => {
    const nextDate = new Date(selectedDate);
    setFocusedDate(nextDate);
    setPickerDate(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
  }, [selectedDate, isOpen]);

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
  }, [isOpen, pickerDate, focusedDate]);

  const focusDate = (date: Date) => {
    setFocusedDate(date);
    setPickerDate(new Date(date.getFullYear(), date.getMonth(), 1));
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
    onDateChange(new Date(pickerDate.getFullYear(), pickerDate.getMonth(), day));
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const year = pickerDate.getFullYear();
    const month = pickerDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();
    const focusedDay = focusedDate.getDate();

    const days: React.ReactNode[] = [];
    for (let index = 0; index < firstDay; index += 1) {
      days.push(<div key={`empty-${index}`} />);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const isSelected = year === selectedYear && month === selectedMonth && day === selectedDay;
      days.push(
        <button
          type="button"
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          ref={day === focusedDay ? focusedDayRef : undefined}
          aria-label={`${monthNames[month]} ${day}, ${year}`}
          aria-current={isSelected ? 'date' : undefined}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all active-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elegant-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ray-dark ${
            isSelected
              ? 'bg-elegant-gold text-white font-bold ring-2 ring-elegant-gold/30'
              : 'text-warm-gray-600 dark:text-warm-gray-400 hover:bg-elegant-gold hover:text-white dark:hover:text-ray-dark'
          }`}
        >
          {day}
        </button>,
      );
    }

    return (
      <div
        id="date-picker-popup"
        role="dialog"
        aria-modal="false"
        aria-labelledby="date-picker-title"
        tabIndex={-1}
        className="fixed inset-x-4 top-20 z-50 mt-2 w-auto rounded-[2rem] border border-warm-gray-200 bg-white p-6 shadow-2xl transition-all duration-300 transform scale-100 opacity-100 backdrop-blur-2xl dark:border-warm-gray-800 dark:bg-ray-dark/95 sm:absolute sm:inset-auto sm:right-0 sm:top-14 sm:w-[320px]"
        onKeyDown={(event) => {
          const { key } = event;

          if (key === 'Escape') {
            event.preventDefault();
            setIsOpen(false);
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
        <div className="mb-6 flex items-center justify-between px-2">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-warm-gray-600 transition-colors hover:bg-warm-gray-100 dark:text-warm-gray-400 dark:hover:bg-warm-gray-800"
            aria-label="Previous month"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeft size={20} />
          </button>
          <span id="date-picker-title" className="font-body text-lg font-bold tracking-tight text-warm-gray-800 dark:text-warm-gray-200">
            {monthNames[month]} {year}
          </span>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-warm-gray-600 transition-colors hover:bg-warm-gray-100 dark:text-warm-gray-400 dark:hover:bg-warm-gray-800"
            aria-label="Next month"
          >
            <span className="sr-only">Next month</span>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center text-sm">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-xs font-bold text-warm-gray-400 mb-2">{day}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex items-center" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center rounded-full transition-all group cursor-pointer outline-none hover:bg-elegant-gold/10 focus-visible:ring-2 focus-visible:ring-elegant-gold/50 active-scale"
        title="날짜 선택"
        aria-label="Open date picker"
        aria-haspopup="dialog"
        aria-controls="date-picker-popup"
        aria-expanded={isOpen}
      >
        <CalendarDays className="text-elegant-gold w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && renderCalendar()}
    </div>
  );
};
