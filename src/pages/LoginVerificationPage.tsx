import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseAuthService from '../firebase/auth';
import { useAuthFlow } from '../context/AuthFlowContext';
import '../styles/LoginVerificationPage.css';

const LoginVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { setPhoneNumber: setAuthPhoneNumber, setConfirmationResult } = useAuthFlow();

  useEffect(() => {
    // Initialize reCAPTCHA for the login page
    firebaseAuthService.initializeRecaptcha('recaptcha-container-login');
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendCode = async () => {
    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    setLoading(true);
    
    const result = await firebaseAuthService.sendOTP(phoneNumber);
    
    if (result.success && result.confirmationResult) {
      // Store phone number and confirmation result in the context
      setAuthPhoneNumber(phoneNumber);
      setConfirmationResult(result.confirmationResult);
      
      // Navigate to the OTP sign-in page
      navigate('/otp-signin');
    } else {
      alert(`Failed to send OTP: ${result.error}`);
    }
    
    setLoading(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && phoneNumber.trim().length === 10) {
      handleSendCode();
    }
  };

  return (
    <div className="login-verification-container">
      {/* A unique ID for the reCAPTCHA container is important */}
      <div id="recaptcha-container-login" style={{ display: 'none' }}></div>

      <div className="login-verification-header">
        <button className="back-button" onClick={handleBack} disabled={loading}>
          &lt;
        </button>
      </div>
      
      <div className="login-verification-content">
        <div className="verification-image-container">
          <img 
            src="/LoginVerfication/WomenWithShield.png" 
            alt="Woman with shield" 
            className="verification-image"
          />
        </div>
        
        <div className="verification-info">
          <h1 className="verification-title">Log In</h1>
          <p className="verification-subtitle">
            Enter your phone number to receive a one-time password.
          </p>
          
          <div className="phone-display">
            <span className="phone-label">Phone Number</span>
            <div className="phone-input-wrapper">
                <span className="country-code-login">+91</span>
                <input
                    type="tel"
                    className="phone-input"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    disabled={loading}
                />
            </div>
          </div>
          
          <button className="continue-button" onClick={handleSendCode} disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginVerificationPage;
