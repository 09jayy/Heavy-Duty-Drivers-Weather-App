import React, { useState, useEffect } from 'react';
import { NavBar } from '../../components/Navbar/NavBar';
import './Home.css';
import axios from 'axios';


export const Home = ({searchedCity}) => { 
    const apiKey = 'ca7fa4eea17f1ddca4179ea69c71470b';
    const [forecastData, setForecastData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [city, setCity] = useState(searchedCity || 'London');
    const [unit, setUnit] = useState('metric');
    const [visibleHours, setVisibleHours] = useState(8);

    // Function that converts Celsius to Fahrenheit
    const convertToFahrenheit = (celsius) => {
        return (celsius * 9/5) + 32;
      };


    useEffect(() => {
        const updateVisibleHours = () => {
            const width = window.innerWidth;
            if (width < 650) {
                setVisibleHours(3); // Mobile devices
            }else if (width < 860) {
                setVisibleHours(4); // Smallest screens
            } else if (width < 1450) {
                setVisibleHours(5); // Tablets
            } else {
                setVisibleHours(8); // Default for larger screens
            }
        };

        // Run on mount and when window resizes
        updateVisibleHours();
        window.addEventListener('resize', updateVisibleHours);

        return () => window.removeEventListener('resize', updateVisibleHours);
    }, []);

    // check if searchedCity is not null and set it to city
    useEffect(() => {
        if (searchedCity) {
            setCity(searchedCity);
        }
    }, [searchedCity]);



    // get the current weather and forecast data from the API
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
                setCurrentData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const fetchForecast = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
                setForecastData(response.data);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };
        fetchWeather();
        fetchForecast();
    }, [city, unit]);

    // get the local time from the API
    const fetchLocalTime = (timestamp, timezone) => {
        const date = new Date((timestamp + timezone) * 1000);
        return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
    };
    // handle the change between Celsius and Fahrenheit
    const handleUnitChange = (unit) => {
        setUnit(unit);
         if (searchedCity) {
            fetchWeather(searchedCity);
            fetchForecast(searchedCity);
      }
    };
    // function that gets the hours of sunlight
    const getSunlightHours = (sunrise, sunset) => {
        const sunriseDate = new Date(sunrise * 1000);  
        const sunsetDate = new Date(sunset * 1000);   
    
        const sunlightDuration = sunsetDate - sunriseDate;  
        const sunlightHours = Math.floor(sunlightDuration / (1000 * 60 * 60)); 
        // log the hour of the current cities sunset to check.
        console.log(`Sunset time in ${city}: ${sunsetDate.getUTCHours()}:${sunsetDate.getUTCMinutes()}`);
       
    
        return `${sunlightHours} hours`;
    };
    
    //  if the page is loading, show the loading screen
    if (!currentData || !forecastData || !forecastData.list) {
        return (
            <div className="home-container">
                <h1>Loading...</h1>
            </div>
        );
    }

    const currentTime = new Date().getHours();
    const forecastList = forecastData.list.slice(0, visibleHours); 
    const nowForecast = forecastList.find(hour => new Date(hour.dt * 1000).getHours() === currentTime);
    const remainingForecast = forecastList.filter(hour => new Date(hour.dt * 1000).getHours() !== currentTime);
    const hourlyForecast = nowForecast ? [nowForecast, ...remainingForecast] : remainingForecast;
    const sunsetTime = fetchLocalTime(currentData.sys.sunset, currentData.timezone);
    const feelsLikeTemp = currentData?.main?.feels_like;

    return (

        <div className="home-container">
            <h1 className='MainText' >{currentData?.name}</h1>
            <div className="home-icon">
                <img src="/MainWeather.png" />
            </div>
            <div className="home-temperature">
                <div className='Feels-like-Text'> <p className="Feels-Like">Feels Like {unit === 'metric' ? Math.round(feelsLikeTemp) : Math.round(convertToFahrenheit(feelsLikeTemp))}° {unit === 'metric' ? 'C' : 'F'} </p> </div>
                <p className="CurrentTemp"> 
                    {/* converst between Fahrenheit and Celcius*/}
                    {unit === 'metric' ? (
                        <span>{Math.round(currentData?.main?.temp)}°C</span>
                    ) : (
                        <span>{Math.round(convertToFahrenheit(currentData?.main?.temp))}°F</span>
                    )}
                </p>
                <ul className='TempOptions'>
                    <li>
                        <button onClick={() => handleUnitChange('metric')}
                        className={unit === 'metric' ? 'active' : ''}>C </button>
                    </li>
                    <li>|</li>
                    <li>
                        <button onClick={() => handleUnitChange('imperial')}
                        className={unit === 'imperial' ? 'active' : ''}    >F</button>    
                    </li>
                </ul>
            </div>
            <div className="Weather-conditions">
                <ul>
                    <li>
                        <img src="/wind.png" className='Weather-conditions-icons' />
                        {currentData?.wind?.speed} m/s
                    </li>
                    <li>
                        <img src="/drop.png" />
                        {currentData.main.humidity}%
                    </li>
                    <li>
                        <img src="/Sunlight.png" />
                        {getSunlightHours(currentData.sys.sunrise, currentData.sys.sunset)}
                    </li>
                </ul>
            </div>
            <div className='Hourly-forecast'>
                <div className='Hourly-forecast-header'>
                    <img src="/clock.png" className='Clock-Icon' />
                    <h2 className='Hourly-forecast-name'>Hourly Forecast {city}</h2>
                </div>

                <ul>
                {hourlyForecast.sort((a, b) => a.dt - b.dt) 
                    .map((hour, index) => {
                    // Convert timestamp to hour and check if it matches sunset time
                    const localTime = fetchLocalTime(hour.dt, currentData.timezone);
                    const hourTime = new Date(hour.dt * 1000).getHours();
                    const sunsetHour = new Date(currentData.sys.sunset * 1000).getHours();

                    const isSunset = Math.abs(hourTime - sunsetHour) <= 1.5;

                        return (
                            // index is used so that each hour doesnt need to be written out
                            // the index is used as a key for each hour
                            // checks if the hour is the sunset hour
                            // if it is, it shows the sunset icon and the sunset time
                            // if not, it shows the weather icon and the hour
                            <li key={index}>
                                {isSunset ? (

                                    <>
                                        <p>{sunsetTime}</p>
                                        <img src="/sunset.png" className="Weather-conditions-icons" alt="Sunset" />
                                        <p>{unit === 'metric' ? Math.round(hour.main.temp) : Math.round(convertToFahrenheit(hour.main.temp))}° {unit === 'metric' ? 'C' : 'F'}</p>
                                    </>
                                ) : (
                                    <>
                                        <p>{localTime}</p>
                                        <img src="/Weather.png" alt="Weather" className="Weather-conditions-icons" />
                                        <p>{unit === 'metric' ? Math.round(hour.main.temp) : Math.round(convertToFahrenheit(hour.main.temp))}° {unit === 'metric' ? 'C' : 'F'}</p>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>

            </div>
        </div>
    );
};