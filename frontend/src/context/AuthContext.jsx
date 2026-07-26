import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('uniflat_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('uniflat_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token && !user) {
        try {
          const res = await authService.getCurrentUser();
          if (res.success) {
            setUser(res.data);
            localStorage.setItem('uniflat_user', JSON.stringify(res.data));
          }
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    if (res.success && res.data) {
      const { accessToken, user: userData } = res.data;
      setToken(accessToken);
      setUser(userData);
      localStorage.setItem('uniflat_token', accessToken);
      localStorage.setItem('uniflat_user', JSON.stringify(userData));
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res.success && res.data) {
      const { accessToken, user: newUserData } = res.data;
      setToken(accessToken);
      setUser(newUserData);
      localStorage.setItem('uniflat_token', accessToken);
      localStorage.setItem('uniflat_user', JSON.stringify(newUserData));
      return res;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('uniflat_token');
    localStorage.removeItem('uniflat_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
