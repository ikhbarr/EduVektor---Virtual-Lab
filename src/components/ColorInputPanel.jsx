// src/components/ColorInputPanel.jsx
import React from 'react';

/**
 * @param {{ label: string, color: {r: number, g: number, b: number}, onColorChange: Function }}
 */
function ColorInputPanel({ label, color, onColorChange }) {
  
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? 0 : parseInt(value, 10);
    onColorChange({ ...color, [name]: Math.max(0, Math.min(255, parsedValue)) });
  };

  const handleColorPickerChange = (e) => {
    const hex = e.target.value;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    onColorChange({ r, g, b });
  };

  // Helper untuk mengubah nilai RGB ke format HEX
  const toHex = (c) => c.toString(16).padStart(2, '0');
  const hexColor = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;

  return (
    <div className="panel input-panel">
      <h3>{label}</h3>
      <div className="color-preview-container">
        <div className="color-preview" style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }} />
        <input type="color" value={hexColor} onChange={handleColorPickerChange} className="color-picker"/>
      </div>
      <div className="numeric-inputs">
        <div className="input-group">
          <label>R</label>
          <input name="r" type="number" min="0" max="255" value={color.r} onChange={handleNumericChange} />
        </div>
        <div className="input-group">
          <label>G</label>
          <input name="g" type="number" min="0" max="255" value={color.g} onChange={handleNumericChange} />
        </div>
        <div className="input-group">
          <label>B</label>
          <input name="b" type="number" min="0" max="255" value={color.b} onChange={handleNumericChange} />
        </div>
      </div>
    </div>
  );
}

export default ColorInputPanel;
