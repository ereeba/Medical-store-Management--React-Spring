// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
