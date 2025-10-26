// src/context/AuthContext.jsx
import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, logout as logoutUser } from '../services/authService';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function logout() {
    return logoutUser();
  }

  const value = { currentUser, logout };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}