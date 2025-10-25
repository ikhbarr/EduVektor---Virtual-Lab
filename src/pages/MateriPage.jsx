// src/pages/MateriPage.jsx
import React from 'react';
import { Tabs, Tab } from '../components/Tabs';
import DasarDasar from '../materi/dasar-dasar.mdx';
import AIvect from '../materi/vector-AI.mdx';
import Mathvect from '../materi/vector-matematika.mdx';
import Phsyvect from '../materi/vector-fisika.mdx';
import styles from './MateriPage.module.css';

const MateriPage = () => {
  return (
    <>
      <Tabs>
        <Tab label="Dasar-Dasar">
          <div className="content-section">
            <DasarDasar />
          </div>
        </Tab>
        <Tab label="Aplikasi di AI">
          <div className="content-section">
            <AIvect />
          </div>
        </Tab>
        <Tab label="Aplikasi di Fisika">
          <div className="content-section">
            <Phsyvect />
          </div>
        </Tab>
        <Tab label="Aplikasi di Matematika">
          <div className="content-section">
            <Mathvect />
          </div>
        </Tab>
      </Tabs>

      <div className={styles.videoSection}>
        <h2>Materi Video</h2>
        <p>Tonton video berikut untuk pemahaman yang lebih mendalam:</p>
        
        {/* <h4>1. Konsep Dasar Vektor (Kelas 10)</h4>
        <div className="video-container">
          <iframe 
            src="https://www.youtube.com/embed/kLHRRj2COPE" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div> */}

        <h4>1. Penjumlahan Vektor (Metode Poligon & Jajar Genjang)</h4>
        <div className={styles.videoContainer}>
          <iframe 
            src="https://www.youtube.com/embed/OJrffDuVXjM" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </>
  );
};

export default MateriPage;