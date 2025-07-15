import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right'); // 'right' or 'left'
    
    const slides = [
        {
            background: '/LandingPage/1.png',
            title: 'TRYGVE',
            subtitle: 'Trusted Guardian of Life'
        },
        {
            background: '/LandingPage/2.png',
            title: 'Your Health, Our Priority',
            subtitle: 'Trusted doctors and care at your doorstep.'
        },
        {
            background: '/LandingPage/3.png',
            title: 'Seamless Care, Delivered',
            subtitle: 'Consult, treat, and heal—hassle-free.'
        },
        {
            background: '/LandingPage/4.png',
            title: 'Affordable Healthcare for Everyone',
            subtitle: 'Quality care for every budget.'
        }
    ];

    const nextSlide = () => {
        setSlideDirection('right');
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
 
    useEffect(() => {
        const timer = setTimeout(() => {
            setSlideDirection('right');
            setCurrentSlide(1);
        }, 3000);
        
        return () => clearTimeout(timer);
    }, []);

    const lastSlide = () => {
        setSlideDirection('right');
        setCurrentSlide(slides.length - 1);
    }

    const handleGetStarted = () => {
        // Navigate to the login page
        navigate('/login');
    };
    
    return (
        <div className="slider-container">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentSlide ? 'active' : index < currentSlide ? 'previous' : ''}`}
                    style={{ backgroundImage: `url(${slide.background})` }}
                >
                    <div className="slide-content">
                        <h1 className="logo">{slide.title}</h1>
                        <p className="landing-tagline">{slide.subtitle}</p>
                        {index === slides.length - 1 && (
                            <button className="get-started-btn" onClick={handleGetStarted}>
                                Get Started
                            </button>
                        )}
                    </div>
                </div>
            ))}
            
            {currentSlide !== 0 && currentSlide !== slides.length - 1 && (
                <div className="slider-controls">
                    <button className="skip-btn" onClick={lastSlide}>Skip</button>
                    <div className="dots">
                        {slides.map((_, index) => (
                            index!==0 && (  
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => {
                                    setSlideDirection(index > currentSlide ? 'right' : 'left');
                                    setCurrentSlide(index);
                                }}
                            ></span>
                        )))}
                    </div>
                    <button className="next-btn" onClick={nextSlide}>Next →</button>
                </div>
            )}
        </div>
    );
};

export default LandingPage;