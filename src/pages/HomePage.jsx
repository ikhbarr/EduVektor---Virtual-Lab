import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.pageContainer}>
          <header className={styles.homepageHeader}>
            <h1>Selamat Datang Kembali!</h1>
            <p>Pilih salah satu menu di bawah ini untuk memulai petualangan Anda di dunia vektor.</p>
          </header>
          <div className={styles.cardContainer}>
            <Link to="/materi" className={styles.card}>
              <div className={styles.cardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              </div>
              <h3>Mulai Belajar</h3>
              <p>Pelajari dasar-dasar teori vektor dari awal hingga mahir.</p>
            </Link>
            <Link to="/simulasi" className={styles.card}>
              <div className={styles.cardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M21.75 12h-2.25m-1.666 5.834L16.5 16.5M4.5 12H2.25m1.666-5.834L5.5 7.5m5.666 0H12m-2.25 13.5v-2.25" /></svg>
              </div>
              <h3>Coba Simulasi</h3>
              <p>Visualisasikan operasi vektor secara interaktif dan real-time.</p>
            </Link>
            <Link to="/kuis" className={styles.card}>
              <div className={styles.cardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              </div>
              <h3>Uji Pengetahuan</h3>
              <p>Asah pemahaman Anda dengan menyelesaikan soal-soal kuis.</p>
            </Link>
          </div>
        </div>
    );
  };
  export default HomePage;