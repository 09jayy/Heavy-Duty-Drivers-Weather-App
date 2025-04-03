import React, { useState } from 'react';
import { Home } from './pages/home/Home';
import { WeatherPage } from './pages/weather/Weather';
import { Alerts } from './pages/alerts/Alerts';
import { NavBar } from './components/Navbar/NavBar';
import { locationsContext } from './locationsContext';
import './App.css';

/**
 * Handles global layout and routes to other pages/components
 * - Contains navigation to different pages/components via a Top menu bar
 * - Actual links to pages/components
 * @returns JSX
 */
const App = () => {
  /** @type {'home' | 'weather' | 'alerts'} */
  const [curPage, setCurPage] = useState('home'); 
  const [searchedCity, setSearchedCity] = useState('');
  const [locations, setLocations] = useState([]); 

  const renderPage = ()=>{
    switch(curPage) {
      case 'home':
        return <Home city={searchedCity}/>

      case 'weather':
        return <WeatherPage/>

      case 'alerts':
        return <Alerts/>

      default: 
        return <Home/>
    }
  }

  return (
    <div className="root-container">
      <header>
        <NavBar changePage={setCurPage} setSearchedCity={setSearchedCity} curPage={curPage}/>
      </header>

    <locationsContext.Provider value={{locations: locations, setLocations: setLocations}}>
      <main>
        {renderPage()} 
      </main>
    </locationsContext.Provider>
    </div>
  );
};

export default App;



