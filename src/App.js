import React, { useState } from "react";
import WelcomeScreen from "./components/yello";
import BusMap from "./components/BusMap";

function App() {
  // state to show/hide the welcome screen
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <>
      {showWelcome ? (
        // Show WelcomeScreen for 5 seconds
        <WelcomeScreen onFinish={() => setShowWelcome(false)} />
      ) : (
        // Then show the map
        <BusMap />
      )}
    </>
  );
}

export default App;

