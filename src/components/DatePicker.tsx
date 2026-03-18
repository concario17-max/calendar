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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPickerDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      const newDate = new Date(selectedDate);
      if (event.key === 'ArrowLeft') {
        newDate.setDate(newDate.getDate() - 1);
        onDateChange(newDate);
      } else if (event.key === 'ArrowRight') {
        newDate.setDate(newDate.getDate() + 1);
        onDateChange(newDate);
      } else if (event.key === 'ArrowUp') {
        newDate.setDate(newDate.getDate() - 7);
        onDateChange(newDate);
      } else if (event.key === 'ArrowDown') {
        newDate.setDate(newDate.getDate() + 7);
        onDateChange(newDate);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onDateChange, selectedDate]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(pickerDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setPickerDate(newDate);
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

    const days: React.ReactNode[] = [];
    for (let index = 0; index < firstDay; index += 1) {
      days.push(<div key={`empty-${index}`} />);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const isSelected = year === selectedYear && month === selectedMonth && day === selectedDay;
      days.push(
        <button
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          aria-label={`${monthNames[month]} ${day}, ${year}`}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active-scale ${
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
      <div className="fixed inset-x-4 top-20 sm:absolute sm:inset-auto sm:right-0 sm:top-14 mt-2 bg-white dark:bg-ray-dark/95 backdrop-blur-2xl border border-warm-gray-200 dark:border-warm-gray-800 rounded-[2rem] shadow-2xl p-6 w-auto sm:w-[320px] z-50 transition-all duration-300 transform scale-100 opacity-100">
        <div className="flex justify-between items-center mb-6 px-2">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-800 rounded-full transition-colors text-warm-gray-600 dark:text-warm-gray-400">
            <span className="sr-only">Previous month</span>
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold font-display text-lg tracking-tight text-warm-gray-800 dark:text-warm-gray-200">
            {monthNames[month]} {year}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-800 rounded-full transition-colors text-warm-gray-600 dark:text-warm-gray-400">
            <span className="sr-only">Next month</span>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm">
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
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-elegant-gold/10 cursor-pointer transition-all group outline-none focus-visible:ring-2 focus-visible:ring-elegant-gold/50 active-scale"
        title="날짜 선택"
        aria-label="Open date picker"
        aria-expanded={isOpen}
      >
        <CalendarDays className="text-elegant-gold w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && renderCalendar()}
    </div>
  );
};
