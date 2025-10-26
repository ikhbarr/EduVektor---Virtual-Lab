
import { auth, googleProvider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged as onFirebaseAuthStateChanged
} from 'firebase/auth';

/**
 * Login pengguna dengan email dan password.
 */
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Mendaftarkan pengguna baru dengan email dan password.
 */
export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Login atau registrasi pengguna menggunakan popup Google.
 */
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

/**
 * Logout pengguna yang sedang aktif.
 */
export const logout = () => {
  return signOut(auth);
};

/**
 * Membungkus listener onAuthStateChanged dari Firebase.
 * Ini memungkinkan komponen lain untuk memantau perubahan status auth
 * melalui service layer ini, bukan langsung dari Firebase.
 * @param {function} callback Fungsi yang akan dijalankan saat status auth berubah.
 * @returns {import('firebase/auth').Unsubscribe} Fungsi untuk berhenti memantau.
 */
export const onAuthStateChanged = (callback) => {
  return onFirebaseAuthStateChanged(auth, callback);
};
