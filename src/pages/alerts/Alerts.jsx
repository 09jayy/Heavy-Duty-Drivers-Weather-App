import React, { useState, useContext }from 'react'; 
import { WeatherWidget } from '../../components/WeatherWidget';
import { AlertsWidget } from './components/AlertsWidget';
import { locationsContext } from '../../locationsContext';

export const Alerts = () => {
    const [locations, setLocations] = useContext(locationsContext); 

    const addLocation = (newLocation) => {
        setLocations((prev) => [...prev, newLocation]); 
    }

    return (
        <div id='container'>
                {
                locations.map((location,index) => (
                    <AlertsWidget
                        key={index} 
                        city={location}  
                        onDeleteLocation={() => deleteLocation(index)}
                    />
                ))
            }
            <WeatherWidget onAddLocation={addLocation}/>
        </div>
    ); 
}