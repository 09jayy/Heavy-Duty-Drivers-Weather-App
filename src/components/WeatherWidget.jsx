import React, { useState, useEffect, useCallback } from "react";
import { fetchWeather } from "../functions/fetchWeather";
import { Droplets, Thermometer, Wind, MapPin, Trash2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

export const WeatherWidget = ({city, onDeleteLocation, moveForward, moveBackward, setError, removeLatestLocation}) => {
    const [weatherData, setWeatherData] = useState({});
    const [returnComponent, setReturnComponent] = useState(true); 

    const fetchData = useCallback(async () => {
      try {
        const data = await fetchWeather(city);
        console.log("Fetched weather data:", data); 
        setWeatherData(data); 
      } catch(error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            setError('City not recognized. Please check the city name and try again.');
          } else if (statusCode === 500) {
            setError('Internal Server Error. Please try again later.');
          } else {
            setError(`An unexpected error occurred. Status code: ${statusCode}`);
          }
        } else if (error.request) {
          setError('No response from the server. Please check your network connection.');
        } else {
          setError('Error in request setup: ' + error.message);
        }

        setReturnComponent(false);
        removeLatestLocation(); 
        console.error('Error:', error.message);
      }
    }, [city]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    return (
      returnComponent ? 
      <div className="weather-card">
        <div className="weather-header">
          <div>
            <h2 className="city-name">
              <MapPin className="location-icon" />
              {weatherData.name}
            </h2>
            <p className="weather-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short", 
                day: "numeric"
              })}
            </p>
          </div>
          <div className="temperature">
            {weatherData.main?.temp && `${Math.round(weatherData.main.temp)}°`}
          </div>
        </div>
  
        <div className="weather-info">
          <div className="info-item">
            <Thermometer className="info-icon" />
            <div>
              <p className="info-label">Feels like</p>
              <p className="info-value">
                {weatherData.main?.feels_like && `${Math.round(weatherData.main.feels_like)}°`}
              </p>
            </div>
          </div>
          <div className="info-item">
            <Droplets className="info-icon" />
            <div>
              <p className="info-label">Humidity</p>
              <p className="info-value">
                {weatherData.main?.humidity && `${weatherData.main.humidity}%`}
              </p>
            </div>
          </div>
          <div className="info-item">
            <Wind className="info-icon" />
            <div>
              <p className="info-label">Wind</p>
              <p className="info-value">
                {weatherData.wind?.speed && `${Math.round(weatherData.wind.speed)} km/h`}
              </p>
            </div>
          </div>
        </div>
  
        <div className="weather-footer">
          <div className="min-max">
            <span className="min-max-label">Low</span>
            <span className="min-max-value">
              {weatherData.main?.temp_min && `${Math.round(weatherData.main.temp_min)}°`}
            </span>
          </div>
          <div className="min-max">
            <span className="min-max-label">High</span>
            <span className="min-max-value">
              {weatherData.main?.temp_max && `${Math.round(weatherData.main.temp_max)}°`}
            </span>
          </div>
        </div>

        <div className='actions ml-3 mr-3 mb-4'>
          <ArrowLeft className='bright-hover left-right-arrows' onClick={moveBackward}/>
          <ArrowUp className="bright-hover up-down-arrows" onClick={moveBackward}/>
          
          <Trash2 className='w-6 h-6 bright-hover' onClick={onDeleteLocation}/>
          
          <ArrowRight className="bright-hover left-right-arrows" onClick={moveForward}/>
          <ArrowDown className="bright-hover up-down-arrows" onClick={moveForward}/>
        </div>

      </div>
    : null);
  };