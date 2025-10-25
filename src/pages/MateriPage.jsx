// src/pages/MateriPage.jsx
import React from 'react';

const MateriPage = () => {
  return (
    <>
      <div className="content-section">
        <h1>Dasar-Dasar Vektor</h1>
        <h2>Apa itu Vektor?</h2>
        <p>Vektor adalah objek geometri yang memiliki <strong>magnitudo (nilai/panjang)</strong> dan <strong>arah</strong>. Vektor sering digambarkan sebagai panah. Panjang panah menunjukkan magnitudo, dan arah panah menunjukkan arahnya.</p>
        
        <h2>Penjumlahan Vektor</h2>
        <p>Penjumlahan dua vektor (misalnya <strong>A</strong> + <strong>B</strong>) menghasilkan vektor baru yang disebut <strong>vektor resultan (R)</strong>. Secara matematis, jika <strong>A</strong> = (Ax, Ay) dan <strong>B</strong> = (Bx, By), maka resultannya <strong>R</strong> = (Ax + Bx, Ay + By).</p>

        <h2>Magnitudo Vektor</h2>
        <p>Magnitudo atau panjang dari sebuah vektor <strong>A</strong> = (Ax, Ay) dihitung menggunakan teorema Pythagoras: |A| = √(Ax² + Ay²)</p>
        <p>Cobalah konsep-konsep ini di halaman <strong>Simulasi</strong>!</p>
      </div>

      <div className="video-section">
        <h2>Materi Video</h2>
        <p>Tonton video berikut untuk pemahaman yang lebih mendalam:</p>
        
        <h4>1. Konsep Dasar Vektor (Kelas 10)</h4>
        <div className="video-container">
          <iframe 
            src="https://www.youtube.com/embed/kLHRRj2COPE" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>

        <h4>2. Penjumlahan Vektor (Metode Poligon & Jajar Genjang)</h4>
        <div className="video-container">
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