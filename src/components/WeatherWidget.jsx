import React from "react";
import { MapPin, Trash2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

/**
 * returns template widget for weather data to be used in overview and alerts pages
 */
export const WeatherWidget = ({onDeleteLocation, moveForward, moveBackward, locationData, children}) => {  
  return (
      <div className="weather-card">
        <div className="weather-header">
          <div>
            <h2 className="city-name">
              <MapPin className="location-icon" />
              {locationData.name}
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
            {locationData.main?.temp && `${Math.round(locationData.main.temp)}°`}
          </div>
        </div>

        {children}

        <div className='actions ml-3 mr-3 mb-4'>
          <ArrowLeft className='bright-hover left-right-arrows' onClick={moveBackward}/>
          <ArrowUp className="bright-hover up-down-arrows" onClick={moveBackward}/>
          
          <Trash2 className='w-6 h-6 bright-hover' onClick={onDeleteLocation}/>
          
          <ArrowRight className="bright-hover left-right-arrows" onClick={moveForward}/>
          <ArrowDown className="bright-hover up-down-arrows" onClick={moveForward}/>
        </div>

      </div>
  )  
};