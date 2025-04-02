import React, {useState, useEffect, useContext} from 'react'; 
import { WeatherWidget } from '../../components/WeatherWidget';
import { SearchWidget } from '../../components/SearchWidget'; 
import { moveIndexInArray } from './functions/weatherFunctions';
import './Weather.css'; 
import { ErrorPopup } from '../../components/ErrorPopup';
import { locationsContext } from '../../locationsContext';

/**
 * Page Component contains functionality of adding new weather to page in a list 
 * @returns JSX
 */
export const WeatherPage = ({searchedCity}) => {
    // Accept the prop from app.jsx and set it as the first location
    const {locations, setLocations} = useContext(locationsContext); 
    const [error, setError] = useState(''); 

    // useEffect(() => {
    //     if (searchedCity && !locations.includes(searchedCity.toLowerCase())) {
    //         setLocations((prev) => [...prev, searchedCity.toLowerCase()]);
    //     }
    // }, [searchedCity]);
    // //   will add the searchedCity to the locations list 
    // // whenever searchedCity changes, 
    // // as long as it’s not already in the list.

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
        <>
            {error && <ErrorPopup message={error} handleClose={() => setError('')}/>}
            <div id='container'>
                {
                    locations.map((location,index) => (
                        <WeatherWidget 
                            key={index} 
                            city={location}  
                            setError={setError}
                            cleanLocationsList={() => cleanLocationsList}
                            onDeleteLocation={() => deleteLocation(index)}
                            moveForward={()=>moveForward(index)}
                            moveBackward={()=>moveBackward(index)}
                        />
                    ))
                }
                <SearchWidget onAddLocation={addLocation}/>
            </div>
        </>
    )
}

