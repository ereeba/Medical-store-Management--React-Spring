import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function AddMedicine() {
  const [form, setForm] = useState({ name: '', stock: 0 });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/medicines/add', form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => navigate('/list'))
      .catch((err) => {
        const message = err?.response?.data || '';
        if (message.includes('Only 5 medicines')) {
          setShowModal(true);
        } else {
          alert(message); 
        }
      });
  };

  useEffect(() => {
    if (showModal && modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current, {
        backdrop: false,
      });
      modal.show();
    }
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
    navigate('/list');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow border-0 rounded-4 p-4">
        <h3 className="text-center text-success mb-4">Add New Medicine</h3>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Medicine Name</label>
          <input
            className="form-control mb-3"
            placeholder="Enter medicine name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label className="form-label">Stock Quantity</label>
          <input
            className="form-control mb-4"
            type="number"
            min="0"
            placeholder="Enter stock"
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
            required
          />

          <div className="d-grid">
            <button className="btn btn-success">Add Medicine</button>
          </div>
        </form>
      </div>

      
      <div className="modal fade" tabIndex="-1" ref={modalRef} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h5 className="modal-title">Limit Reached</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">You can only add up to 5 medicines. Please delete an existing one to add more.</p>
            </div>
            <div className="modal-footer">
              <button onClick={handleClose} className="btn btn-warning">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;
