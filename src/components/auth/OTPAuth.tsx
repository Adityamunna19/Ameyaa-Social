import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuthStore } from '../../stores/authStore';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';

interface OTPAuthProps {
  onSuccess: () => void;
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export function OTPAuth({ onSuccess }: OTPAuthProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {}
    });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!phoneNumber || phoneNumber.length < 10) {
        throw new Error('Please enter a valid phone number');
      }

      generateRecaptcha();
      const formattedNumber = '+91' + phoneNumber; // Assuming Indian numbers
      const appVerifier = window.recaptchaVerifier;
      
      const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      (window as any).confirmationResult = confirmationResult;
      setShowOTPInput(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const confirmationResult = (window as any).confirmationResult;
      const result = await confirmationResult.confirm(otp);
      
      // Create or update user in your system
      await login(result.user.phoneNumber!, 'phone-auth');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div id="recaptcha-container"></div>
      
      {!showOTPInput ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <Phone className="h-5 w-5" />
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter your mobile number"
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-[#B31B1B] focus:ring-[#B31B1B] px-3 py-2 border"
                maxLength={10}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#B31B1B] text-white py-2 px-4 rounded-md hover:bg-[#B31B1B]/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Send OTP
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={verifyOTP} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#B31B1B] focus:ring-[#B31B1B] px-3 py-2 border"
              maxLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full flex items-center justify-center gap-2 bg-[#B31B1B] text-white py-2 px-4 rounded-md hover:bg-[#B31B1B]/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Verify OTP'
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowOTPInput(false)}
            className="w-full text-sm text-gray-600 hover:text-gray-900"
          >
            Change Phone Number
          </button>
        </form>
      )}
    </div>
  );
}