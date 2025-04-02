import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { SearchModal } from "../../../components/SearchModal";
import { fetchWeather } from "../../../functions/fetchWeather";
import { Plus ,Droplets, Thermometer, Wind, MapPin, Trash2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { AlertLogs } from "./AlertLogs";

export const AlertsWidget = ({city = null, onAddLocation}) => {
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
  
        <div className="weather-footer">

          <AlertLogs city={city}/>
        </div>
  
     


      </div>
    );
  };