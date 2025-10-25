import React from 'react';
import simStyles from '../../pages/SimulasiPage.module.css';

const SimulationActions = ({ onAdd, onReset }) => {
    return (
        <div className={simStyles.actionsSimulasi}>
            <button onClick={onAdd}>Hitung Resultan (A + B)</button>
            <button onClick={onReset} className={simStyles.secondary}>Reset Canvas</button>
        </div>
    );
};

export default SimulationActions;
