import { useState } from 'react';
import { WeatherPage } from './pages/weather/Weather';
import { NavBar } from './components/NavBar';
// import './App.css';

/**
 * Handles global layout and routes to other pages/components
 * - Contains navigation to different pages/components via a Top menu bar
 * - Actual links to pages/components
 * @returns JSX
 */

const App = () => {
  return (
    <div className="min-h-screen bg-[#0D1B2A]">
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




