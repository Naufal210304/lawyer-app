import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user: _user, token, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Belum login atau role tidak diizinkan
  if (!token || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;