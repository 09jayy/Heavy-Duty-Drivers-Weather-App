import React, { useState, useEffect, useCallback } from "react";
import { fetchWeather } from "../../../functions/fetchWeather";

/**
 * returns alert list depending on weather conditions given 
 */
export const AlertLogs = ({ weatherData }) => {
  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    const generateAlerts = (data) => {
      const newAlerts = [];
      const { temp, humidity, pressure, sea_level } = data.main;
      const { speed } = data.wind;
      const visibility = data.visibility;
  
      if (temp < 0) {
        newAlerts.push("❄️ Extreme cold detected! Ensure engine antifreeze levels are adequate and carry snow chains.");
      } else if (temp > 35) {
        newAlerts.push("🔥 : High temperature! Check tire pressure and engine cooling systems to prevent overheating.");
      }
  
      if (humidity > 80) {
        newAlerts.push("🌫️ : High humidity levels! Beware of foggy conditions and ensure headlights and fog lights are operational.");
      }
  
      if (pressure < 980) {
        newAlerts.push("🌪️ Low pressure detected! Potential stormy conditions. Stay alert and check weather updates frequently.");
      } else if (pressure > 1030) {
        newAlerts.push("☀️ : High pressure detected! Generally good weather, but be mindful of strong sun exposure.");
      }
  
      if (sea_level && sea_level < 1000) {
        newAlerts.push("🌊 : Low sea level pressure may indicate rough weather near coastal areas. Proceed with caution.");
      }
  
      if (speed > 50) {
        newAlerts.push("💨 : High winds detected! Secure all cargo and be extra cautious on bridges and open highways.");
      }
  
      if (visibility < 1000) {
        newAlerts.push("🚛 : Low visibility! Reduce speed, increase following distance, and use fog lights if necessary.");
      }
  
      if (newAlerts.length === 0) {
        newAlerts.push("✅ : Weather conditions are stable. Drive safely!");
      }
  
      setAlerts(newAlerts);
    };

    generateAlerts(weatherData); 
  },[weatherData])


  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Alerts for {weatherData.name}</h2>
      {alerts.map((alert, index) => (
        <p key={index} className="text-sm text-red-200">{alert}</p>
      ))}
    </div>
  );
};
