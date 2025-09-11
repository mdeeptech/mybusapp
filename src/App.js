import React, { useState } from 'react';
import WelcomeScreen from './components/yello'; // Your existing welcome screen
import LoginScreen from './components/LoginScreen';
import BusMap from './components/BusMap'; // Your existing BusMap component
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const handleNavigateToLogin = () => {
    setCurrentScreen('login');
  };

  const handleNavigateToHome = () => {
    setCurrentScreen('home');
  };

  const handleNavigateToFaceScan = () => {
    setCurrentScreen('faceScan');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigateToLogin={handleNavigateToLogin} />;
      
      case 'login':
        return (
          <LoginScreen 
            onNavigateHome={handleNavigateToHome}
            onNavigateFaceScan={handleNavigateToFaceScan}
          />
        );
      
      case 'home':
        return <BusMap />; // Your existing bus map component
      
      case 'faceScan':
        return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Face Scan</h2>
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 border-4 border-blue-500 rounded-full flex items-center justify-center">
                  <div className="text-blue-500 text-4xl">📷</div>
                </div>
              </div>
              <p className="text-gray-600 text-center mb-6">Position your face in the frame</p>
              <button 
                onClick={() => setCurrentScreen('login')} 
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
      
      default:
        return <WelcomeScreen onNavigateToLogin={handleNavigateToLogin} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;