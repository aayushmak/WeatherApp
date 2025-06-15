import React, { useEffect, useState } from 'react';
import './Weather.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setWeatherData(null);
        alert("City not found!");
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  const handleSearchClick = () => {
    if (city.trim() !== '') {
      search(city);
    }
  };

  // Optional: choose icon based on weather condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clouds': return cloud_icon;
      case 'Clear': return clear_icon;
      case 'Drizzle': return drizzle_icon;
      case 'Snow': return snow_icon;
      default: return clear_icon;
    }
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type="text"
          placeholder='Search'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={search_icon}
          alt="Search"
          onClick={handleSearchClick}
          style={{ cursor: "pointer" }}
        />
      </div>

      {weatherData ? (
        <>
          <img
            src={getWeatherIcon(weatherData.weather[0].main)}
            alt="Weather Icon"
            className='weather-icon'
          />
          <p className='temperature'>{Math.round(weatherData.main.temp)}°C</p>
          <p className='location'>{weatherData.name}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="Wind" />
              <div>
                <p>{Math.round(weatherData.wind.speed)} km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
