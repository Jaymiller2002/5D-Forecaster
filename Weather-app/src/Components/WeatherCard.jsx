import React from "react";

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) return null;

    return (
        <div className="weather-card">
            <p>{weatherData.day}</p>
            <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                alt={weatherData.description}
            />
            <p>{weatherData.description}</p>
            <p>Temperature: {weatherData.temp} F</p>
            <p>Humidity: {weatherData.humidity} %</p>
            <p>Wind Speed: {weatherData.windSpeed} m/s</p>
            <p>Forecast Time: {weatherData.dt_txt}</p>
        </div>
    )
}

export default WeatherCard;