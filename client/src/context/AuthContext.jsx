import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.token) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Updated to accept a generic identifier (email or username)
  const login = async (identifier, password) => {
    try {
      const userData = await authService.login(identifier, password);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };
  
  // New function to handle the Google login flow
  const googleLogin = async (credential) => {
    try {
      const userData = await authService.loginWithGoogle(credential);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUserCurrency = (newCurrency) => {
    if (user) {
      const updatedUser = { ...user, currency: newCurrency };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
    googleLogin, // Provide the new function
    updateUserCurrency,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};