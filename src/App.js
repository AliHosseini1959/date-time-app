import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  // Get time-based greeting
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
    </div>
  );
}

export default App;
