const ForecastCard = ({ forecast }) => {
    const date = new Date(forecast.dt_txt);
    const day = date.toLocaleDateString(undefined, { weekday: 'short' });
    const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
  
    return (
      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center shadow-md dark:bg-white/10">
        <p className="font-semibold">{day}</p>
        <img src={iconUrl} alt={forecast.weather[0].description} className="w-12 h-12 mx-auto" />
        <p>{Math.round(forecast.main.temp)}°C</p>
      </div>
    );
  };
  
  export default ForecastCard;
  