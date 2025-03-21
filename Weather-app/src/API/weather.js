import axios from "axios";

const API_KEY = '9fd938103ec5b5fb92be500ba2c85323';
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeatherByCoordinates = async (lat, lon) => {
    try {
        const response = await axios.get(
            `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
        );

        // console.log("API Response: ", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fectching weather: ", error.response?.data || error.message);
        return null;
    }
};

export const getWeatherByCityAndState = async (city, state) => {
    try {
        const response = await axios.get(
            `${BASE_URL}?q=${city},${state}&appid=${API_KEY}&units=imperial`
        );
        // console.log("API Resposne: ", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching weather data", error.message);
        return null;
    }
};