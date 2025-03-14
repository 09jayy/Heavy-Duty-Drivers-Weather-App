import React, {useState} from 'react'; 
import { WeatherWidget } from './components/WeatherWidget';
import './Weather.css'; 

/**
 * Page Component contains functionality of adding new weather to page in a list 
 * @returns JSX
 */
export const WeatherPage = () => {
    const [weatherLocData, setWeatherLocData] = useState([{location: 'london', temp: 50}]) 

    return (
        <div id='container'>
            {
                weatherLocData.map((weather,index) => (
                    <WeatherWidget key={index} weatherData={weather}/>
                ))
            }
            <WeatherWidget/>
        </div>
    )
}

