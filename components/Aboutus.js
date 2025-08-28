import React, { useEffect } from 'react';

function Aboutus() {
  useEffect(() => {
    document.body.style.backgroundImage = "url('/assets/vector-medical-background.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed'; // Optional: parallax effect

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  return (
    <div className="container mt-5 mb-5" style={{backgroundColor:'grey'}}>
      <div className="card shadow-lg border-0 rounded-4 p-4 bg-light bg-opacity-75">
        <h2 className="mb-3 text-center text-primary">About Us</h2>
        <p className="lead text-muted">
          Welcome to <strong>Medical Store Manager</strong>, your reliable partner for managing medicine inventory.
          Whether you're running a small pharmacy, clinic, or local medical store, our platform is built to
          simplify and secure your stock management process.
        </p>

        <hr />

        <h5>🌟 Key Features:</h5>
        <ul>
          <li>🔐 Secure user authentication</li>
          <li>💊 Add, update, delete medicines easily</li>
          <li>📈 Track real-time stock with timestamps</li>
          <li>🔍 Search and pagination for quick navigation</li>
          <li>📦 Limit-based control to prevent overstocking</li>
        </ul>

        <h5 className="mt-4">📌 Our Mission</h5>
        <p>
          Our goal is to provide an intuitive, lightweight solution that empowers small-scale pharmacies
          to manage inventory efficiently without technical complexity.
        </p>

        <p className="text-end text-secondary mt-4">
          — The Medical Store Manager Team
        </p>
      </div>
    </div>
  );
}

export default Aboutus;
