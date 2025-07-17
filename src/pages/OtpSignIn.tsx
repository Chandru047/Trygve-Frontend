import OtpVerficationComponent from '../components/OtpVerficationComponent';

const OTPVerificationWrapperSignIn = () => {
  return (
    <OtpVerficationComponent
      title="Verification Code"
      subtitle="We have sent the verification code to your email address"
      buttonText="Continue"
      successNavigationPath="/signin-success"
    />
  );
};

export default OTPVerificationWrapperSignIn;