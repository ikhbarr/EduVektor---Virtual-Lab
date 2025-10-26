
import { db } from '../firebase';
import { doc, getDoc, setDoc, arrayUnion, collection, where, orderBy, query, getDocs } from 'firebase/firestore';

/**
 * Mengambil dokumen pengguna dari koleksi 'users'.
 * @param {string} userId UID pengguna.
 * @returns {Promise<object|null>} Objek data pengguna atau null jika tidak ditemukan.
 */
export const getUserDocument = async (userId) => {
  if (!userId) return null;
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
};

/**
 * Memperbarui dokumen pengguna di Firestore untuk menandai tur telah selesai.
 * @param {string} userId UID pengguna.
 * @param {string} tourKey Kunci dari tur yang akan ditandai selesai.
 */
export const updateUserCompletedTours = async (userId, tourKey) => {
  if (!userId || !tourKey) return;

  const userDocRef = doc(db, 'users', userId);
  try {
    await setDoc(userDocRef, {
      completedTours: arrayUnion(tourKey)
    }, { merge: true });
  } catch (error) {
    console.error("Error updating completed tours:", error);
  }
};

/**
 * Mengambil semua riwayat pengerjaan kuis untuk pengguna tertentu.
 * @param {string} userId UID pengguna.
 * @returns {Promise<Array>} Sebuah array berisi objek riwayat pengerjaan kuis.
 */
export const getQuizAttemptsByUserId = async (userId) => {
    if (!userId) return [];
    try {
        const quizAttemptsRef = collection(db, 'quiz_attempts');
        const q = query(
            quizAttemptsRef,
            where('userId', '==', userId),
            orderBy('timestamp', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching quiz attempts: ", error);
        return [];
    }
};
