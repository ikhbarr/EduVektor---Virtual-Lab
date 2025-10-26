
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    loginWithEmail, 
    registerWithEmail, 
    signInWithGoogle 
} from '../services/authService';
import styles from './AuthPage.module.css';

// Import Google icon
import googleIcon from '../assets/google.svg';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState(''); 
    const navigate = useNavigate();

    const handleAuthAction = async (e) => {
        e.preventDefault();
        setError('');
        setRegistrationSuccessMessage(''); 
        try {
            if (isLogin) {
                await loginWithEmail(email, password);
                navigate('/home'); 
            } else {
                await registerWithEmail(email, password);
                setRegistrationSuccessMessage('Registrasi berhasil! Silakan login dengan akun Anda.');
                setIsLogin(true);
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            setError(getFriendlyErrorMessage(err.code));
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            await signInWithGoogle();
            navigate('/home');
        } catch (err) {
            setError(getFriendlyErrorMessage(err.code));
        }
    };

    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Format email tidak valid.';
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'Email atau password salah.';
            case 'auth/email-already-in-use':
                return 'Email ini sudah terdaftar. Silakan login.';
            case 'auth/weak-password':
                return 'Password terlalu lemah. Minimal 6 karakter.';
            default:
                return 'Terjadi kesalahan. Silakan coba lagi.';
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                <h2>{isLogin ? 'Login' : 'Registrasi'}</h2>
                
                {error && <p className={styles.errorMessage}>{error}</p>}
                {registrationSuccessMessage && <p className={styles.successMessage}>{registrationSuccessMessage}</p>}

                <form onSubmit={handleAuthAction} className={styles.authForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {isLogin ? 'Login' : 'Buat Akun'}
                    </button>
                </form>

                <div className={styles.separator}>atau</div>

                <button onClick={handleGoogleSignIn} className={styles.googleButton}>
                    <img src={googleIcon} alt="Google icon" className={styles.googleIcon} />
                    Lanjutkan dengan Google
                </button>

                <div className={styles.toggleAuth}>
                    {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                        {isLogin ? 'Registrasi' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
