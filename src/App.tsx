import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneVerificationPage from './pages/PhoneVerificationPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import OtpSignUp from './pages/OtpSignUp';
import AccountSetupPage from './pages/AccountSetupPage';
// Make sure the file exists at src/pages/SignUpSuccess.tsx
import SignUpSuccess from './pages/SignUpSuccess';
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<PhoneVerificationPage />} />
        <Route path="/verify-code" element={<OtpSignUp />} />
        <Route path="/account-setup" element={<AccountSetupPage />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
      </Routes>
    </Router>
  )
}

export default App
