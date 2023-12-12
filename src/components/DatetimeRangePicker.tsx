"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';

interface DatetimeRangePickerProps {
  onRangeChange: (rangeString: string) => void;
}

const DatetimeRangePicker: React.FC<DatetimeRangePickerProps> = ({ onRangeChange }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1)); // Default to one day ahead

  const handleEndDateChange = () => {
    const startISOString = startDate.toISOString();
    const endISOString = endDate.toISOString();
    const duration = `P${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}D`;
    const rangeString = `${startISOString}--${endISOString}:${duration}`;

    onRangeChange(rangeString);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="yyyy-MM-dd HH:mm:ss"
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => {
          setEndDate(date);
          handleEndDateChange(); // Automatically trigger callback on end date change
        }}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="yyyy-MM-dd HH:mm:ss"
      />
    </div>
  );
};

export default DatetimeRangePicker;
