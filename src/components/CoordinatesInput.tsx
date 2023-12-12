"use client";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import DatetimeRangePicker from "./DatetimeRangePicker";
import { useCartStore } from "@/store/zustand";

interface CoordinatesInputProps {
  onCoordinatesChange: (lat: number, lon: number) => void;
}
const getDefaultStartDate = () => {
  const last48Hours = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
  const fortyEightHoursAgo = new Date(Date.now() - last48Hours);
  const currentDatetime = new Date();
  return `${fortyEightHoursAgo.toISOString()}--${currentDatetime.toISOString()}:P2D`;
};

function CoordinatesInput({ onCoordinatesChange }: CoordinatesInputProps) {
  const [lat, setLat] = useState<number>(33.6162509);
  const [lon, setLon] = useState<number>(72.7564374);
  const [dateTimeString, setDateTimeString] = useState<string>(getDefaultStartDate());

  const handleLatChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLat(parseFloat(event.target.value));
  };

  const handleLonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLon(parseFloat(event.target.value));
  };

  const handleCoordinatesSubmit = async () => {
    onCoordinatesChange(lat, lon);
    const res = await axios.post("/api/weather/temprature", {
      lat,
      lon,
      dateTimeString,
    });
    console.log("res", res);
  };

  const handleRangeChange = (rangeString: string) => {
    setDateTimeString(rangeString);
    console.log(rangeString);
    // You can use the rangeString as needed (e.g., in API requests)
  };
  const {add: handleAddToCart, cart } = useCartStore();


  return (
    <div className="mb-4">
      Cart {cart}
       <button onClick={handleAddToCart}>
        Add To Cart
      </button>
      <DatetimeRangePicker onRangeChange={handleRangeChange} />

      <label className="block text-sm font-semibold mb-1">Latitude:</label>
      <input
        type="number"
        step="any"
        placeholder="Enter latitude"
        value={lat}
        onChange={handleLatChange}
        className="border rounded-md p-2"
      />

      <label className="block text-sm font-semibold mt-2 mb-1">
        Longitude:
      </label>
      <input
        type="number"
        step="any"
        placeholder="Enter longitude"
        value={lon}
        onChange={handleLonChange}
        className="border rounded-md p-2"
      />

      <button
        onClick={handleCoordinatesSubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </div>
  );
}

export default CoordinatesInput;
