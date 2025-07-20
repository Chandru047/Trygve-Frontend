import OTPVerificationPage from '../components/OtpVerficationComponent';

const OtpSignUp = () => {
  return (
    <OTPVerificationPage
      title="Verify Your Number"
      subtitle="Enter the code we sent to your number to complete the sign up."
      buttonText="Verify"
      successNavigationPath="/account-setup"
    />
  );
};

export default OtpSignUp;