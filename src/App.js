import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="App">
      <h1>Current Date and Time</h1>
      <p>{dateTime.toLocaleString()}</p>
    </div>
  );
}

export default App;
