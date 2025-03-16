import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { SearchModal } from "./SearchModal";
import { fetchWeather } from "../../../functions/fetchWeather";
import axios from "axios";

export const WeatherWidget = ({city = null, onAddLocation = () => {}}) => {
    const [showSearchModal, setShowSearchModal] = useState(false);  
    const [weatherData, setWeatherData] = useState({});

    const fetchData = useCallback(async () => {
        if (!city) return; 

        const data = await fetchWeather(city); 

        (data != null) ? setWeatherData(data) : console.error('error: city not recgonised');  
    }, [city]); 

    useEffect(() => {
        fetchData();
    }, [fetchData]); 

    return (
        <div>
        {city === null ? (
            <>
                <p onClick={() => { 
                    setShowSearchModal(true); 
                    console.log('search'); 
                }}>
                    +
                </p>
                {showSearchModal && createPortal(
                    <SearchModal onClose={()=>setShowSearchModal(false)} onSubmit={onAddLocation}/>,
                    document.body
                )}
            </>
        ) : (
            <div>
                <p>
                    {weatherData.name}
                </p>
                <p>
                    {weatherData.main?.temp}°C
                </p>
                <p>
                    H {weatherData.main?.temp_min}°C
                </p>
                <p>
                    L {weatherData.main?.temp_max}°C
                </p>
            </div>
        )}
    </div>
    )
}