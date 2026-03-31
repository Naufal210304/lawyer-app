import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Mengambil data langsung dari localStorage agar sinkron dengan Login.jsx
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const isAuthenticated = !!token;

  // Belum login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Role tidak sesuai (mengarahkan ke login jika akses ditolak, bukan ke dashboard lagi untuk hindari loop)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;