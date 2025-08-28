import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { Link } from 'react-router-dom';

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get(`/api/medicines/list?page=${page}&size=3&search=${search}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        const content = Array.isArray(res.data.content) ? res.data.content : [];
        setMedicines(content);
        setTotalPages(res.data.totalPages || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch medicines');
        setLoading(false);
      });
  }, [page, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const confirmDelete = (id) => {
    setSelectedId(id);
    const modal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  };

  const handleDelete = () => {
    if (!selectedId) return;
    axios
      .delete(`/api/medicines/delete/${selectedId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setSelectedId(null);
        fetchData();
      });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary mb-0">Medicine List</h3>
        <Link to="/add" className="btn btn-success">
          + Add Medicine
        </Link>
      </div>

      
      <input
        className="form-control mb-4"
        placeholder="Search medicine"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0); 
        }}
      />

      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : medicines.length === 0 ? (
        <p className="text-muted text-center">No medicines found.</p>
      ) : (
        <>
          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Added Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id}>
                    <td>{med.name}</td>
                    <td>{med.stock}</td>
                    <td>{new Date(med.addedTime).toLocaleString()}</td>
                    <td>
                      <Link to={`/edit/${med.id}`} className="btn btn-sm btn-warning me-2">
                        Edit
                      </Link>
                      <button
                        onClick={() => confirmDelete(med.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`btn btn-sm mx-1 ${
                  i === page ? 'btn-primary' : 'btn-outline-primary'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this medicine?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicineList;
