import OtpVerficationComponent from '../components/OtpVerficationComponent';
const OTPVerificationWrapper = () => {
  return (
    <OtpVerficationComponent
      title="OTP Verification"
      subtitle="Enter the verification code we just sent to your number"
      buttonText="Verify"
      onVerify={(otp, phoneNumber) => {
        // Custom verification logic
        alert(`Verifying OTP: ${otp} for ${phoneNumber}`);
        // Navigate on successful verification
        // navigate('/success');
      }}
    />
  );
};

export default OTPVerificationWrapper;