import React from "react";

function WeatherCard({ weather }) {
  const { name, weather: weatherInfo, main, wind } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`;

  return (
    <div className="bg-[rgba(10,25,47,0.6)] backdrop-blur-md text-white border border-blue-400 shadow-[0_0_20px_rgba(0,174,255,0.4)] rounded-2xl p-6 mt-6 text-center max-w-md mx-auto transition-all duration-300">
      <h2 className="text-3xl font-semibold mb-3 tracking-wide">{name}</h2>

      <img
        src={iconUrl}
        alt={weatherInfo[0].description}
        className="mx-auto w-24 h-24 mb-2"
      />

      <p className="text-lg capitalize tracking-widest mb-4 opacity-90">
        {weatherInfo[0].description}
      </p>

      <div className="space-y-2 text-base">
        <p>🌡 <span className="font-medium">{main.temp}°C</span></p>
        <p>💧 Humidity: <span className="font-medium">{main.humidity}%</span></p>
        <p>🌬 Wind: <span className="font-medium">{wind.speed} km/h</span></p>
      </div>
    </div>
  );
}

export default WeatherCard;
