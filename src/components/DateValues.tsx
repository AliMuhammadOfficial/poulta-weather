import React from 'react';

interface DateValue {
  date: string;
  value: number;
}

interface DateValuesProps {
  dates: Array<DateValue>;
}

function DateValues({ dates }: DateValuesProps) {
  return (
    <ul>
      {dates.map((date, index) => (
        <li key={index} className="mb-2">
          <span className="font-semibold">{date.date}:</span> {date.value}°C
        </li>
      ))}
    </ul>
  );
}

export default DateValues;
