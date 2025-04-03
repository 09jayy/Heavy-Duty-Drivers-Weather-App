import React, {useState, useEffect, useContext, useCallback} from 'react'; 
import { WeatherWidget } from '../../components/WeatherWidget';
import { SearchWidget } from '../../components/SearchWidget'; 
import './Overview.css'; 
import { ErrorPopup } from '../../components/ErrorPopup';
import { locationsContext } from '../../locationsContext';
import { fetchWeather } from '../../functions/fetchWeather';
import { Droplets, Thermometer, Wind, MapPin, Trash2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { addLocation, deleteLocation, moveForward, moveBackward } from '../../functions/locationFunctions';

/**
 * Page Component contains functionality of adding new weather to page in a list 
 * @returns JSX
 */
export const Overview = () => {
    // Accept the prop from app.jsx and set it as the first location
    const {locations, setLocations} = useContext(locationsContext);  
    const [error, setError] = useState(''); 

    const onAddLocation = (newLocation) => {
        addLocation(newLocation, setLocations, setError); 
    }

    return (
        <>
            {error && <ErrorPopup message={error} handleClose={() => setError('')}/>}
            <div id='container'>
                {
                    locations.map((locationData,index) => (
                        <WeatherWidget
                            key={index} 
                            locationData={locationData}
                            onDeleteLocation={() => deleteLocation(index, setLocations)}
                            moveForward={()=>moveForward(index, setLocations)}
                            moveBackward={()=>moveBackward(index, setLocations)}
                        >
                            <div className="weather-info">
                                <div className="info-item">
                                    <Thermometer className="info-icon" />
                                    <div>
                                    <p className="info-label">Feels like</p>
                                    <p className="info-value">
                                        {locationData.main?.feels_like && `${Math.round(locationData.main.feels_like)}°`}
                                    </p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Droplets className="info-icon" />
                                    <div>
                                    <p className="info-label">Humidity</p>
                                    <p className="info-value">
                                        {locationData.main?.humidity && `${locationData.main.humidity}%`}
                                    </p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Wind className="info-icon" />
                                    <div>
                                    <p className="info-label">Wind</p>
                                    <p className="info-value">
                                        {locationData.wind?.speed && `${Math.round(locationData.wind.speed)} km/h`}
                                    </p>
                                    </div>
                                </div>
                                </div>
                        
                                <div className="weather-footer">
                                <div className="min-max">
                                    <span className="min-max-label">Low</span>
                                    <span className="min-max-value">
                                    {locationData.main?.temp_min && `${Math.round(locationData.main.temp_min)}°`}
                                    </span>
                                </div>
                                <div className="min-max">
                                    <span className="min-max-label">High</span>
                                    <span className="min-max-value">
                                    {locationData.main?.temp_max && `${Math.round(locationData.main.temp_max)}°`}
                                    </span>
                                </div>
                            </div>
                        </WeatherWidget>
                    ))
                }
                <SearchWidget onAddLocation={onAddLocation}/>
            </div>
        </>
    )
}

