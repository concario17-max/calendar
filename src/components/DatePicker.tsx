import React, { useState, useEffect, useRef } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

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
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(pickerDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setPickerDate(newDate);
  };

  const handleDateClick = (d: number) => {
    onDateChange(new Date(pickerDate.getFullYear(), pickerDate.getMonth(), d));
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const y = pickerDate.getFullYear();
    const m = pickerDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    
    const selectedY = selectedDate.getFullYear();
    const selectedM = selectedDate.getMonth();
    const selectedD = selectedDate.getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = y === selectedY && m === selectedM && d === selectedD;
      days.push(
        <button
          key={`day-${d}`}
          onClick={() => handleDateClick(d)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isSelected 
              ? 'bg-elegant-gold text-white font-bold'
              : 'text-warm-gray-600 dark:text-warm-gray-400 hover:bg-elegant-gold hover:text-white dark:hover:text-ray-dark'
          }`}
        >
          {d}
        </button>
      );
    }
    
    return (
      <div className="absolute top-14 left-0 sm:left-auto sm:right-0 mt-2 bg-white dark:bg-ray-dark/95 backdrop-blur-xl border border-warm-gray-200 dark:border-warm-gray-800 rounded-[2rem] shadow-2xl p-6 w-[320px] z-50 transition-all duration-300 transform scale-100 opacity-100">
        <div className="flex justify-between items-center mb-6 px-2">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-800 rounded-full transition-colors text-warm-gray-600 dark:text-warm-gray-400">
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold font-serif text-lg tracking-wide text-warm-gray-800 dark:text-warm-gray-200">
            {monthNames[m]} {y}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-800 rounded-full transition-colors text-warm-gray-600 dark:text-warm-gray-400">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-xs font-bold text-warm-gray-400 mb-2">{day}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const handleNativeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split("-").map(Number);
    onDateChange(new Date(y, m - 1, d));
  };

  return (
    <div className="relative flex items-center" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-elegant-gold/10 cursor-pointer transition-all group"
        title="Select Date"
      >
        <CalendarDays className="text-elegant-gold w-5 h-5 group-hover:scale-110 transition-transform" />
        
        {/* Native Date Input Trigger (Hidden) */}
        <input 
          type="date" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-[0px]"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleNativeInputChange}
          onClick={(e) => {
              e.preventDefault(); 
          }}
        />
      </div>

      {isOpen && renderCalendar()}
    </div>
  );
};
