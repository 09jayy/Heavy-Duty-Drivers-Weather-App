import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { SearchModal } from "./SearchModal";
import { fetchWeather } from "../../../functions/fetchWeather";
import axios from "axios";

export const WeatherWidget = ({city = null}) => {
    const [showSearchModal, setShowSearchModal] = useState(false);  
    const [weatherData, setWeatherData] = useState({});

    const fetchData = useCallback(async () => {
        if (!city) return; 

        try {
            const data = await fetchWeather(city);
            console.log(data); 
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
        }
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
                    <SearchModal onClose={()=>setShowSearchModal(false)}/>,
                    document.body
                )}
            </>
        ) : (
            <p>
                {weatherData.name}
                {weatherData.main?.temp}
            </p>
        )}
    </div>
    )
}