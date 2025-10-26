
import { db } from '../firebase';
import firebase from 'firebase/compat/app';

/**
 * Mengambil dokumen pengguna dari koleksi 'users'.
 * @param {string} userId UID pengguna.
 * @returns {Promise<object|null>} Objek data pengguna atau null jika tidak ditemukan.
 */
export const getUserDocument = async (userId) => {
  if (!userId) return null;
  try {
    const userDocRef = db.collection('users').doc(userId);
    const doc = await userDocRef.get();
    if (doc.exists) {
      return doc.data();
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

  const userDocRef = db.collection('users').doc(userId);
  try {
    await userDocRef.set({
      completedTours: firebase.firestore.FieldValue.arrayUnion(tourKey)
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
        const snapshot = await db.collection('quiz_attempts')
            .where('userId', '==', userId)
            .orderBy('timestamp', 'desc')
            .get();
        
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching quiz attempts: ", error);
        return [];
    }
};
