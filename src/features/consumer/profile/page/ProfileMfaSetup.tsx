'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Copy,
  Check,
  Key,
  Smartphone,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import InputField from '@/components/form/InputFIeld';
import { setupMfaApi, verifyMfaApi } from '@/features/authentication/api/mfa';
import QRCode from 'react-qr-code';
import type { MfaSetupResponse } from '@/features/authentication/api/mfa';
import { useAppDispatch } from '@/hooks/store/store';
import { setMfaEnabled } from '@/store/auth/auth.slice';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfileMfaSetup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [mfaData, setMfaData] = useState<MfaSetupResponse | null>(null);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Fetch the MFA setup (secret + QR URI) on mount
  useEffect(() => {
    const fetchSetup = async () => {
      try {
        const result = await setupMfaApi();
        if (result.success) {
          setMfaData(result.data);
        } else {
          toast.error(result.message || 'Failed to load MFA setup');
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const msg = (err as any)?.response?.data?.message;
        toast.error(msg || 'Failed to load MFA setup. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSetup();
  }, []);

  const handleCopy = async () => {
    if (!mfaData?.manualEntryKey) return;
    try {
      await navigator.clipboard.writeText(mfaData.manualEntryKey);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = code.trim();
    if (!trimmed || trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) {
      setError('Enter a valid 6-digit code from your authenticator app');
      return;
    }

    if (!mfaData) {
      setError('MFA setup data not available. Please refresh.');
      return;
    }

    setVerifying(true);
    setError('');

    try {
      const result = await verifyMfaApi({ code: trimmed });

      if (result.success) {
        // Update Redux immediately so ProfilePage reflects the change
        dispatch(setMfaEnabled(true));
        // Invalidate the profile query so isMfaEnabled refreshes
        queryClient.invalidateQueries({ queryKey: ['consumer-profile'] });
        toast.success(result.message || 'Two-factor authentication enabled!');
        router.push('/profile');
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

  // --- Loading ---
  if (loading) {
    return (
      <main>
        <div className="helix-card p-8 max-w-lg mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#1E293B] animate-pulse" />
            <div className="h-5 w-40 bg-[#1E293B] animate-pulse rounded" />
            <div className="h-4 w-64 bg-[#1E293B] animate-pulse rounded" />
            <div className="w-48 h-48 bg-[#1E293B] animate-pulse rounded-lg" />
          </div>
        </div>
      </main>
    );
  }

  // --- Error / no data ---
  if (!mfaData) {
    return (
      <main>
        <div className="helix-card p-8 max-w-lg mx-auto text-center">
          <Shield size={32} className="text-red-400 mx-auto mb-3" />
          <h2 className="helix-h3 mb-2">Setup unavailable</h2>
          <p className="text-[13px] text-[#9CA3AF] mb-5">
            Could not load MFA configuration. Please refresh or contact support.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="helix-btn-primary text-sm"
            >
              Retry
            </button>
            <Link
              href="/profile"
              className="text-[12px] text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors"
            >
              Back to profile
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="helix-card p-8 max-w-lg mx-auto">
        {/* Back link */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[12px] text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors mb-5"
        >
          <ArrowLeft size={13} />
          Back to profile
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-[#C9922A]/10 flex items-center justify-center">
            <Shield size={20} className="text-[#C9922A]" />
          </div>
          <div>
            <h2 className="helix-h3">Setup Two-Factor Auth</h2>
          </div>
        </div>
        <p className="text-[13px] text-[#9CA3AF] mt-2 mb-6">
          Scan the QR code with your authenticator app (Google Authenticator,
          Authy, etc.) to secure your account.
        </p>

        {/* QR code */}
        <div className="flex justify-center mb-5">
          <div className="bg-white p-3 rounded-xl shadow-lg">
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={mfaData.authenticatorUri}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>

        {/* Manual entry key */}
        <div className="rounded-md border border-[#1A7A6E]/20 bg-[#0A1628]/40 p-4 mb-6">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#9CA3AF] mb-2">
            <Key size={12} />
            Manual entry key
          </div>
          <div className="flex items-center justify-between gap-2">
            <code className="text-[14px] font-mono tracking-wider text-[#F5F5F5] break-all select-all">
              {mfaData.manualEntryKey}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 p-2 rounded-md hover:bg-[#1A7A6E]/15 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-[#C9922A]" />
              )}
            </button>
          </div>
          <p className="text-[11px] text-[#9CA3AF] mt-2">
            Can&apos;t scan? Enter this key manually in your app.
          </p>
        </div>

        {/* Verification form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#9CA3AF]">
            <Smartphone size={12} />
            Verify setup
          </div>

          <InputField
            label="Authentication code"
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
            {verifying ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Verifying…
              </span>
            ) : (
              'Verify & Enable'
            )}
          </button>
        </form>

        <p className="text-[11px] text-[#9CA3AF] text-center mt-5">
          Enter the 6-digit code shown in your authenticator app after scanning
          the QR code.
        </p>
      </div>
    </main>
  );
}
