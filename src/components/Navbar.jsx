// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth, googleProvider } from '../firebase';

const Navbar = () => {
  const { currentUser } = useAuth();

  const handleLogin = () => {
    auth.signInWithPopup(googleProvider);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav>
      <Link to="/" className="brand">EduVektor</Link>
      <ul>
        <li><Link to="/">Beranda</Link></li>
        <li><Link to="/materi">Materi</Link></li>
        <li><Link to="/simulasi">Simulasi</Link></li>
        <li><Link to="/kuis">Kuis</Link></li>
      </ul>
      <div id="auth-container">
        {currentUser ? (
          <>
            <div id="user-info">
              <span id="user-email">{currentUser.email}</span>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;