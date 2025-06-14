import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherInput from "./WeatherInput";
import WeatherDisplay from "./WeatherDisplay";
import { WeatherContext } from "./context/WeatherContextProvider";

const WeatherApp = () => {
  const { weatherData, error, fetchWeather } = useContext(WeatherContext);
  const navigate = useNavigate();

  // Protect route: redirect if token is not available
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-gray-300 via-gray-100 to-sky-400
  p-4"
    >
      <div className="flex justify-between items-center p-4 rounded shadow mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🌦️ Weather App</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <WeatherInput fetchWeather={fetchWeather} />
        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}
        {weatherData && <WeatherDisplay />}
      </div>
    </div>
  );
};

export default WeatherApp;
