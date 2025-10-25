import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import firebase from '../firebase';

const useVectorHistory = (currentUser) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!currentUser) {
            setHistory([]);
            return;
        }

        const unsubscribe = db.collection('calculations').doc(currentUser.uid).collection('history')
            .orderBy('timestamp', 'desc').limit(5)
            .onSnapshot(snapshot => {
                const fetchedHistory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setHistory(fetchedHistory);
            });

        return () => unsubscribe();
    }, [currentUser]);

    const addHistoryEntry = useCallback(async (entry) => {
        if (!currentUser) return;
        try {
            await db.collection('calculations').doc(currentUser.uid).collection('history').add({
                ...entry,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error("Gagal menyimpan riwayat:", error);
        }
    }, [currentUser]);

    const clearHistory = useCallback(async () => {
        if (!currentUser) return;

        const historyRef = db.collection('calculations').doc(currentUser.uid).collection('history');
        try {
            const snapshot = await historyRef.get();
            if (snapshot.empty) return;

            const batch = db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        } catch (error) {
            console.error("Gagal menghapus riwayat:", error);
        }
    }, [currentUser]);

    return {
        history,
        addHistoryEntry,
        clearHistory
    };
};

export default useVectorHistory;
