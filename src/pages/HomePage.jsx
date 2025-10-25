// src/pages/HomePage.jsx
import React from 'react';
const HomePage = () => {
    return (
      <div className="content-section">
        <h1>Selamat Datang di EduVektor!</h1>
        <p><strong>EduVektor</strong> adalah platform pembelajaran interaktif untuk memahami konsep vektor, kini dibangun dengan teknologi React.</p>
        <ul>
          <li>Pelajari dasar-dasar teori vektor di halaman <strong>Materi</strong>.</li>
          <li>Coba secara langsung operasi vektor melalui <strong>Simulasi</strong> interaktif.</li>
          <li>Uji pemahaman Anda dengan mengerjakan <strong>Kuis</strong>.</li>
        </ul>
        <p>Silakan login untuk menyimpan progres dan riwayat simulasi Anda!</p>
      </div>
    );
  };
  export default HomePage;