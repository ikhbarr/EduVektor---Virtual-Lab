// src/components/ResultPanel.jsx
import React from 'react';

/**
 * @param {{ color: {r: number, g: number, b: number} }}
 */
function ResultPanel({ color }) {
  const textColor = (color.r * 0.299 + color.g * 0.587 + color.b * 0.114) > 186 ? '#000' : '#fff';

  return (
    <div className="panel result-panel">
      <h2>Hasil</h2>
      <div className="color-preview-large" style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}>
        <p className="result-text" style={{ color: textColor }}>
          {`rgb(${color.r}, ${color.g}, ${color.b})`}
        </p>
      </div>
    </div>
  );
}

export default ResultPanel;
