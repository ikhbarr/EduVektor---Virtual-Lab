// src/pages/ProyektorPage.jsx
import React from 'react';
import VectorProjectionCanvas from '../components/VectorProjectionCanvas';
import './ProyektorPage.css';

const ProyektorPage = () => {
  return (
    <div className="proyektor-container">
      <h1>Proyektor Vektor</h1>
      <p>Tarik dan lepas pada kanvas untuk membuat vektor dan meluncurkan proyektil.</p>
      <VectorProjectionCanvas />
    </div>
  );
};

export default ProyektorPage;
