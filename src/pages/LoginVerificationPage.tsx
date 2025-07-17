import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginVerificationPage.css';

const LoginVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  useEffect(() => {
    // Get phone number and email from location state
    if (location.state && location.state.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);
    }
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleVerify = () => {
    // Validate inputs
    if (!email || !phoneNumber) {
      alert('Please enter both email and phone number');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Simple phone validation (10 digits)
    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Check if user data exists in localStorage
    const storedUserData = localStorage.getItem('user');
    if (!storedUserData) {
      alert('No user account found. Please sign up first.');
      return;
    }
    
    try {
      const userData = JSON.parse(storedUserData);
      
      // Check if entered email and phone number match stored data
      if (userData.email === email && userData.phoneNumber === phoneNumber) {
        // Success - credentials match, generate OTP for login verification
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store the OTP in localStorage
        localStorage.setItem('otp', generatedOtp);
        
        // For development purposes, log the OTP (remove in production)
        console.log(`Login OTP generated: ${generatedOtp}`);
        
    
        navigate('/otp-signin', { state: { email, phoneNumber } });
      } else {
        // Credentials don't match
        alert('Invalid credentials. Please check your email and phone number.');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      alert('Error retrieving user data. Please try again.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 10 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email.trim() && phoneNumber.trim()) {
      handleVerify();
    }
  };

  return (
    <div className="login-verification-container">
      <div className="login-verification-header">
        <button className="back-button" onClick={handleBack}>
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
          <h1 className="verification-title">OTP Verification</h1>
          <p className="verification-subtitle">
            Enter email and phone number to send one 
            time password
          </p>
          
          <div className="phone-display">
            <span className="phone-label">Email-Id</span>
            <input
              type="email"
              className="phone-input"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email address"
            />
          </div>
          
          <div className="phone-display">
            <span className="phone-label">Phone Number</span>
            <input
              type="tel"
              className="phone-input"
              value={phoneNumber}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />
          </div>
          
          <button className="continue-button" onClick={handleVerify}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginVerificationPage;
