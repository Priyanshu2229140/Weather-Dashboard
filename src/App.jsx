import { useState } from "react";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "bff7e33b95e7b761bf3d40644744f12a";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recentCities, setRecentCities] = useState([]);

  // Fetch weather data from OpenWeatherMap API
  const getWeather = async (city) => {
    setIsLoading(true);
    setErrorMessage("");
    setWeatherData(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeatherData(data);

      // Update recent search list (limit to last 5, no duplicates)
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
      
      {/* Intro Text (disappears after first result) */}
      {!weatherData && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2 className="text-5xl md:text-7xl font-bold text-white/10 text-center">
            Your Weather, At a Glance.
          </h2>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
          🌦 Weather Dashboard
        </h1>

        {/* Search bar + refresh */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-grow">
            <SearchBar onSearch={getWeather} />
          </div>

          {weatherData && weatherData.name && (
            <button
              onClick={() => getWeather(weatherData.name)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-md shadow-blue-500/20 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
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

        {/* Loader */}
        {isLoading && <Loader />}

        {/* Error message */}
        {errorMessage && (
          <p className="text-center text-red-500">{errorMessage}</p>
        )}

        {/* Weather card */}
        {weatherData && <WeatherCard weather={weatherData} />}

        {/* Recent search list */}
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
