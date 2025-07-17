import { useNavigate } from 'react-router-dom';
import SuccessScreen from '../components/SuccessScreen';

const SignUpSuccess = () => {
  const navigate = useNavigate();

  return (
    <SuccessScreen
      title="You're Now with Your Trusted Guardian of Life!"
      subtitle="Welcome to the TRYGVE family. Your journey to better health starts here."
      buttonText="Back to Login"
      onButtonClick={() => navigate('/home')}
    />
  );
};

export default SignUpSuccess;