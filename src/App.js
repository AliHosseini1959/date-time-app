import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div className="App">
      <h1>📅 Current Date and Time</h1>
      <p><strong>Local Time:</strong> {dateTime.toLocaleString()}</p>
      <p><strong>Day:</strong> {dateTime.toLocaleDateString(undefined, { weekday: 'long' })}</p>
      <p><strong>Timezone:</strong> {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
      <p><strong>UTC Time:</strong> {dateTime.toUTCString()}</p>
    </div>
  );
}

export default App;
