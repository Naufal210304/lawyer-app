import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [loading, setLoading] = useState(true);

  // Verifikasi token saat aplikasi pertama kali dimuat
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await axios.get('/auth/me');
          setUser(response.data.user);
          setToken(storedToken);
          if (response.data.user?.role) {
            setRole(response.data.user.role);
            localStorage.setItem('role', response.data.user.role);
          }
        } catch {
          console.warn("Token tidak valid atau endpoint /me tidak tersedia");
          setUser(null);
          setToken(null);
          setRole(null);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (identifier, password) => {
    const response = await axios.post('/auth/login', {
      identifier,
      password,
    });

    const { token: newToken, user: newUser, role: newRole } = response.data;

    localStorage.setItem('token', newToken);
    if (newRole) {
      localStorage.setItem('role', newRole);
      setRole(newRole);
    }

    setToken(newToken);
    setUser(newUser);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
    setRole(null);
  };

  const value = {
    user,
    role,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;