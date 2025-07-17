import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AccountSetupPage.css';

const AccountSetupPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        location: '',
        secondaryPhone: ''
    });

    useEffect(() => {
        // Get phone number from location state (passed from previous steps)
        if (location.state && location.state.phoneNumber) {
            setPhoneNumber(location.state.phoneNumber);
        }
    }, [location.state]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateAccount = () => {
        // Create user object with form data
        const userData = {
            fullName: formData.fullName,
            email: formData.email,
            location: formData.location,
            phoneNumber: phoneNumber, // Primary phone number from signup
            secondaryPhone: formData.secondaryPhone,
            createdAt: new Date().toISOString(),
            id: Date.now().toString() // Simple ID generation
        };
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log('Account created:', userData);
        
        // Navigate to home page
        navigate('/signup-success');
    };

    const isFormValid = () => {
        return formData.fullName.trim() !== '' && 
               formData.email.trim() !== '' && 
               formData.location.trim() !== '' && 
               formData.secondaryPhone.trim() !== '';
    };

    return (
        <div className="account-setup-container">
            <div className="account-setup-header">
                <button className="back-button" onClick={handleBack}>
                    &lt;
                </button>
            </div>
            
            <div className="account-setup-content">
                <h1 className="account-setup-title">Almost Done!</h1>
                <p className="account-setup-subtitle">
                    Please enter your details in the following section.
                </p>
                
                <div className="form-container">
                    <div className="input-group">
                        <input
                            type="text"
                            name="fullName"
                            className="form-input"
                            placeholder="Enter Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group location-input">
                        <input
                            type="text"
                            name="location"
                            className="form-input"
                            placeholder="Arasur, Coimbatore"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                        <span className="location-icon"></span>
                    </div>

                    <div className="input-group">
                        <input
                            type="tel"
                            name="secondaryPhone"
                            className="form-input"
                            placeholder="Enter Secondary Phone Number"
                            value={formData.secondaryPhone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="page-center-content">
                    <div className="caduceus-icon">
                        <img src="/HomePage/caduceus.png" alt="Medical symbol" className="caduceus-image" />
                    </div>
                    
                    <div className="bottom-actions">
                        <button 
                            className="create-account-button"
                            onClick={handleCreateAccount}
                            disabled={!isFormValid()}
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSetupPage;
