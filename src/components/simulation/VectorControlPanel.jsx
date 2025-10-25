import React from 'react';
import simStyles from '../../pages/SimulasiPage.module.css';

const VectorControlPanel = ({ vecA, vecB, selectedVector, onVectorChange, onSelectVector }) => {
    return (
        <>
            <fieldset className={simStyles.controlsContainerSimulasi}>
                <legend>Pilih Vektor Aktif</legend>
                
                <label className={simStyles.radioControl}>
                    <input 
                        type="radio" value="A" name="activeVector"
                        checked={selectedVector === 'A'} 
                        onChange={() => onSelectVector('A')} 
                    />
                    Vektor A
                </label>
                
                <label className={simStyles.radioControl}>
                    <input 
                        type="radio" value="B" name="activeVector"
                        checked={selectedVector === 'B'} 
                        onChange={() => onSelectVector('B')} 
                    />
                    Vektor B
                </label>
                
                <label className={simStyles.radioControl}>
                    <input 
                        type="radio" value="None" name="activeVector"
                        checked={selectedVector === null} 
                        onChange={() => onSelectVector(null)} 
                    />
                    Tidak Ada (Nonaktifkan Drag)
                </label>
                
            </fieldset>
            
            <div className={simStyles.vectorInputs}>
                <fieldset>
                    <legend>Vektor A (Merah)</legend>
                    <div className={simStyles.inputGroup}>
                        <label>X:</label>
                        <input 
                            type="number" 
                            value={vecA.x} 
                            onChange={e => onVectorChange('A', 'x', e.target.value)} 
                        />
                    </div>
                    <div className={simStyles.inputGroup}>
                        <label>Y:</label>
                        <input 
                            type="number" 
                            value={vecA.y} 
                            onChange={e => onVectorChange('A', 'y', e.target.value)} 
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Vektor B (Biru)</legend>
                    <div className={simStyles.inputGroup}>
                        <label>X:</label>
                        <input 
                            type="number" 
                            value={vecB.x} 
                            onChange={e => onVectorChange('B', 'x', e.target.value)} 
                        />
                    </div>
                    <div className={simStyles.inputGroup}>
                        <label>Y:</label>
                        <input 
                            type="number" 
                            value={vecB.y} 
                            onChange={e => onVectorChange('B', 'y', e.target.value)} 
                        />
                    </div>
                </fieldset>
            </div>
        </>
    );
};

export default VectorControlPanel;
