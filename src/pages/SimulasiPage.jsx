// src/pages/SimulasiPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import firebase from '../firebase';
import useVectorCanvas from '../hooks/useVectorCanvas';
import useVectorInteraction from '../hooks/useVectorInteraction';
import useVectorHistory from '../hooks/useVectorHistory';

// Import UI Components
import VectorControlPanel from '../components/simulation/VectorControlPanel';
import SimulationActions from '../components/simulation/SimulationActions';
import ResultsDisplay from '../components/simulation/ResultsDisplay';
import HistoryPanel from '../components/simulation/HistoryPanel';

import styles from './SimulasiPage.module.css';

const SimulasiPage = () => {
    const [resultantVector, setResultantVector] = useState(null); // New state for resultant vector
    const [info, setInfo] = useState({ a: '-', b: '-', r: '-' });
    
    const canvasRef = useRef(null);
    const { currentUser } = useAuth();

    const { history, addHistoryEntry, clearHistory } = useVectorHistory(currentUser);
    const { vecA, setVecA, vecB, setVecB, selectedVector, setSelectedVector, handleMouseDown, handleTouchStart, handleTouchMove, handleTouchEnd, handleVectorInputChange, calculateResultant } = useVectorInteraction(canvasRef);

    const { clearCanvas: clearCanvasHook } = useVectorCanvas(canvasRef, { vecA, vecB, resultant: resultantVector, selectedVector });

    const handleAdd = async () => {
        const { resultant, info: newInfo } = calculateResultant();

        setInfo(newInfo);
        setResultantVector(resultant); // Set the resultant vector for drawing

        if (currentUser) {
            addHistoryEntry({ vecA: vecA, vecB: vecB, vecR: resultant });
        }
    };


    return (
        <div className={styles.simulationPageGrid}>
            <main className={styles.canvasContainerSimulasi}>
                <canvas 
                    ref={canvasRef} 
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                ></canvas>
            </main>
            <aside className={styles.controlsContainerSimulasi}>
                <h2>Panel Kontrol</h2>

                <VectorControlPanel
                    vecA={vecA}
                    vecB={vecB}
                    selectedVector={selectedVector}
                    onVectorChange={handleVectorInputChange}
                    onSelectVector={setSelectedVector}
                />

                <SimulationActions 
                    onAdd={handleAdd} 
                    onReset={() => { clearCanvasHook(); setInfo({a:'-',b:'-',r:'-'}); setResultantVector(null); }}
                />

                <ResultsDisplay info={info} />

                {currentUser && <HistoryPanel history={history} onClear={clearHistory} />}
            </aside>
        </div>
    );
};
export default SimulasiPage;

