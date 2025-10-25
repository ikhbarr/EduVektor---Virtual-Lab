import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './DashboardComponents.module.css';

const GrafikProgres = ({ attempts }) => {
    if (!attempts || attempts.length === 0) {
        return null;
    }

    const data = attempts.map((attempt, index) => ({
        name: `Attempt ${index + 1}`,
        skor: attempt.score,
    })).reverse();

    return (
        <div className={styles.grafikProgres}>
            <h3>Grafik Tren Skor</h3>
            <ResponsiveContainer width="100%" height="100%" minHeight={0}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="skor" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GrafikProgres;
