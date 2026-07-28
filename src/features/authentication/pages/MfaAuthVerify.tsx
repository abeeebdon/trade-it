'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Smartphone, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import InputField from '@/components/form/InputFIeld';
import Loader from '@/components/buttons/Loader';
import { verifyMfaChallengeApi } from '../api/mfa';
import { useAppDispatch } from '@/hooks/store/store';
import { login, setAuthRole } from '@/store/auth/auth.slice';
import { saveCookie } from '@/store/auth/cookies';

export default function MfaAuthVerify() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const challengeToken = searchParams.get('challenge') ?? '';

  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = code.trim();
    if (!trimmed || trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) {
      setError('Enter a valid 6-digit code from your authenticator app');
      return;
    }

    if (!challengeToken) {
      setError('Missing challenge token. Please log in again.');
      return;
    }

    setVerifying(true);
    setError('');

    try {
      const result = await verifyMfaChallengeApi({
        code: trimmed,
        challengeToken: challengeToken,
      });

      if (result.success) {
        toast.success(result.message || 'MFA verified successfully');

        // Save tokens
        saveCookie('token', result.data.token);
        saveCookie('refreshToken', result.data.refreshToken);

        // Update Redux store
        const userDetails = {
          email: result.data.email,
          fullName: result.data.fullName,
          isMfaEnabled: result.data.isMfaEnabled ?? true,
        };
        dispatch(login(userDetails));

        // Route to the correct dashboard
        const role = result.data.roles[0]?.toLowerCase();
        switch (role) {
          case 'admin':
            dispatch(setAuthRole('admin'));
            router.push('/admin');
            break;
          case 'retailer':
            dispatch(setAuthRole('retailer'));
            router.push('/buyer');
            break;
          case 'consumer':
            dispatch(setAuthRole('consumer'));
            router.push('/consumer');
            break;
          case 'exporter':
          case 'export admin':
            dispatch(setAuthRole('exporter'));
            router.push('/exporter');
            break;
          default:
            router.push('/consumer');
        }
      } else {
        toast.error(result.message || 'Verification failed');
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msg = (err as any)?.response?.data?.message;
      setError(msg || 'Invalid code. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  // Missing challenge token — show fallback
  if (!challengeToken) {
    return (
      <div className="w-full max-w-md mx-auto helix-card p-8 fade-up text-center">
        <Shield size={32} className="text-[#C9922A] mx-auto mb-3" />
        <h1 className="helix-h2 mb-2">Session expired</h1>
        <p className="text-[13px] text-[#9CA3AF] mb-5">
          Your MFA challenge token is missing or expired. Please log in again.
        </p>
        <Link href="/login" className="helix-btn-primary text-sm inline-block">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto helix-card p-8 fade-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-lg bg-[#C9922A]/10 flex items-center justify-center">
          <Shield size={20} className="text-[#C9922A]" />
        </div>
        <div>
          <h1 className="helix-kicker">Two-Factor Authentication</h1>
        </div>
      </div>
      <p className="text-[13px] text-[#9CA3AF] mt-2 mb-6">
        Enter the 6-digit code from your authenticator app to continue.
      </p>

      {/* Verification form */}
      <form onSubmit={handleVerify} className="space-y-4">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#9CA3AF]">
          <Smartphone size={12} />
          Authentication code
        </div>

        <InputField
          label="6-digit code"
          type="text"
          inputMode="numeric"
          placeholder="000000"
          maxLength={6}
          autoComplete="one-time-code"
          value={code}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
            setCode(val);
            if (error) setError('');
          }}
          error={error}
          name="mfaCode"
        />

        <button
          disabled={verifying || code.length !== 6}
          type="submit"
          className="helix-btn-primary w-full"
        >
          {verifying ? <Loader /> : 'Verify & Continue'}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-[#1A7A6E]/15 text-center">
        <Link
          href="/login"
          className="text-[12px] text-[#9CA3AF] hover:text-[#F5F5F5] inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to login
        </Link>
      </div>
    </div>
  );
}
