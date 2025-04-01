import React, { useState } from 'react';
import { Home } from './pages/home/Home';
import { WeatherPage } from './pages/weather/Weather';
import { Alerts } from './pages/alerts/Alerts';
import { NavBar } from './components/Navbar/NavBar';
import './App.css';

/**
 * Handles global layout and routes to other pages/components
 * - Contains navigation to different pages/components via a Top menu bar
 * - Actual links to pages/components
 * @returns JSX
 */

const App = () => {
  /** @type {'home' | 'weather' | 'alerts'} */
  const [curPage, setCurPage] = useState('weather'); 
  const [searchedCity, setSearchedCity] = useState(null);

  const renderPage = ()=>{
    switch(curPage) {
      case 'home':
        return <Home/>

      case 'weather':
        return <WeatherPage searchedCity={searchedCity}/>

      case 'alerts':
        return <Alerts/>

      default: 
        return <Home/>
    }
  }

  return (
    <div className="root-container">
      <header>
        <NavBar changePage={setCurPage} setSearchedCity={setSearchedCity}/>
      </header>

      <main>
        {renderPage()} 
      </main>
    </div>
  );
};

export default App;




