import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId = null;
    let startTime = null;
    const duration = 3000;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const currentProgress = Math.min(1, elapsedTime / duration);

      setProgress(currentProgress);

      if (elapsedTime < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="App">
      <div
        className="loading-wrapper"
        style={{
          opacity: Number(progress * 100) !== 100 ? 1 : 0,
          transition: "opacity 0.3s linear",
        }}
      >
        <div className="progress-bar-wrapper">
          <CircularProgressbar
            value={Number(progress * 100)}
            text={`${Number(progress * 100).toFixed(0)}%`}
          />
        </div>
      </div>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
