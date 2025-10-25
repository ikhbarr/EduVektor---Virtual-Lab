// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth, googleProvider } from '../firebase';
import ProfileDropdown from './ProfileDropdown';
import styles from './Navbar.module.css';

import logo from '../assets/edvek.png';

const Navbar = () => {
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSimulasiDropdownOpen, setIsSimulasiDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogin = () => {
    auth.signInWithPopup(googleProvider);
  };

  const closeAllDropDowns = () => {
    setIsSimulasiDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  }

  const toggleMobileMenu = () => {
    const newMenuState = !isMobileMenuOpen;
    setMobileMenuOpen(newMenuState);

    if (!newMenuState) {
      closeAllDropDowns();
    }
  };

  const toggleSimulasiDropdown = () => {
    setIsSimulasiDropdownOpen(!isSimulasiDropdownOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsSimulasiDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    closeAllDropDowns();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside Simulasi dropdown
      if (isSimulasiDropdownOpen) {
        const simulasiDropdown = event.target.closest(`.${styles.mobileDropdown}`);
        if (!simulasiDropdown) {
          setIsSimulasiDropdownOpen(false);
        }
      }

      // Check if click is outside Profile dropdown
      if (isProfileDropdownOpen) {
        const profileDropdown = event.target.closest(`.${styles.profileDropdown}`);
        if (!profileDropdown) {
          setIsProfileDropdownOpen(false);
        }
      }
    }; 

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSimulasiDropdownOpen, isProfileDropdownOpen]);

  return (
    <nav className={styles.nav}>
      <NavLink to="/home" className={styles.brand} onClick={closeMobileMenu}>
        <img src={logo} alt="EduVektor Logo" className={styles.logoImg} />
      </NavLink>
      
      <button 
        className={styles.mobileMenuToggle} 
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul className={`${styles.navUl} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <li>
          <NavLink 
            to="/home" 
            onClick={closeMobileMenu} 
            className={({ isActive }) => isActive ? styles.active : ''}
          >
            Beranda
          </NavLink>
        </li>
        
        <li>
          <NavLink 
            to="/materi" 
            onClick={closeMobileMenu} 
            className={({ isActive }) => isActive ? styles.active : ''}
          >
            Materi
          </NavLink>
        </li>
        
        <li className={styles.mobileDropdown}>
          <button 
            className={styles.dropdownToggle}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSimulasiDropdown();
            }}
            aria-expanded={isSimulasiDropdownOpen}
          >
            Simulasi
          </button>
          <div className={`${styles.dropdownMenuNav} ${isSimulasiDropdownOpen ? styles.show : ''}`}>
            <NavLink 
              to="/simulasi" 
              className={({ isActive }) => `${styles.dropdownItemNav} ${isActive ? styles.active : ''}`} 
              onClick={closeMobileMenu}
            >
              Vektor Kartesius
            </NavLink>
            <NavLink 
              to="/proyektor-vektor" 
              className={({ isActive }) => `${styles.dropdownItemNav} ${isActive ? styles.active : ''}`} 
              onClick={closeMobileMenu}
            >
              Proyektor Vektor
            </NavLink>
            <NavLink 
              to="/palet-rgb" 
              className={({ isActive }) => `${styles.dropdownItemNav} ${isActive ? styles.active : ''}`} 
              onClick={closeMobileMenu}
            >
              Palet RGB
            </NavLink>
          </div>
        </li>
        
        <li>
          <NavLink 
            to="/kuis" 
            onClick={closeMobileMenu} 
            className={({ isActive }) => isActive ? styles.active : ''}
          >
            Kuis
          </NavLink>
        </li>
      </ul>
      
      <div className={styles.authContainer}>
        {currentUser ? (
          <div className={`${styles.dropdown} ${styles.profileDropdown}`}>
            <button 
              className={styles.profileButton}
              type="button" 
              onClick={(e) => {
                e.stopPropagation(); 
                toggleProfileDropdown();
              }}
              aria-expanded={isProfileDropdownOpen}
              aria-label="Profile menu"
            >
              <img 
                src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.email)}&background=3b82f6&color=fff`} 
                alt="User Avatar" 
              />
            </button>

            <ProfileDropdown 
              user={currentUser} 
              isOpen={isProfileDropdownOpen} 
              onClose={closeAllDropDowns} 
            />
          </div>
        ) : (
          <button onClick={handleLogin} className={styles.loginButtonNav}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;