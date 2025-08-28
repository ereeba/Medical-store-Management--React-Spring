
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import MedicineList from './components/MedicineList';
import EditMedicine from './components/EditMedicine';
import AddMedicine from './components/AddMedicine';
import Aboutus from './components/Aboutus';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import { getToken } from './utils/auth';
import Home from './components/Home';

const token = getToken();
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} /> {/* No container */}
        <Route path="/aboutus" element={<div className="container mt-3"><Aboutus /></div>} />
        <Route path="/login" element={<div className="container mt-3"><Login /></div>} />
        <Route path="/register" element={<div className="container mt-3"><Register /></div>} />

        {/* Protected Routes */}
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <div className="container mt-3"><MedicineList /></div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <div className="container mt-3"><AddMedicine /></div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <div className="container mt-3"><EditMedicine /></div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;