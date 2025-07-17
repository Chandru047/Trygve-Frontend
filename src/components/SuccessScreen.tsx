import React from 'react';
import '../styles/SuccessScreen.css';

interface SuccessScreenProps {
    title: string;
    subtitle: string;
    buttonText: string;
    onButtonClick: () => void;
    iconSrc?: string;
    iconAlt?: string;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
    title,
    subtitle,
    buttonText,
    onButtonClick,
    iconSrc,
    iconAlt = "Success icon"
}) => {
    return (
        <div className="success-screen-container">
            <div className="success-screen-header">
                <button className="back-button" onClick={() => window.history.back()}>
                    &lt;
                </button>
            </div>
            
            <div className="success-screen-content">
                <div className="success-icon-container">
                    {iconSrc ? (
                        <img src={iconSrc} alt={iconAlt} className="success-icon" />
                    ) : (
                        <div className="default-success-icon">
                            <div className="checkmark-circle">
                                <div className="checkmark">✓</div>
                            </div>
                        </div>
                    )}
                </div>
                
                <h1 className="success-title">{title}</h1>
                <p className="success-subtitle">{subtitle}</p>
                
                <div className="success-actions">
                    <button 
                        className="success-button"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessScreen;
