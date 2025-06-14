import React, { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

function WeatherContextProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(`http://localhost:5000/api/weather/${city}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        error,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherContextProvider };
