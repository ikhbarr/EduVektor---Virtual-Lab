import React from 'react';
import simStyles from '../../pages/SimulasiPage.module.css';

const HistoryPanel = ({ history, onClear }) => {
    return (
        <div className={simStyles.historySimulasi}>
            <div className={simStyles.historyHeader}>
                <h3>Riwayat Simulasi</h3>
                <button onClick={onClear} className={simStyles.clearHistoryBtn}>Clear</button>
            </div>
            <ul>
                {history.length > 0 ? (
                    history.map(item => (
                        <li key={item.id}>
                            <span>A({item.vecA.x}, {item.vecA.y}) + B({item.vecB.x}, {item.vecB.y})</span>
                            <strong>R({item.vecR.x}, {item.vecR.y})</strong>
                        </li>
                    ))
                ) : (
                    <li>Belum ada riwayat.</li>
                )}
            </ul>
        </div>
    );
};

export default HistoryPanel;
