// import axios from 'axios';

// const API_KEY = '0eb6f46bfd721e5fe0edd894f049f874'; // Replace with your OpenWeatherMap API key
// const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// export const getWeatherData = async (city) => {
//     const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
//     return response.data;
// };
// src/services/weatherService.js
export const getWeatherData = async (city) => {
    const API_KEY = '0eb6f46bfd721e5fe0edd894f049f874'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
};
