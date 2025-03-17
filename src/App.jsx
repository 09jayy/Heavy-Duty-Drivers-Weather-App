import { useState } from 'react';
import { WeatherPage } from './pages/weather/Weather';
import { NavBar } from './components/Navbar/NavBar';
import './App.css';

/**
 * Handles global layout and routes to other pages/components
 * - Contains navigation to different pages/components via a Top menu bar
 * - Actual links to pages/components
 * @returns JSX
 */

const App = () => {
  return (
    <div className="root-container">
      <header>
        <NavBar/>
      </header>

      <main>
        <WeatherPage />
      </main>
    </div>
  );
};

export default App;




