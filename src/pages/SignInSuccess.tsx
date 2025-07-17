import { useNavigate } from 'react-router-dom';
import SuccessScreen from '../components/SuccessScreen';

const SignUpSuccess = () => {
  const navigate = useNavigate();

  return (
    <SuccessScreen
      title="Welcome Back to TRYGVE!"
      subtitle="Your trusted guardian of life is ready to serve you."
      buttonText="Continue"
      onButtonClick={() => navigate('/DashBoard')}
    />
  );
};

export default SignUpSuccess;