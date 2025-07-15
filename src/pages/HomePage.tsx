import React from "react";
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        // Navigate to signup page
        navigate('/signup');
    };

    const handleLogin = () => {
        // Navigate to login form
        navigate('/signin');
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="welcome-text">Welcome to</h1>
                <h1 className="logo-text">trygve</h1>
                <p className="login-tagline">Your trusted partner for personalized healthcare, right at your doorstep</p>
                
                <div className="auth-buttons">
                    <button className="signup-btn" onClick={handleSignUp}>
                        Sign up
                    </button>
                    <button className="login-btn" onClick={handleLogin}>
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

