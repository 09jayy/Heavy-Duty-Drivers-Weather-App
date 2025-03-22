import React from 'react'; 
import { NavBar } from '../../components/Navbar/NavBar';
import './Home.css';

export const Home = () => {
    return (
        <div className="home-container">
            <h1 className='MainText' >London</h1>
            <div className="home-icon">
                <img src="/MainWeather.png" />
            </div>
            <div className="home-temperature">
                <p className="Feels-Like">Feels Like 7</p>
                <p className='CurrentTemp'>12°C</p>
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
                        10 km/h
                    </li>
                    <li>
                        <img src="/drop.png" />
                        02%
                    </li>
                    <li>
                        <img src="/Sunlight.png" />
                        5 hours
                    </li>
                </ul>
            </div>
            <div className='Hourly-forecast'>
                <div className='Hourly-forecast-header'>
                    <img src="/clock.png" className='Clock-Icon' />
                    <h2 className='Hourly-forecast-name'>Hourly Forecast</h2>
                </div>
                <ul>
                    <li>
                        <p>12</p>
                        <img src="/Weather.png" />
                        <p>12°C</p>
                    </li>
                    <li>
                        <p>13</p>
                        <img src="/Weather.png" />
                        <p>12°C</p>
                    </li>
                    <li>
                        <p>14</p>
                        <img src="/Weather.png" />
                        <p>12°C</p>
                    </li>
                    <li>
                        <p>15</p>
                        <img src="/sunset.png" />
                        <p>12°C</p>
                    </li>
                    <li>
                        <p>16</p>
                        <img src="/Weather.png" />
                        <p>12°C</p>
                    </li>
                    <li>
                        <p>17</p>
                        <img src="/Weather.png" />
                        <p>12°C</p>
                    </li>
                    <li>
                        <p>18</p>
                        <img src="/Weather.png" />
                        <p>12°C</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}