import React, { useState } from 'react';
import { Weather } from './pages/weather/Weather';
import { Overview } from './pages/overview/Overview';
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
  /** @type {'weather' | 'overview' | 'alerts'} */
  const [curPage, setCurPage] = useState('weather'); 
  const [searchedCity, setSearchedCity] = useState('');
  const [locations, setLocations] = useState([]); 

  const renderPage = ()=>{
    switch(curPage) {
      case 'weather':
        return <Weather city={searchedCity}/>

      case 'overview':
        return <Overview/>

      case 'alerts':
        return <Alerts/>

      default: 
        return <Weather/>
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




