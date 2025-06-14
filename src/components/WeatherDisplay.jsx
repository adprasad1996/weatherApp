import React, { useContext } from "react";
import { WeatherContext } from "./context/WeatherContextProvider";

const WeatherDisplay = () => {
  const { weatherData } = useContext(WeatherContext);

  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return (
      <p className="text-red-600 text-center font-semibold">
        No weather data available. Please try again.
      </p>
    );
  }

  const { name, main, weather } = weatherData;
  const temperatureCelsius = (main.temp - 273.15).toFixed(2);
  const temperatureFahrenheit = ((main.temp - 273.15) * 9/5 + 32).toFixed(2);
  const weatherCondition =
    weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-sky-200 rounded-xl shadow-xl p-6 text-gray-800 max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700 drop-shadow">
        🌍 Weather in <span className="text-emerald-600">{name}</span>
      </h2>
      <div className="space-y-3 text-lg font-medium">
        <p className="flex items-center gap-2">
          <span className="text-red-500">🌡️ Temperature:</span>
          <span className="text-gray-700">{temperatureCelsius}°C / {temperatureFahrenheit}°F</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-blue-500">💧 Humidity:</span>
          <span className="text-gray-700">{main.humidity}%</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-yellow-500">☁️ Conditions:</span>
          <span className="text-gray-700">{weatherCondition}</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
