import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profile_pic') || null);
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
          if (response.data.user?.username) {
            setUsername(response.data.user.username);
            localStorage.setItem('username', response.data.user.username);
          }
          if (response.data.user?.profile_pic) {
            setProfilePic(response.data.user.profile_pic);
            localStorage.setItem('profile_pic', response.data.user.profile_pic);
          }
        } catch {
          console.warn("Token tidak valid atau endpoint /me tidak tersedia");
          setUser(null);
          setToken(null);
          setRole(null);
          setUsername(null);
          setProfilePic(null);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('username');
          localStorage.removeItem('profile_pic');
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
    if (newUser?.username) {
      localStorage.setItem('username', newUser.username);
      setUsername(newUser.username);
    }
    if (newUser?.profile_pic) {
      localStorage.setItem('profile_pic', newUser.profile_pic);
      setProfilePic(newUser.profile_pic);
    }

    setToken(newToken);
    setUser(newUser);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('profile_pic');
    setToken(null);
    setUser(null);
    setRole(null);
    setUsername(null);
    setProfilePic(null);
  };

  const value = {
    user,
    role,
    token,
    username,
    profilePic,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;