// src/pages/ProyektorPage.jsx
import React from 'react';
import VectorProjectionCanvas from '../components/VectorProjectionCanvas';
import WelcomeTour from '../components/WelcomeTour';
import { proyektorPageSteps } from '../tours/proyektorPageSteps';
import './ProyektorPage.css';

const ProyektorPage = () => {
  return (
    <div className="proyektor-container">
      <WelcomeTour tourKey="proyektor_page_tour" steps={proyektorPageSteps} />
      <h1>Proyektor Vektor</h1>
      <p>Tarik dan lepas pada kanvas untuk membuat vektor dan meluncurkan proyektil.</p>
      <VectorProjectionCanvas />
    </div>
  );
};

export default ProyektorPage;
