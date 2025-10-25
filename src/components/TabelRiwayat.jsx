import React from 'react';
import styles from './DashboardComponents.module.css';

const TabelRiwayat = ({ attempts }) => {
    if (!attempts || attempts.length === 0) {
        return <p>Anda belum pernah mengerjakan kuis. Coba kerjakan kuis untuk melihat progres Anda di sini!</p>;
    }

    return (
        <div className={styles.tabelRiwayat}>
            {/* <h3>Riwayat Pengerjaan</h3> */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tanggal</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Skor</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Jawaban Benar</th>
                    </tr>
                </thead>
                <tbody>
                    {attempts.map(attempt => (
                        <tr key={attempt.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(attempt.timestamp?.toDate()).toLocaleString()}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{attempt.score.toFixed(2)}%</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{attempt.correctAnswers} / {attempt.totalQuestions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelRiwayat;
