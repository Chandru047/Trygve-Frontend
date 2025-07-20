import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseAuthService from '../firebase/auth';
import { useAuthFlow } from '../context/AuthFlowContext'; // Import the hook
import '../styles/PhoneVerificationPage.css';

const PhoneVerificationPage: React.FC = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const { setPhoneNumber: setAuthPhoneNumber, setConfirmationResult } = useAuthFlow(); // Use the context

    useEffect(() => {
        // Initialize reCAPTCHA when component mounts.
        // The cleanup is removed from here to prevent clearing the confirmation result
        // before navigating to the OTP verification page.
        firebaseAuthService.initializeRecaptcha('recaptcha-container');
        // The return statement with cleanup is removed.
    }, []);
    
    const handleBack = () => {
        navigate(-1);
    };
    
    const handleSendCode = async () => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        
        const result = await firebaseAuthService.sendOTP(phoneNumber);
        
        if (result.success && result.confirmationResult) {
            // Store results in context
            setAuthPhoneNumber(phoneNumber);
            setConfirmationResult(result.confirmationResult);
            // Navigate without state
            navigate('/verify-code');
        } else {
            alert(`Failed to send OTP: ${result.error}`);
        }
        
        setLoading(false);
    };
    
    return (
        <div className="verification-container">
            {/* reCAPTCHA container - hidden */}
            <div id="recaptcha-container" style={{ display: 'none' }}></div>
            
            <div className="verification-header">
                <button className="back-button" onClick={handleBack}>
                    &lt;
                </button>
            </div>
            
            <div className="verification-content">
                <h1 className="verification-title">Can you input your number?</h1>
                <p className="verification-subtitle">
                    You will be sent a code on this number to verify 
                    if you are the owner of the number.
                </p>
                
                <div className="phone-input-container">
                    <div className="country-code">
                        <img src="PhoneVerification/Indian_Flag.png" alt="Indian flag" className="country-flag" />
                        <span>+91</span>
                    </div>
                    <input
                        type="tel"
                        className="phone-input"
                        placeholder="12345 67890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && phoneNumber.length >= 10 && !loading) {
                                handleSendCode();
                            }
                        }}
                        maxLength={10}
                        disabled={loading}
                    />
                </div>
                
                <div className="page-center-content">
                    <div className="caduceus-icon">
                        <img src="/HomePage/caduceus.png" alt="Medical symbol" className="caduceus-image" />
                    </div>
                    
                    <div className="bottom-actions">
                        <button 
                            className="send-code-button"
                            onClick={handleSendCode}
                            disabled={phoneNumber.length < 10 || loading}
                        >
                            {loading ? 'Sending...' : 'Send Code'}
                        </button>
                        
                        <p className="login-link">
                            Already have an account? <a href="#" onClick={() => navigate('/login')}>Log in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneVerificationPage;
