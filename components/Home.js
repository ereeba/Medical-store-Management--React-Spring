import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const backgroundStyle = {
    backgroundImage: `url('/assets/pharmacy-store.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw', 
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    color: 'white',
    textShadow: '1px 1px 4px black',
  };

  return (
    <div style={backgroundStyle}>
      <h1>Welcome to the Medical Store</h1>
      <p>Manage your medicine stock efficiently.</p>
      <Link to="/login" className="btn btn-light m-2">Login</Link>
      <Link to="/register" className="btn btn-outline-light m-2">Register</Link>
    </div>
  );
}

export default Home;
