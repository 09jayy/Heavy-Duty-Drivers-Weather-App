import React, {useState, useEffect} from 'react'; 
import { WeatherWidget } from './components/WeatherWidget';
import { moveIndexInArray } from './functions/weatherFunctions';
import './Weather.css'; 

/**
 * Page Component contains functionality of adding new weather to page in a list 
 * @returns JSX
 */
export const WeatherPage = ({searchedCity}) => {
    // Accept the prop from app.jsx and set it as the first location
    const [locations, setLocations] = useState(['london']); 
    
    useEffect(() => {
        if (searchedCity && !locations.includes(searchedCity.toLowerCase())) {
          setLocations((prev) => [...prev, searchedCity.toLowerCase()]);
        }
      }, [searchedCity]);
    //   will add the searchedCity to the locations list 
    // whenever searchedCity changes, 
    // as long as it’s not already in the list.

    const addLocation = (newLocation) => {
        setLocations((prev) => [...prev, newLocation]); 
    }

    const deleteLocation = (deleteLocation) => {
        setLocations((prev) => prev.filter((_,index) => index !== deleteLocation)); 
    }

    const moveForward = (index) => {
        setLocations((prev) => moveIndexInArray(prev,index, index+1)); 
    }

    const moveBackward = (index) => {
        setLocations((prev) => moveIndexInArray(prev,index, index-1)); 
    }

    return (
        <div id='container'>
            {
                locations.map((location,index) => (
                    <WeatherWidget 
                        key={index} 
                        city={location}  
                        onDeleteLocation={() => deleteLocation(index)}
                        moveForward={()=>moveForward(index)}
                        moveBackward={()=>moveBackward(index)}
                    />
                ))
            }
            <WeatherWidget onAddLocation={addLocation}/>
        </div>
    )
}

