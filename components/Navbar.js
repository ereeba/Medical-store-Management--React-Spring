import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, logout } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-2">
      <div className="container-fluid">
        {!isLoggedIn && (
          <Link className="navbar-brand fw-bold fs-4" to="/">
            Medical Store
          </Link>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to="/aboutus" className="nav-link">
                About Us
              </Link>
            </li>

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to="/list" className="nav-link">
                    Medicines
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add" className="nav-link">
                    Add Medicine
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
