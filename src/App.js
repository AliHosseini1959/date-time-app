import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "b4b55cfe3cf67d1b2d109d854aaaeb32"; // 🔹 Replace with your actual API key

function App() {
  const [dateTime, setDateTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => setLocationError(true)
      );
    } else {
      setLocationError(true);
    }
  }, []);

  // Fetch weather data
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour < 12) return "🌅 Good morning!";
    if (hour < 18) return "☀️ Good afternoon!";
    return "🌙 Good evening!";
  };

  return (
    <div className="container">
      <h1>{getGreeting()}</h1>
      <div className="time-box">
        <p><strong>Local Time:</strong> {dateTime.toLocaleTimeString()}</p>
        <p><strong>Date:</strong> {dateTime.toLocaleDateString()}</p>
        <p><strong>Day:</strong> {dateTime.toLocaleDateString(undefined, { weekday: "long" })}</p>
        <p><strong>Timezone:</strong> {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
        <p><strong>UTC Time:</strong> {dateTime.toUTCString()}</p>
      </div>

      {/* Weather Section */}
      <div className="weather-box">
        <h2>🌦️ Weather Info</h2>
        {locationError ? (
          <p>❌ Location access denied. Unable to fetch weather.</p>
        ) : weather ? (
          <>
            <p><strong>Location:</strong> {weather.name}, {weather.sys.country}</p>
            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt="Weather Icon" 
            />
          </>
        ) : (
          <p>Fetching weather...</p>
        )}
      </div>
    </div>
  );
}

export default App;
