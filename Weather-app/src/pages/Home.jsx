import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import WeatherCard from "../Components/WeatherCard";
import { getWeatherByCoordinates, getWeatherByCityAndState } from "../API/weather";

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);

    //Function to handle city and state search and displays weather data
    const handleSearch = async (city, state) => {
        const data = await getWeatherByCityAndState(city, state);
        setWeatherData(data);

        if (data) {
            const processedData = processWeatherData(data);
            setWeatherData(processedData);
        }
    };

    const processWeatherData = (data) => {
        const groupedByDay = [];

        // Loop through the list of weather forecast data (every 3 hours)
        data.list.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000);// Convert from UNIX Timestamp
            const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });

            // Only add one entry per day
            if (groupedByDay.length < 5 && !groupedByDay.some(day => day.day === dayOfWeek)) {
                groupedByDay.push({
                    day: dayOfWeek,
                    temp: forecast.main.temp,
                    description: forecast.weather[0].description,
                    icon: forecast.weather[0].icon,
                    humidity: forecast.main.humidity,
                    windSpeed: forecast.wind.speed,
                    dt_txt: forecast.dt_txt 
                });
            }
        });

        return groupedByDay;
    };

    // Function to get weather by geo location
    // Will come back after I finished the design and look of the weather app
    const handleGeolocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const data = await getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
                if (data) {
                    const processedData = processWeatherData(data);
                    setWeatherData(processedData);
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Function to reset all weather data and start again
    const handleReset = () => {
        setWeatherData(null);

    };

    return (
        <div className="home">
            <h1>Weather App</h1>
            <button onClick={handleGeolocation}>Get Weather by Location</button>
            <SearchBar onSearch={handleSearch} onReset={handleReset} />
            {Array.isArray(weatherData) && weatherData.length > 0 ? (
                <div className="weather-cards">
                    {weatherData.map((day, index) => (
                        <WeatherCard key={index} weatherData={day} />
                    ))}
                </div>
            ) : (
                <p>No weather data available. Please search for a location.</p>
            )}
        </div>
    );
};

export default Home;