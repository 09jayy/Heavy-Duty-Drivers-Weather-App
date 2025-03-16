import { useState } from 'react';
import { WeatherPage } from './pages/weather/Weather';
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
      <header className="py-8 bg-gradient-to-r from-[#1B263B] to-[#273B54] shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-[#E0E1DD] mb-2">
            Weather Dashboard
          </h1>
          <p className="text-[#778DA9] text-center max-w-xl mx-auto">
            Get real-time weather updates for your favorite locations around the world
          </p>
        </div>
      </header>
      <main>
        <WeatherPage />
      </main>
    </div>
  );
};

export default App;




