import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneVerificationPage from './pages/PhoneVerificationPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<PhoneVerificationPage />} />
      </Routes>
    </Router>
  )
}

export default App
