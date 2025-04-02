import React, { useState, useContext }from 'react'; 
import { WeatherWidget } from '../../components/WeatherWidget';
import { SearchWidget } from '../../components/SearchWidget';
import { locationsContext } from '../../locationsContext';
import { addLocation, deleteLocation, moveForward, moveBackward } from '../../functions/locationFunctions';
import { AlertLogs } from './components/AlertLogs';
import { ErrorPopup } from '../../components/ErrorPopup';

export const Alerts = () => {
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
                            <div className="weather-footer">
                                <AlertLogs weatherData={locationData}/>
                            </div>
                        </WeatherWidget>
                    ))
                }
                <SearchWidget onAddLocation={onAddLocation}/>
            </div>
        </>
    )
}
