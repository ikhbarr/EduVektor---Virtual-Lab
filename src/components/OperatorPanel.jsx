// src/components/OperatorPanel.jsx
import React from 'react';

/**
 * @param {{ 
 *  scalar: number, 
 *  interpolation: number, 
 *  onAdd: Function, 
 *  onSubtract: Function, 
 *  onScale: Function, 
 *  onInterpolate: Function,
 *  onScalarChange: Function,
 *  onInterpolationChange: Function
 * }} props
 */
function OperatorPanel({ 
    scalar, interpolation, 
    onAdd, onSubtract, onScale, onInterpolate,
    onScalarChange, onInterpolationChange
}) {

  return (
    <div className="panel operator-panel">
      <h3>Operator</h3>
      <div className="operator-buttons">
        <button onClick={onAdd}>A + B</button>
        <button onClick={onSubtract}>A - B</button>
      </div>
      
      <div className="operator-group">
        <h4>Perkalian Skalar (Vektor A)</h4>
        <div className="slider-container">
            <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.05" 
                value={scalar} 
                onChange={(e) => onScalarChange(parseFloat(e.target.value))}
            />
            <span>{scalar.toFixed(2)}</span>
        </div>
        <button onClick={onScale}>Terapkan Skalar ke A</button>
      </div>

      <div className="operator-group">
        
        <h4>Interpolasi (Antara A dan B)</h4>
        <div className="slider-container">
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={interpolation} 
                onChange={(e) => onInterpolationChange(parseFloat(e.target.value))}
            />
            <span>{interpolation.toFixed(2)}</span>
        </div>
        <button onClick={onInterpolate}>Terapkan Interpolasi</button>
      </div>
    </div>
  );
}

export default OperatorPanel;
