import React from 'react'; 
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { SearchModal } from './SearchModal';

export const WeatherWidget = ({weatherData = null}) => {
    const [showSearchModal, setShowSearchModal] = useState(false);  
    return (
        <div>
        {weatherData === null ? (
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
                {weatherData.location} - {weatherData.temp}°C
            </p>
        )}
    </div>
    )
}