import { useState } from "react";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/forcastcard";

const API_KEY = "bff7e33b95e7b761bf3d40644744f12a"; // API key intigration for OpenWeatherMap

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recentCities, setRecentCities] = useState([]);

  const getWeather = async (city) => {
    setIsLoading(true);
    setErrorMessage("");
    setWeatherData(null);
    setForecastData([]);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastJson = await forecastRes.json();
      const daily = forecastJson.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecastData(daily.slice(0, 5));

      setRecentCities((prev) => {
        const updated = [city, ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase())];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a192f] text-white p-6 transition-all duration-300 overflow-hidden">
      {!weatherData && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2 className="text-5xl md:text-7xl font-bold text-white/10 text-center">
            Your Weather, At a Glance.
          </h2>
        </div>
      )}

      <div className="relative z-10 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
          🌦 Weather Dashboard
        </h1>

        {/* Search bar + refresh button */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-grow">
            <SearchBar onSearch={getWeather} />
          </div>

          {weatherData?.name && (
            <button
              onClick={() => getWeather(weatherData.name)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-md hover:scale-105 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v6h6M20 20v-6h-6M5 19a9 9 0 0113-13"
                />
              </svg>
              Refresh
            </button>
          )}
        </div>

        {isLoading && <Loader />}
        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

        {weatherData && <WeatherCard weather={weatherData} />}

        {/* 5-day forecast */}
        {forecastData.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-center">5-Day Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {forecastData.map((forecast, idx) => (
                <ForecastCard key={idx} forecast={forecast} />
              ))}
            </div>
          </div>
        )}

        {/* Recent search history */}
        {recentCities.length > 0 && (
          <div className="mt-8 text-center">
            <h3 className="font-semibold mb-2 text-white/80">Recent Searches</h3>
            <div className="text-blue-400 font-medium space-x-2">
              {recentCities.map((city, index) => (
                <span key={index}>
                  <button
                    onClick={() => getWeather(city)}
                    className="hover:underline hover:text-blue-300 transition"
                  >
                    {city}
                  </button>
                  {index < recentCities.length - 1 && (
                    <span className="mx-1 text-blue-300">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
