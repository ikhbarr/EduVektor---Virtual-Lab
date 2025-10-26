// src/pages/LandingPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { auth, googleProvider } from '../firebase';
import { Link, Navigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import AnimatedBackground from '../components/AnimatedBackground';

const LandingPage = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.landingPage}>
      <AnimatedBackground />
      <div className={styles.landingContent}>
        <h1>Selamat Datang di EduVektor</h1>
        <p>Platform pembelajaran vektor interaktif Anda. Pelajari teori, visualisasikan konsep, dan uji pemahaman Anda, semuanya di satu tempat.</p>
        <Link to="/login" className={styles.loginButton}>Mulai Sekarang</Link>
      </div>
    </div>
  );
};

export default LandingPage;
