import { useState } from "react";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

// 🌤 Replace with your own OpenWeatherMap API key
const API_KEY = "bff7e33b95e7b761bf3d40644744f12a";

function App() {
  const [weatherData, setWeatherData] = useState(null); // Current weather info
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [recentCities, setRecentCities] = useState([]); // Search history

  // 🔄 Fetch weather info for a city
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

      // Update recent searches (keep last 5)
      setRecentCities((prev) => {
        const updated = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 text-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-xl mx-auto">
        {/* 🌦 Centered Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-center text-blue-800">🌦 Weather Dashboard</h1>
        </div>

        {/* City Search */}
        <SearchBar onSearch={getWeather} />

        {/* Status Messages */}
        {isLoading && <Loader />}
        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

        {/* Weather Info Card */}
        {weatherData && (
          <>
            <WeatherCard weather={weatherData} />
            <div className="text-center mt-4">
              <button
                onClick={() => getWeather(weatherData.name)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                🔄 Refresh Weather
              </button>
            </div>
          </>
        )}

        {/* Recent Search Buttons */}
        {recentCities.length > 0 && (
          <div className="mt-6 text-center">
            <h3 className="font-semibold mb-2">Recent Searches</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {recentCities.map((city, index) => (
                <button
                  key={index}
                  className="bg-white px-3 py-1 rounded shadow hover:bg-gray-100"
                  onClick={() => getWeather(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
