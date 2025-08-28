import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import MedicineList from './components/MedicineList';
import Aboutus from './components/Aboutus';
import Aboutus from './components/Aboutus';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aboutus" element={<Aboutus />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
                    <Route path="/list" element={<MedicineList/>} />

          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
