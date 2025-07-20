import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  type ConfirmationResult,
  type User
} from 'firebase/auth';
import { auth } from './config';

interface RecaptchaConfig {
    size: 'invisible' | 'normal' | 'compact';
    callback: (response: string) => void;
    'expired-callback': () => void;
}

class FirebaseAuthService {
  private recaptchaVerifier: RecaptchaVerifier | null;

  constructor() {
    this.recaptchaVerifier = null;
  }

  // Initialize reCAPTCHA
  initializeRecaptcha(elementId: string): void {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
    }
    this.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: () => console.log('reCAPTCHA solved'),
      'expired-callback': () => console.log('reCAPTCHA expired'),
    } as RecaptchaConfig);
  }

  // Send OTP to phone number
  async sendOTP(phoneNumber: string): Promise<{ success: boolean; confirmationResult?: ConfirmationResult; error?: string }> {
    try {
      if (!this.recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized.');
      }
      // Format phone number with country code
      const formattedPhoneNumber = `+91${phoneNumber}`;
      
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        formattedPhoneNumber, 
        this.recaptchaVerifier
      );
      
      return { success: true, confirmationResult };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Verify OTP
  async verifyOTP(otpCode: string, confirmationResult: ConfirmationResult): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const result = await confirmationResult.confirm(otpCode);
      return { success: true, user: result.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Clean up resources
  cleanup(): void {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
  }
}

const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;
