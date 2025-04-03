import React, { useState, useEffect } from 'react';
import { NavBar } from '../../components/Navbar/NavBar';
import './Home.css';
import axios from 'axios';

export const Home = ({ city }) => {
    const apiKey = 'ca7fa4eea17f1ddca4179ea69c71470b';
    const [forecastData, setForecastData] = useState([]);
    const [weatherData, setWeatherData] = useState(null)
    const [unit, setUnit] = useState('metric');
    const [errorLog, setErrorLog] = useState('');
    const [visibleHours, setVisibleHours] = useState(8);
    const [airPollution, setAirPollution] = useState(null);

    if (!city) { city = 'london'; } 

    // Function that converts Celsius to Fahrenheit
    const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32;

    useEffect(() => {
        const updateVisibleHours = () => {
            const width = window.innerWidth;
            if (width < 650) {
                setVisibleHours(3); 
            } else if (width < 860) {
                setVisibleHours(4);
            } else if (width < 1450) {
                setVisibleHours(5); 
            } else {
                setVisibleHours(8);
            }
        };

        updateVisibleHours();
        window.addEventListener('resize', updateVisibleHours);

        return () => window.removeEventListener('resize', updateVisibleHours);
    }, []);

    useEffect(() => {
        const handleApiError = (error) => {
            console.error(error);
            if (error.response?.status === 404) {
                setErrorLog('404: City not recognized. Please check the city name and try again.');
            } else if (error.response?.status === 500) {
                setErrorLog('500: Internal Server Error');
            } else {
                setErrorLog(error.message);
            }
        };

        const fetchWeather = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
                setWeatherData(response.data);
                setErrorLog('');
            } catch (error) {
                handleApiError(error);
            }
        };

        const fetchForecast = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
                setForecastData(response.data);
            } catch (error) {
                handleApiError(error);
            }
        };

        const fetchAirPollution = async () => {
            try {
                const { lon, lat } = weatherData.coord;
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

        if (city) {
            fetchWeather();
            fetchForecast();
            if (weatherData?.coord) {fetchAirPollution()}; 
        }
    }, [city, unit]);

    const fetchLocalTime = (timestamp, timezone) => {
        const date = new Date((timestamp + timezone) * 1000);
        return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
    };

    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
    };

    const formatSunset = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const getSunlightHours = (sunrise, sunset) => {
        const sunriseDate = new Date(sunrise * 1000);
        const sunsetDate = new Date(sunset * 1000);
        const sunlightHours = Math.floor((sunsetDate - sunriseDate) / (1000 * 60 * 60));
        console.log(`Sunset time in ${city}: ${sunsetDate.getUTCHours()}:${sunsetDate.getUTCMinutes()}`);
        return `${sunlightHours} hours`;
    };

    if (errorLog) {
        return (
            <div className='home-container'>
                <h1>{errorLog}</h1>
            </div>
        );
    }

    const currentTime = new Date().getHours();
    const forecastList = forecastData?.list?.slice(0, visibleHours) || [];
    const nowForecast = forecastList.find(hour => new Date(hour.dt * 1000).getHours() === currentTime);
    const remainingForecast = forecastList.filter(hour => new Date(hour.dt * 1000).getHours() !== currentTime);
    const hourlyForecast = nowForecast ? [nowForecast, ...remainingForecast] : remainingForecast;
    const sunsetTime = formatSunset(weatherData?.sys.sunset); 
    const feelsLikeTemp = weatherData?.main?.feels_like;

    const groupByDay = (data) => {        
        const dailyData = {};
        data.list.forEach((item) => {
            const date = new Date(item.dt * 1000).toLocaleDateString('en-GB');
            if (!dailyData[date]) {
                dailyData[date] = [];
            }
            dailyData[date].push(item);
        });
        return Object.entries(dailyData).slice(0, 5);
    };
    
    // Calculate average temperature/new
    const calculateAverageTemp = (dayData) => {
        const totalTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0);
        return Math.round(totalTemp / dayData.length);
    };

    return (
        <div className="home-container">
            <h1 className='MainText'>{weatherData?.name}</h1>
            <div className="home-icon">
                <img src="/MainWeather.png" alt="Weather Icon" />
            </div>
            <div className="home-temperature">
                <div className='Feels-like-Text'>
                    <p className="Feels-Like">Feels Like {unit === 'metric' ? Math.round(feelsLikeTemp) : Math.round(convertToFahrenheit(feelsLikeTemp))}° {unit === 'metric' ? 'C' : 'F'}</p>
                </div>
                <p className="CurrentTemp">
                    {unit === 'metric' ? (
                        <span>{Math.round(weatherData?.main?.temp)}°C</span>
                    ) : (
                        <span>{Math.round(convertToFahrenheit(weatherData?.main?.temp))}°F</span>
                    )}
                </p>
                <ul className='TempOptions'>
                    <li>
                        <button onClick={() => handleUnitChange('metric')} className={unit === 'metric' ? 'active' : ''}>C</button>
                    </li>
                    <li>|</li>
                    <li>
                        <button onClick={() => handleUnitChange('imperial')} className={unit === 'imperial' ? 'active' : ''}>F</button>
                    </li>
                </ul>
            </div>
            <div className="Weather-conditions">
                <ul>
                    <li>
                        <img src="/wind.png" className='Weather-conditions-icons' alt="Wind Icon" />
                        {weatherData?.wind?.speed} m/s
                    </li>
                    <li>
                        <img src="/drop.png" alt="Humidity Icon" />
                        {weatherData?.main?.humidity}%
                    </li>
                    <li>
                        <img src="/Sunlight.png" alt="Sunlight Icon" />
                        {getSunlightHours(weatherData?.sys?.sunrise, weatherData?.sys?.sunset)}
                    </li>
                </ul>
            </div>
            
            <div className='Hourly-forecast'>
                <div className='Hourly-forecast-header'>
                    <img src="/clock.png" className='Clock-Icon' alt="Clock Icon" />
                    <h2 className='Hourly-forecast-name'>Hourly Forecast {city}</h2>
                </div>
                <ul>
                    {hourlyForecast.sort((a, b) => a.dt - b.dt).map((hour, index) => {
                        const localTime = fetchLocalTime(hour.dt, weatherData?.timezone);
                        return (
                            <li key={index}>
                                <p>{localTime}</p>
                                <img src="/Weather.png" alt="Weather Icon" className="Weather-conditions-icons" />
                                <p>{unit === 'metric' ? Math.round(hour.main.temp) : Math.round(convertToFahrenheit(hour.main.temp))}° {unit === 'metric' ? 'C' : 'F'}</p>
                            </li>
                        );
                    })}
                </ul>

                <div className="Weekly-forecast-header">
                    <img src="/forcastimage.png" alt="Weather Icon" className="Weather-icon" />
                    <h2 className="Weekly-forecast-name">Weekly Forecast {city}</h2>
                </div>
                <div className="weekly-forecast">
                    {forecastData?.list && groupByDay(forecastData).map(([date, dayData], index) => {
                        // formats dates and displays the daily weather details
                        const formattedDate = date ? date.split('-').reverse().join('/') : 'Invalid Date';

                        return (
                            <div className="daily-forecast" key={index}>
                                <p>{formattedDate}</p>
                                <img src='/Weather.png' alt='Weather Icon' className='Weather-conditions-icons' />
                                <p>{calculateAverageTemp(dayData)}°C</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
