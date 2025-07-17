import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneVerificationPage from './pages/PhoneVerificationPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import OtpSignUp from './pages/OtpSignUp';
import AccountSetupPage from './pages/AccountSetupPage';
import SignUpSuccess from './pages/SignUpSuccess';
import LoginVerificationPage from './pages/LoginVerificationPage';
import OtpSignIn from './pages/OtpSignIn';
import SignInSuccess from './pages/SignInSuccess';
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
        <Route path="/login-verification" element={<LoginVerificationPage />} />
        <Route path="/otp-signin" element={<OtpSignIn />} />
        <Route path="/signin-success" element={<SignInSuccess />} />
        <Route path="/DashBoard" element={<div>DashBoard(Coming Soon!)</div>} />
      </Routes>
    </Router>
  )
}

export default App
