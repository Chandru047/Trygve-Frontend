import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    // Get phone number from location state
    if (location.state && location.state.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);
    }
    
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [location.state]);

  const handleVerifyOtp = (enteredOtp: string, _phoneNumber: string) => {
    // Get the stored OTP from localStorage
    const storedOtp = localStorage.getItem('otp');
    
    if (!storedOtp) {
      alert('No OTP found. Please request a new code.');
      return;
    }
    
    // Verify if the entered OTP matches the stored OTP
    if (enteredOtp === storedOtp) {
      // Clear the OTP from localStorage after successful verification
      localStorage.removeItem('otp');
      
      // Show success message
      alert('Success! OTP verified successfully.');
      
      // Navigate to the specified path or default to home
      navigate(successNavigationPath);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = (phoneNumber: string) => {
    // Generate a new random 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the new OTP in localStorage
    localStorage.setItem('otp', newOtp);
    
    // For development purposes, log the new OTP (remove in production)
    console.log(`New OTP generated: ${newOtp}`);
    
    alert(`New OTP sent to +91 ${phoneNumber}`);
  };

  const handleBack = () => {
    navigate(-1);
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
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      if (onVerify) {
        onVerify(otpString, phoneNumber);
      } else {
        // Use the built-in handleVerifyOtp function
        handleVerifyOtp(otpString, phoneNumber);
      }
    }
  };

  const handleResendCode = () => {
    if (onResend) {
      onResend(phoneNumber);
    } else {
      // Use the built-in handleResendOtp function
      handleResendOtp(phoneNumber);
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-header">
        <button className="back-button" onClick={handleBack}>
          &lt;
        </button>
      </div>
      
      <div className="verification-content">
        <h1 className="verification-title">{title}</h1>
        <p className="verification-subtitle">
          {subtitle} <span className="masked-phone">{phoneNumber ? `+91 ${phoneNumber.substring(0, 3)}*****${phoneNumber.substring(8)}` : ''}</span>
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
            />
          ))}
        </div>
        
        <p className="resend-text">
          Didn't receive code? <button className="resend-button" onClick={handleResendCode}>Resend</button>
        </p>
        
        <div className="page-center-content">
          <div className="caduceus-icon">
            <img src="/HomePage/caduceus.png" alt="Medical symbol" className="caduceus-image" />
          </div>
          
          <div className="bottom-actions">
            <button 
              className="verify-button"
              onClick={handleVerify}
              disabled={otp.join('').length !== 6}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;