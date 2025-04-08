import React from "react";

function WeatherCard({ weather }) {
  const { name, weather: weatherInfo, main, wind } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6 text-center">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <img src={iconUrl} alt={weatherInfo[0].description} className="mx-auto" />
      <p className="text-xl capitalize">{weatherInfo[0].description}</p>
      <p className="text-lg">🌡 {main.temp}°C</p>
      <p className="text-gray-700">💧 Humidity: {main.humidity}%</p>
      <p className="text-gray-700">🌬 Wind: {wind.speed} km/h</p>
    </div>
  );
}

export default WeatherCard;
