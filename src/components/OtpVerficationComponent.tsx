import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/OtpVerficationComponent.css';

interface OTPVerificationPageProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onVerify?: (otp: string, phoneNumber: string) => void;
}

const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({
    title,
    subtitle,
    buttonText,
    onVerify
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
        onVerify(otpString,phoneNumber);
      } else {
        console.log(`Verifying OTP: ${otpString} for phone number: ${phoneNumber}`);
        // Default verification logic - navigate to success page or dashboard
        // navigate('/dashboard');
      }
    }
  };

  const handleResendCode = () => {
    alert(`Resending code to phone number: ${phoneNumber}`);
    // Add your logic for resending code here
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