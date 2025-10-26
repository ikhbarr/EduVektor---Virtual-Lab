import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, doc, onSnapshot, orderBy, limit, addDoc, getDocs, writeBatch, serverTimestamp, query } from 'firebase/firestore';

const useVectorHistory = (currentUser) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!currentUser) {
            setHistory([]);
            return;
        }

        const historyRef = collection(doc(db, 'calculations', currentUser.uid), 'history');
        const q = query(historyRef, orderBy('timestamp', 'desc'), limit(5));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedHistory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHistory(fetchedHistory);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const addHistoryEntry = useCallback(async (entry) => {
        if (!currentUser) return;
        try {
            const historyRef = collection(doc(db, 'calculations', currentUser.uid), 'history');
            await addDoc(historyRef, {
                ...entry,
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Gagal menyimpan riwayat:", error);
        }
    }, [currentUser]);

    const clearHistory = useCallback(async () => {
        if (!currentUser) return;

        const historyRef = collection(doc(db, 'calculations', currentUser.uid), 'history');
        try {
            const snapshot = await getDocs(historyRef);
            if (snapshot.empty) return;

            const batch = writeBatch(db);
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
