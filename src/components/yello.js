import React, { useEffect } from "react";
import "../styles/WelcomeScreen.css";

const WelcomeScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="welcome-screen">
      <h1 className="welcome-text">FAB BUS</h1>
      <p className="welcome-subtext">Your ride, tracked in real-time</p>
    </div>
  );
};

export default WelcomeScreen;
