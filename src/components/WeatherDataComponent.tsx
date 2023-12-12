"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import mapboxgl from "mapbox-gl";

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

interface WeatherDataComponentProps {
  data: WeatherData;
}

const WeatherDataComponent: React.FC<WeatherDataComponentProps> = ({
  data,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    // Function to render the line chart
    const renderLineChart = (
      coordinates: WeatherData["data"][0]["coordinates"]
    ) => {
      const ctx = canvasRef.current!.getContext("2d");

      // Destroy existing chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const dates = coordinates[0].dates.map((item) => item.date);
      const values = coordinates.map((location) =>
        location.dates.map((item) => item.value)
      );

      // Create new chart
      chartRef.current = new Chart(ctx!, {
        type: "line",
        data: {
          labels: dates,
          datasets: values.map((location, index) => ({
            label: `Location ${index + 1}`,
            data: location,
            borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${
              Math.random() * 255
            },1)`,
            fill: false,
          })),
        },
      });
    };

    // Function to render the map
    const renderMap = (coordinates: WeatherData["data"][0]["coordinates"]) => {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinates[0].lon, coordinates[0].lat],
        zoom: 8,
      });

      coordinates.forEach((location) => {
        new mapboxgl.Marker()
          .setLngLat([location.lon, location.lat])
          .addTo(map);
      });
    };

    if (data.data && data.data.length > 0) {
      const coordinates = data.data[0].coordinates;
      renderLineChart(coordinates);
      renderMap(coordinates);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <canvas ref={canvasRef} className="w-full mb-4 mx-10"></canvas>
      <div
        ref={mapContainerRef}
        className="w-full h-96 border border-gray-300 rounded"
      />
       <h2 className="text-2xl font-bold mt-4">Weather Data Table</h2>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Parameter
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Latitude
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Longitude
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item) => (
            item.coordinates.map((location) => (
              location.dates.map((dateItem) => (
                <tr key={`${item.parameter}-${location.lat}-${location.lon}-${dateItem.date}`}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.parameter}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {location.lat}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {location.lon}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {dateItem.date}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {dateItem.value}
                  </td>
                </tr>
              ))
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherDataComponent;
