import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';

function EditMedicine() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', stock: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/medicines/list?page=0&size=100`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        const med = res.data.content.find((m) => m.id === parseInt(id));
        if (med) {
          setForm({ name: med.name, stock: med.stock });
        } else {
          setError('Medicine not found.');
        }
      })
      .catch(() => setError('Failed to load medicine data.'));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/medicines/edit/${id}`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => navigate('/list'))
      .catch(() => setError('Error updating medicine.'));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow border-0 rounded-4 p-4">
        <h3 className="text-center text-primary mb-4">Edit Medicine</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Medicine Name</label>
          <input
            className="form-control mb-3"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label className="form-label">Stock</label>
          <input
            className="form-control mb-4"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
            required
            min="0"
          />

          <div className="d-grid">
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMedicine;
