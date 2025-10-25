// src/pages/PaletRGBPage.jsx
import React, { useState, useCallback } from 'react';
import ColorInputPanel from '../components/ColorInputPanel';
import OperatorPanel from '../components/OperatorPanel';
import ResultPanel from '../components/ResultPanel';
import { add, subtract, scale, interpolate } from '../utils/vectorMath';
import './PaletRGBPage.css';

import WelcomeTour from '../components/WelcomeTour';
import { paletRGBPageSteps } from '../tours/paletRGBPageSteps';

function PaletRGBPage() {
  // State untuk dua vektor input
  const [vectorA, setVectorA] = useState({ r: 255, g: 0, b: 0 });
  const [vectorB, setVectorB] = useState({ r: 0, g: 0, b: 255 });

  // State untuk vektor hasil
  const [resultVector, setResultVector] = useState({ r: 255, g: 0, b: 255 });

  // State untuk slider
  const [scalar, setScalar] = useState(1.0);
  const [interpolation, setInterpolation] = useState(0.5);

  // Handlers untuk operasi
  const handleAdd = useCallback(() => {
    setResultVector(add(vectorA, vectorB));
  }, [vectorA, vectorB]);

  const handleSubtract = useCallback(() => {
    setResultVector(subtract(vectorA, vectorB));
  }, [vectorA, vectorB]);

  const handleScale = useCallback(() => {
    setResultVector(scale(vectorA, scalar));
  }, [vectorA, scalar]);

  const handleInterpolate = useCallback(() => {
    setResultVector(interpolate(vectorA, vectorB, interpolation));
  }, [vectorA, vectorB, interpolation]);

  return (
    <div className="page-container rgb-palette-container">
      <WelcomeTour tourKey="palet_rgb_page_tour" steps={paletRGBPageSteps} />
      <div className="rgb-palette-header">
        <h1>Palet Vektor RGB</h1>
        <p>Eksplorasi operasi vektor dasar (penjumlahan, pengurangan, perkalian skalar, dan interpolasi) dalam ruang warna RGB.</p>
      </div>
      <div className="main-content-rgb">
        <div id="rgb-vektor-a">
          <ColorInputPanel label="Vektor A" color={vectorA} onColorChange={setVectorA} />
        </div>
        <div id="rgb-operator-panel">
          <OperatorPanel 
              scalar={scalar}
              interpolation={interpolation}
              onAdd={handleAdd}
              onSubtract={handleSubtract}
              onScale={handleScale}
              onInterpolate={handleInterpolate}
              onScalarChange={setScalar}
              onInterpolationChange={setInterpolation}
          />
        </div>
        <div id="rgb-vektor-b">
          <ColorInputPanel label="Vektor B" color={vectorB} onColorChange={setVectorB} />
        </div>
      </div>
      <div id="rgb-hasil">
        <ResultPanel color={resultVector} />
      </div>
    </div>
  );
}

export default PaletRGBPage;
