import React, { useState, useEffect } from 'react';

const WelcomeScreen = ({ onNavigateToLogin }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
      padding: '40px 30px',
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 1s ease-in-out'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    logo: {
      width: '80px',
      height: '80px',
      backgroundColor: '#2563eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '0 0 10px 0',
      textAlign: 'center'
    },
    subtitle: {
      color: '#6b7280',
      textAlign: 'center',
      fontSize: '16px',
      margin: '0'
    },
    button: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '15px 20px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      marginBottom: '20px'
    },
    description: {
      textAlign: 'center',
      color: '#9ca3af',
      fontSize: '14px',
      margin: '0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>GT</div>
          <h1 style={styles.title}>Welcome to GoTrack</h1>
          <p style={styles.subtitle}>Track your bus in real-time</p>
        </div>

        <button
          style={styles.button}
          onClick={onNavigateToLogin}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          <span>Get Started</span>
          <span>→</span>
        </button>
        
        <p style={styles.description}>
          Your reliable bus tracking companion
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
