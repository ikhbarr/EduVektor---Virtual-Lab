// src/pages/LandingPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { auth, googleProvider } from '../firebase';
import { Navigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const { currentUser } = useAuth();

  const handleLogin = () => {
    auth.signInWithPopup(googleProvider);
  };

  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.landingPage}>
      <div className={styles.landingContent}>
        <h1>Selamat Datang di EduVektor</h1>
        <p>Platform pembelajaran vektor interaktif Anda. Pelajari teori, visualisasikan konsep, dan uji pemahaman Anda, semuanya di satu tempat.</p>
        <button onClick={handleLogin} className={styles.loginButton}>Masuk dengan Google</button>
      </div>
    </div>
  );
};

export default LandingPage;
