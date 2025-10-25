import React from 'react';
import simStyles from '../../pages/SimulasiPage.module.css';

const ResultsDisplay = ({ info }) => {
    return (
        <div className={simStyles.resultsSimulasi}>
            <h3>Hasil Perhitungan</h3>
            <p>{info.a}</p>
            <p>{info.b}</p>
            <p><strong>{info.r}</strong></p>
        </div>
    );
};

export default ResultsDisplay;
