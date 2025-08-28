import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ email: '', fullname: '', password: '' });
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = "url('/assets/vector-medical-background.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 
    axios.post('/api/register', form)
      .then(() => navigate('/login'))
      .catch(err => {
        const message = err.response?.data || 'Registration failed';
        setError(message); 
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <form onSubmit={handleSubmit} className="bg-light bg-opacity-75 p-4 rounded shadow">
        <h3 className="mb-4 text-center text-primary">Register</h3>

       
        {error && (
          <div className="alert alert-danger py-2 px-3 rounded-3 shadow-sm">
            {error}
          </div>
        )}

        <div className="mb-3 mt-3">
          <label htmlFor="fullname" className="form-label fw-semibold">Full Name</label>
          <input
            id="fullname"
            type="text"
            className="form-control rounded-3 shadow-sm"
            placeholder="Enter your full name"
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
          <input
            id="email"
            type="email"
            className="form-control rounded-3 shadow-sm"
            placeholder="Enter your email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input
            id="password"
            type="password"
            className="form-control rounded-3 shadow-sm"
            placeholder="Create a password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button className="btn btn-primary w-100 rounded-3 shadow-sm">
          Register
        </button>
        <div className="text-center mt-3">
  Already registered? <a href="/login" className="text-decoration-none text-primary fw-semibold">Login here</a>
</div>
      </form>
    </div>
  );
}

export default Register;
