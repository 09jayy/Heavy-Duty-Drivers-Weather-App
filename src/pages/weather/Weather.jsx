import React, {useState, useEffect} from 'react'; 
import { WeatherWidget } from './components/WeatherWidget';
import { fetchWeather } from '../../functions/fetchWeather';
import './Weather.css'; 

/**
 * Page Component contains functionality of adding new weather to page in a list 
 * @returns JSX
 */
export const WeatherPage = () => {
    const [locations, setLocations] = useState(['london']); 

    const addLocation = (newLocation) => {
        setLocations((prev) => [...prev, newLocation]); 
    }

    const deleteLocation = (deleteLocation) => {
        setLocations((prev) => prev.filter((_,index) => index !== deleteLocation)); 
    }

    return (
        <div id='container'>
            {
                locations.map((location,index) => (
                    <WeatherWidget key={index} city={location}  onDeleteLocation={() => deleteLocation(index)}/>
                ))
            }
            <WeatherWidget onAddLocation={addLocation}/>
        </div>
    )
}

