import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setError('');

    axios.post('/api/login', form)
      .then(res => {
        const { token } = res.data;
        if (token) {
          setToken(token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigate('/list');
        } else {
          setError('Login failed: Token missing in response');
        }
      })
      .catch(() => setError('Invalid email or password'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <form onSubmit={handleSubmit} className="bg-light bg-opacity-75 p-4 rounded shadow">
        <h3 className="mb-4 text-center text-success">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email address</label>
          <input
            id="email"
            type="email"
            className="form-control rounded-3 shadow-sm"
            placeholder="Enter your email"
            value={form.email}
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
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button className="btn btn-success w-100 rounded-3 shadow-sm" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-3">
  New user? <a href="/register" className="text-decoration-none text-primary fw-semibold">Register here</a>
</div>
      </form>
    </div>
  );
}
export default Login;
