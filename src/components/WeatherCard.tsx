import React from 'react';
import DateValues from './DateValues';

interface Coordinates {
  lat: number;
  lon: number;
  dates: Array<DateValue>;
}

interface DateValue {
  date: string;
  value: number;
}

interface WeatherData {
  parameter: string;
  coordinates: Array<Coordinates>;
}

interface WeatherCardProps {
  data: WeatherData;
}

function WeatherCard({ data }: WeatherCardProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">{data.parameter}</h1>
      {data.coordinates.map((coord, index) => (
        <div key={index} className="mb-4">
          <p className="text-lg font-semibold">
            Coordinates: {coord.lat}, {coord.lon}
          </p>
          <DateValues dates={coord.dates} />
        </div>
      ))}
    </div>
  );
}

export default WeatherCard;
