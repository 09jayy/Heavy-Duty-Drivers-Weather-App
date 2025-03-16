import { useState } from 'react';
import { WeatherPage } from './pages/weather/Weather';
import './App.css';

/**
 * Handles global layout and routes to other pages/components
 * - Contains navigation to different pages/components via a Top menu bar
 * - Actual links to pages/components
 * @returns JSX
 */
function App() {

  return (
    <>
      <WeatherPage/>
    </>
  )
}

export default App
