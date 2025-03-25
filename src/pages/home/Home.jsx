import React, { useState, useEffect } from 'react';
import { NavBar } from '../../components/Navbar/NavBar';
import './Home.css';
import axios from 'axios';



export const Home = () => {
    const apiKey = 'ca7fa4eea17f1ddca4179ea69c71470b';
    const [forecastData, setForecastData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [airPollution, setAirPollution] = useState(null);
    const [city, setCity] = useState('London');

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
    }, [city]);

    useEffect(() => {
        if (currentData?.coord) {
            const fetchAirPollution = async () => {
                try {
                    const { lon, lat } = currentData.coord;
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

                    );
                    const data = await response.json();
                    setAirPollution(data.list[0].main.aqi);
                }
                catch (error) {
                    console.error('Error fetching air pollution data:', error);
                }
            };
            fetchAirPollution();
        }
    }, [currentData]);

    const formatTime = (dt_txt, index) => {
        if (index === 0) {
            return 'Now';
        }
        const date = new Date(dt_txt);
        return '${date.getHours()}:00';
    };

    const formatSunset = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    const getSunlightHours = (sunrise, sunset) => {
        const sunriseDate = new Date(sunrise * 1000);  
        const sunsetDate = new Date(sunset * 1000);   
    
        const sunlightDuration = sunsetDate - sunriseDate;  
        const sunlightHours = Math.floor(sunlightDuration / (1000 * 60 * 60)); 
       
    
        return `${sunlightHours} hours`;
    };
    const convertVissibility = (meters) => {
        const miles = meters/1609;
        return Math.round(miles);
    };
    const getPrecipitation = (value) => {
        if (data && data.rain && data.rain['1h']) {
            return data.rain['1h'];
        }
        return 0;
    };

    const getAQIDescription = (aqi) => {
        switch(aqi){
            case 1:
                return 'Good';
            case 2:
                return 'Fair';
            case 3:
                return 'Moderate';
            case 4:
                return 'Poor';
            case 5:
                return 'Very Poor';
            default:
                return 'N/A';
        }

    };
    if (!currentData || !forecastData || !forecastData.list) {
        return (
            <div className="home-container">
                <h1>Loading...</h1>
            </div>
        );
    }
    const currentTime = new Date().getHours(); 

    const forecastList = forecastData.list.slice(0, 7); 

    const nowForecast = forecastList.find(hour => new Date(hour.dt * 1000).getHours() === currentTime);


    const remainingForecast = forecastList.filter(hour => new Date(hour.dt * 1000).getHours() !== currentTime);

    const hourlyForecast = nowForecast ? [nowForecast, ...remainingForecast] : remainingForecast;

    const sunsetTime = formatSunset(currentData.sys.sunset); 
    const feelsLikeTemp = currentData?.main?.feels_like;

    return (

        <div className="home-container">
            <h1 className='MainText' >{currentData?.name}</h1>
            <div className="home-icon">
                <img src="/MainWeather.png" />
            </div>
            <div className="home-temperature">
                <div className='Feels-like-Text'> <p className="Feels-Like">Feels Like {Math.round(feelsLikeTemp)} </p> </div>
                <p className='CurrentTemp'>{Math.round(currentData.main.temp)}</p>
                <ul className='TempOptions'>
                    <li>C</li>
                    <li></li>
                    <li>F</li>
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
    {hourlyForecast.map((hour, index) => {
        const forecastHour = new Date(hour.dt * 1000);
        const isSunset = forecastHour.getHours() === new Date(currentData.sys.sunset * 1000).getHours();

        return (
            <li key={index}>
                {isSunset ? (

                    <>
                        <p>{sunsetTime}</p>
                        <img src="/sunset.png" className="Weather-conditions-icons" alt="Sunset" />
                        <p>{Math.round(hour.main.temp)}°C</p>
                    </>
                ) : (
                    <>
                        <p>{forecastHour.getHours()}:00</p>
                        <img src="/Weather.png" alt="Weather" className="Weather-conditions-icons" />
                        <p>{Math.round(hour.main.temp)}°C</p>
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