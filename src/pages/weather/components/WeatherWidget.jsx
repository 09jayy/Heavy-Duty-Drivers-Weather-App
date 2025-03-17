import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { SearchModal } from "./SearchModal";
import { fetchWeather } from "../../../functions/fetchWeather";
import { Plus ,Droplets, Thermometer, Wind, MapPin, Trash2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

export const WeatherWidget = ({city = null, onAddLocation = () => {}, onDeleteLocation = () => {}}) => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [weatherData, setWeatherData] = useState({});
  
    const fetchData = useCallback(async () => {
      if (!city) return;
      const data = await fetchWeather(city);
      data != null
        ? setWeatherData(data)
        : console.error("error: city not recognized");
    }, [city]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    if (city === null) {
      return (
        <div className="weather-card add-card">
          <div 
            onClick={() => {
              setShowSearchModal(true);
            }}
            className="add-location-button"
          >
            <Plus className="plus-icon" />
            <span>Add Location</span>
          </div>
          {showSearchModal &&
            createPortal(
              <SearchModal
                onClose={() => setShowSearchModal(false)}
                onSubmit={onAddLocation}
              />,
              document.body
            )}
        </div>
      );
    }
  
    return (
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
          <ArrowLeft className='bright-hover left-right-arrows'/>
          <ArrowUp className="bright-hover up-down-arrows"/>
          
          <Trash2 className='w-6 h-6 bright-hover' onClick={onDeleteLocation}/>
          
          <ArrowRight className="bright-hover left-right-arrows"/>
          <ArrowDown className="bright-hover up-down-arrows"/>
        </div>

      </div>
    );
  };