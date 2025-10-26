// src/components/ProfileDropdown.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const ProfileDropdown = ({ user, isOpen, onClose }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      if (onClose) onClose(); 
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className={`${styles.dropdownMenuNav} ${isOpen ? styles.show : ''}`}>
      <div className={styles.dropdownHeader}>
        <p>Signed in as</p>
        <strong>{user.email}</strong>
      </div>
     
      <Link 
        to="/dashboard" 
        className={styles.dropdownItemNav} 
        onClick={onClose}
      >
        Lihat Progres
      </Link>
      
      <button 
        onClick={handleLogout} 
        className={styles.dropdownItemNav} 
        type="button"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;