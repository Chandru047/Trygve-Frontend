import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthFlow } from '../context/AuthFlowContext';
import firebaseAuthService from '../firebase/auth';
import '../styles/OtpVerficationComponent.css';

interface OTPVerificationPageProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onVerify?: (otp: string, phoneNumber: string) => void;
  onResend?: (phoneNumber: string) => void;
  successNavigationPath?: string;
}

const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({
    title,
    subtitle,
    buttonText,
    onVerify,
    onResend,
    successNavigationPath = '/home'
}) => {
  const navigate = useNavigate();
  const { phoneNumber, confirmationResult, setConfirmationResult } = useAuthFlow();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    if (!phoneNumber || !confirmationResult && !isVerified) {
      navigate('/phone-verification');
    } else if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [phoneNumber, confirmationResult, navigate, isVerified]);

  const handleResendFirebaseOtp = async () => {
    if (!phoneNumber) {
      alert("Phone number not found. Please go back.");
      return;
    }
    setLoading(true);
    alert("Requesting a new code...");
    const result = await firebaseAuthService.sendOTP(phoneNumber);
    if (result.success && result.confirmationResult) {
      setConfirmationResult(result.confirmationResult);
      alert("A new code has been sent.");
    } else {
      alert(`Failed to resend code: ${result.error}`);
    }
    setLoading(false);
  };

  const handleVerifyFirebaseOtp = async (enteredOtp: string) => {
    if (!confirmationResult) {
      alert('Verification session expired. Please try again.');
      return;
    }
    setLoading(true);
    
    const result = await firebaseAuthService.verifyOTP(enteredOtp, confirmationResult);
    
    if (result.success && result.user) {
      setIsVerified(true);
      localStorage.setItem('firebaseUser', JSON.stringify(result.user));
      
      navigate(successNavigationPath);

      setConfirmationResult(null);
    } else {
      alert(`Verification failed: ${result.error}`);
      setLoading(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Move focus to next input if current input is filled
    if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && otp[index] === '' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle Enter key to verify OTP if all digits are filled
    if (e.key === 'Enter' && otp.join('').length === 6 && !loading) {
      handleVerify();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6 && !loading) {
      if (onVerify && phoneNumber) {
        onVerify(otpString, phoneNumber);
      } else {
        // Use Firebase verification if it's a Firebase OTP, otherwise use the built-in method
        handleVerifyFirebaseOtp(otpString);
      }
    }
  };

  const handleResendCode = () => {
    if (loading) return;
    
    if (onResend && phoneNumber) {
      onResend(phoneNumber);
    } else {
      // Use Firebase resend if it's a Firebase OTP, otherwise use the built-in method
      handleResendFirebaseOtp();
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-header">
        <button className="back-button" onClick={() => navigate(-1)} disabled={loading}>
          &lt;
        </button>
      </div>
      
      <div className="verification-content">
        <h1 className="verification-title">{title}</h1>
        <p className="verification-subtitle">
          {subtitle} 
        </p>
        
        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
              disabled={loading}
            />
          ))}
        </div>
        
        <p className="resend-text">
          Didn't receive code? 
          <button 
            className="resend-button" 
            onClick={handleResendCode}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Resend'}
          </button>
        </p>
        
        <div className="page-center-content">
          <div className="caduceus-icon">
            <img src="/HomePage/caduceus.png" alt="Medical symbol" className="caduceus-image" />
          </div>
          
          <div className="bottom-actions">
            <button 
              className="verify-button"
              onClick={handleVerify}
              disabled={otp.join('').length !== 6 || loading}
            >
              {loading ? 'Verifying...' : buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
