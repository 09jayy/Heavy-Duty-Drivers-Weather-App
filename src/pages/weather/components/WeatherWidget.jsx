import React from 'react'; 

export const WeatherWidget = ({weatherData = null}) => {
    console.log(weatherData); 
    return (
        <div style={{backgroundColor: 'transparent', border: '2px solid blue'}} onClick={() => !weatherData && console.log('click')}>
            {weatherData === null ? (
                <p>+</p>
            ) : (
                <p>
                    {weatherData.location}
                    {weatherData.temp}
                </p>
            )
            }
        </div>
    )
}