import React, { useState } from 'react';

const LoginScreen = ({ onNavigateHome, onNavigateFaceScan }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = () => {
    console.log('Email login clicked!');
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    console.log('Navigating to home/map...');
    // Navigate directly to home (no loading delay for testing)
    onNavigateHome();
  };

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
      padding: '40px 30px'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    logo: {
      width: '64px',
      height: '64px',
      backgroundColor: '#2563eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    title: {
      fontSize: '24px',
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
    inputContainer: {
      position: 'relative',
      marginBottom: '16px'
    },
    input: {
      width: '100%',
      padding: '15px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box'
    },
    inputWithIcon: {
      paddingLeft: '50px'
    },
    icon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      fontSize: '20px'
    },
    eyeIcon: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#9ca3af',
      fontSize: '20px',
      border: 'none',
      background: 'none'
    },
    button: {
      width: '100%',
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
      marginBottom: '12px'
    },
    emailButton: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    phoneButton: {
      backgroundColor: '#059669',
      color: 'white'
    },
    faceButton: {
      backgroundColor: '#7c3aed',
      color: 'white'
    },
    signUpText: {
      textAlign: 'center',
      marginTop: '24px',
      color: '#6b7280',
      fontSize: '16px'
    },
    signUpLink: {
      color: '#2563eb',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none',
      border: 'none',
      background: 'none'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>GT</div>
          <h1 style={styles.title}>Welcome to GoTrack</h1>
          <p style={styles.subtitle}>Sign in to continue</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={styles.inputContainer}>
            <span style={styles.icon}>📧</span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, ...styles.inputWithIcon }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={styles.inputContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, paddingRight: '50px' }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            onClick={handleEmailLogin}
            style={{ ...styles.button, ...styles.emailButton }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            <span>📧</span>
            <span>Continue with Email</span>
          </button>
        </div>

        <div>
          <button
            onClick={onNavigateHome}
            style={{ ...styles.button, ...styles.phoneButton }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#059669'}
          >
            <span>📱</span>
            <span>Continue with Phone</span>
          </button>

          <button
            onClick={onNavigateFaceScan}
            style={{ ...styles.button, ...styles.faceButton }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6d28d9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#7c3aed'}
          >
            <span>📷</span>
            <span>Scan Face to Login</span>
          </button>
        </div>

        <div style={styles.signUpText}>
          Don't have an account?{' '}
          <button style={styles.signUpLink}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

