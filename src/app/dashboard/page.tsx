"use client";
import WeatherDataComponent from "@/components/WeatherDataComponent";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface Location {
  latitude: string;
  longitude: string;
}

interface WeatherData {
  version: string;
  user: string;
  dateGenerated: string;
  status: string;
  data: {
    parameter: string;
    coordinates: {
      lat: number;
      lon: number;
      dates: {
        date: string;
        value: number;
      }[];
    }[];
  }[];
}

const exData = {
  version: "3.0",
  user: "eos_data_analytics",
  dateGenerated: "2023-12-11T22:09:56Z",
  status: "OK",
  data: [
    {
      parameter: "t_mean_2m_1h:C",
      coordinates: [
        {
          lat: 33.558605,
          lon: 72.842985,
          dates: [
            { date: "2023-12-11T09:30:00Z", value: 18.1 },
            { date: "2023-12-11T10:30:00Z", value: 17.7 },
            { date: "2023-12-11T11:30:00Z", value: 15.9 },
            { date: "2023-12-11T12:30:00Z", value: 13.8 },
            { date: "2023-12-11T13:30:00Z", value: 12.3 },
            { date: "2023-12-11T14:30:00Z", value: 11.3 },
            { date: "2023-12-11T15:30:00Z", value: 10.4 },
            { date: "2023-12-11T16:30:00Z", value: 9.7 },
            { date: "2023-12-11T17:30:00Z", value: 9.1 },
            { date: "2023-12-11T18:30:00Z", value: 8.6 },
            { date: "2023-12-11T19:30:00Z", value: 8.2 },
            { date: "2023-12-11T20:30:00Z", value: 7.9 },
            { date: "2023-12-11T21:30:00Z", value: 8 },
          ],
        },
        {
          lat: 24.902112,
          lon: 67.157958,
          dates: [
            { date: "2023-12-11T09:30:00Z", value: 28.2 },
            { date: "2023-12-11T10:30:00Z", value: 27.9 },
            { date: "2023-12-11T11:30:00Z", value: 27 },
            { date: "2023-12-11T12:30:00Z", value: 25.6 },
            { date: "2023-12-11T13:30:00Z", value: 23.8 },
            { date: "2023-12-11T14:30:00Z", value: 22.2 },
            { date: "2023-12-11T15:30:00Z", value: 21.1 },
            { date: "2023-12-11T16:30:00Z", value: 20.2 },
            { date: "2023-12-11T17:30:00Z", value: 19.9 },
            { date: "2023-12-11T18:30:00Z", value: 19.3 },
            { date: "2023-12-11T19:30:00Z", value: 18.4 },
            { date: "2023-12-11T20:30:00Z", value: 17.7 },
            { date: "2023-12-11T21:30:00Z", value: 17.3 },
          ],
        },
      ],
    },
  ],
};

export default function Dashboard() {
  const [data, setData] = useState<WeatherData | null>(exData);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [locations, setLocations] = useState<Location[]>([
    { latitude: "33.5586049", longitude: "72.8429848" },
    { latitude: "24.902112", longitude: "67.1579584" },
  ]);

  const handleDateChange = (date: Date | null, type: string) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const addLocation = () => {
    setLocations([...locations, { latitude: "", longitude: "" }]);
  };

  const removeLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const handleLocationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newLocations: any = [...locations];
    newLocations[index][field] = value;
    setLocations(newLocations);
  };

  const dateTimeRangeFormated = (
    startDate: Date | null,
    endDate: Date | null
  ): string => {
    const isoStart = startDate?.toISOString().slice(0, 19) + "Z";
    const isoEnd = endDate?.toISOString().slice(0, 19) + "Z";
    const duration = "PT1H"; // Change this as needed
    return `${isoStart}--${isoEnd}:${duration}`;
  };
  const handleSubmit = async () => {
    const dateTimeRange = dateTimeRangeFormated(startDate, endDate);
    const res: AxiosResponse<WeatherData> = await axios.post(
      "/api/weather/temprature",
      {
        locations,
        dateTimeString: dateTimeRange,
      }
    );
    console.log("data", res.data);
    setData(res.data);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="w-full max-w-md px-8 py-4 bg-gray-100 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Select Date/Time Range</h2>
          <div className="flex flex-col mb-4">
            <label htmlFor="start-date" className="mb-2">
              Start Date:
            </label>
            <input
              type="datetime-local"
              id="start-date"
              value={startDate?.toISOString().slice(0, 16)}
              onChange={(e) =>
                handleDateChange(new Date(e.target.value), "start")
              }
              className="w-full px-3 py-2 border rounded shadow-sm"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="end-date" className="mb-2">
              End Date:
            </label>
            <input
              type="datetime-local"
              id="end-date"
              value={endDate?.toISOString().slice(0, 16)}
              onChange={(e) =>
                handleDateChange(new Date(e.target.value), "end")
              }
              className="w-full px-3 py-2 border rounded shadow-sm"
            />
          </div>
          <h2 className="text-xl font-bold mb-4">Enter Locations</h2>
          {locations.map((location, index) => (
            <div key={index} className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Latitude"
                value={location.latitude}
                onChange={(e) =>
                  handleLocationChange(index, "latitude", e.target.value)
                }
                className="w-full px-3 py-2 border rounded shadow-sm"
              />
              <input
                type="text"
                placeholder="Longitude"
                value={location.longitude}
                onChange={(e) =>
                  handleLocationChange(index, "longitude", e.target.value)
                }
                className="w-full px-3 py-2 border rounded shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeLocation(index)}
                className="px-4 py-2 bg-red-500 text-white rounded shadow-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLocation}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-sm"
          >
            Add Location
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded shadow-sm mt-4"
          >
            Submit
          </button>
        </div>
      </div>
      <WeatherDataComponent data={data} />
    </div>
  );
}
