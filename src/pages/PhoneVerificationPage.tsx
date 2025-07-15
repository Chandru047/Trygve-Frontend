import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PhoneVerificationPage.css';

const PhoneVerificationPage: React.FC = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const handleBack = () => {
        navigate('/login');
    };
    
    const handleSendCode = () => {
        // Here you would implement the actual code sending logic
        console.log(`Sending code to: +91 ${phoneNumber}`);
        // Then you could navigate to a code verification page
        // navigate('/verify-code');
    };
    
    return (
        <div className="verification-container">
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
                        maxLength={10}
                    />
                </div>
                
                <div className="page-center-content">
                    <div className="caduceus-icon">
                        <img src="/caduceus.png" alt="Medical symbol" className="caduceus-image" />
                    </div>
                    
                    <div className="bottom-actions">
                        <button 
                            className="send-code-button"
                            onClick={handleSendCode}
                            disabled={phoneNumber.length < 10}
                        >
                            Send Code
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
