import OtpVerficationComponent from '../components/OtpVerficationComponent';

const OTPVerificationWrapper = () => {
  return (
    <OtpVerficationComponent
      title="OTP Verification"
      subtitle="Enter the verification code we just sent to your number"
      buttonText="Verify"
      successNavigationPath="/account-setup"
    />
  );
};

export default OTPVerificationWrapper;