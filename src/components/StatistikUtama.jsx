import React from 'react';
import styles from './StatistikUtama.module.css';

const StatistikUtama = ({ attempts }) => {
    if (!attempts || attempts.length === 0) {
        return null;
    }

    const high_score = Math.max(...attempts.map(a => a.score));
    const average_score = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length;
    const attempt_count = attempts.length;

    return (
        <div className={styles.statistikUtama}>
            <div className={styles.statCard}>
                <h4>Skor Tertinggi</h4>
                <p>{high_score.toFixed(2)}%</p>
            </div>
            <div className={styles.statCard}>
                <h4>Rata-rata Skor</h4>
                <p>{average_score.toFixed(2)}%</p>
            </div>
            <div className={styles.statCard}>
                <h4>Jumlah Pengerjaan</h4>
                <p>{attempt_count}</p>
            </div>
        </div>
    );
};

export default StatistikUtama;
