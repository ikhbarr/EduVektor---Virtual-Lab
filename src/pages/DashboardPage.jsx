import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getQuizAttemptsByUserId } from '../services/firestoreService';

import StatistikUtama from '../components/StatistikUtama';
import GrafikProgres from '../components/GrafikProgres';
import TabelRiwayat from '../components/TabelRiwayat';
import styles from '../components/DashboardComponents.module.css';

const DashboardPage = () => {
    const { currentUser } = useAuth();
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const fetchAttempts = async () => {
            try {
                const fetchedAttempts = await getQuizAttemptsByUserId(currentUser.uid);
                setAttempts(fetchedAttempts);
            } catch (error) {
                console.error("Error fetching quiz attempts: ", error);
            }
            setLoading(false);
        };

        fetchAttempts();
    }, [currentUser]);

    if (loading) {
        return <div className={styles.dashboardContainer}><h2>Memuat data...</h2></div>;
    }

    return (
        <div className={styles.dashboardContainer}>
            <h1>Dasbor Progres Saya</h1>
            
            {attempts.length === 0 ? (
                <p>Anda belum pernah mengerjakan kuis. Coba kerjakan kuis untuk melihat progres Anda di sini!</p>
            ) : (
                <>
                    <section aria-labelledby="stats-heading">
                        <h2 id="stats-heading" className="sr-only">Statistik Utama</h2>
                        <StatistikUtama attempts={attempts} />
                    </section>
                    <section aria-labelledby="progress-graph-heading">
                        <h2 id="progress-graph-heading" className="sr-only">Grafik Progres</h2>
                        <GrafikProgres attempts={attempts} />
                    </section>
                    <section aria-labelledby="history-table-heading">
                        <h2 id="history-table-heading" className="sr-only">Riwayat Pengerjaan</h2>
                        <TabelRiwayat attempts={attempts} />
                    </section>
                </>
            )}
        </div>
    );
};

export default DashboardPage;
