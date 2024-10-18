import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../services/weatherService';
import { updateDailySummary, getDailySummaries } from '../utils/weatherUtils';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('Delhi');
    const [weather, setWeather] = useState(null);
    const [dailySummary, setDailySummary] = useState(null);
    const [error, setError] = useState(null);
    const [tempUnit, setTempUnit] = useState('Kelvin'); // Default to Kelvin
    const [alert, setAlert] = useState('');

    const fetchWeather = async () => {
        try {
            const data = await getWeatherData(city);
            setWeather(data);
            updateDailySummary(data, setDailySummary); // Update daily summary
            checkAlerts(data); // Check for alerts
        } catch (err) {
            setError(err.message);
        }
    };

    const checkAlerts = (data) => {
        const temperatureC = data.main.temp - 273.15; // Convert from Kelvin to Celsius
        if (temperatureC > 35) {
            setAlert(`Alert! The temperature in ${data.name} is exceeding 35°C.`);
        } else {
            setAlert('');
        }
    };

    const handleGetWeather = () => {
        fetchWeather();
    };

    useEffect(() => {
        const interval = setInterval(fetchWeather, 300000); // Fetch every 5 minutes
        return () => clearInterval(interval);
    }, [city]);

    return (
        <div className="weather-container">
            <h1 className="title">Real-Time Weather</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="city-input"
            />
            <button onClick={handleGetWeather} className="fetch-button">Get Weather</button>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-summary">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp} K</p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <p>{alert && <span className="alert">{alert}</span>}</p>
                </div>
            )}
            {dailySummary && (
                <div className="daily-summary">
                    <h3>Daily Summary</h3>
                    <p>Average Temperature: {dailySummary.avgTemp} °C</p>
                    <p>Maximum Temperature: {dailySummary.maxTemp} °C</p>
                    <p>Minimum Temperature: {dailySummary.minTemp} °C</p>
                    <p>Dominant Weather: {dailySummary.dominantCondition}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
