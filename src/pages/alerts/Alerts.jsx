import React, { useState }from 'react'; 
import { WeatherWidget } from '../weather/components/WeatherWidget';
import { AlertsWidget } from './components/AlertsWidget';

export const Alerts = () => {
    const [locations, setLocations] = useState(['london']); 

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