import React, { useRef, useState } from "react";
import Spin from "./Spin";

const WeatherInput = ({ fetchWeather }) => {
  const cityRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = async () => {
    setLoading(true);
    await fetchWeather(cityRef.current);
    setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
      <input
        type="text"
        placeholder="Enter city name"
        onChange={(e) => (cityRef.current = e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleFetchWeather}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white transition-colors ${
          loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        } flex items-center justify-center`}
      >
        {loading ? <Spin /> : "Get Weather"}
      </button>
    </div>
  );
};

export default WeatherInput;
