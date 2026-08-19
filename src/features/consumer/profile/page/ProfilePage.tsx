'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ShieldOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAppSelector } from '@/hooks/store/store';
import { profileSchema } from '../components/validation';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileSkeleton from '../components/ProfileSkeleton';
import {
  useGetProfile,
  useUpdateProfile,
  useDisableMfa,
} from '../hooks/useProfile';
import Modal from '@/components/ui/Modal';

export default function Profile() {
  const router = useRouter();
  const { user, mfaEnabled } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetProfile();
  const { mutate: save, isPending: saving } = useUpdateProfile();
  const { mutate: disableMfa, isPending: disabling } = useDisableMfa();

  const profile = data?.data;
  const isMfaEnabled = mfaEnabled;

  const [showDisableModal, setShowDisableModal] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleDisableConfirm = () => {
    const trimmed = mfaCode.trim();
    if (!trimmed || trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) {
      setCodeError('Enter a valid 6-digit code');
      return;
    }
    setCodeError('');
    disableMfa(trimmed, {
      onSuccess: () => {
        setShowDisableModal(false);
        setMfaCode('');
      },
    });
  };

  const handleOpenDisableModal = () => {
    setMfaCode('');
    setCodeError('');
    setShowDisableModal(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.fullName || user?.fullName || '',
        phone: profile.phoneNumber || '',
      });
    }
  }, [profile, user?.fullName, reset]);

  const onSubmit = (values: { name: string; phone: string }) => {
    save({
      fullName: values.name,
      phoneNumber: values.phone,
    });
  };

  if (isLoading || !user) return <ProfileSkeleton />;

  return (
    <main>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Avatar block */}
        <ProfileAvatar user={user} />

        {/* Editable form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-2 helix-card p-6"
        >
          <div className="helix-h3 mb-4">Personal information</div>
          <div className="space-y-4">
            <div>
              <label className="helix-label flex items-center gap-1.5">
                Full name
              </label>
              <input className="helix-input" {...register('name')} />
              {errors.name && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="helix-label flex items-center gap-1.5">
                Email
              </label>
              <input
                className="helix-input opacity-60 cursor-not-allowed"
                value={profile?.email || user.email}
                disabled
              />
              <div className="text-[10px] text-[#9CA3AF] mt-1">
                Email is managed by your sign-in provider.
              </div>
            </div>
            <div>
              <label className="helix-label flex items-center gap-1.5">
                Phone
              </label>
              <input
                className="helix-input"
                placeholder="+1 202 555 0100"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* ── MFA Security section ── */}
            <div className="rounded-md border border-[#1A7A6E]/20 bg-bg/40 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {isMfaEnabled ? (
                    <ShieldCheck
                      size={20}
                      className="text-[#1A6B4A] shrink-0 mt-0.5"
                    />
                  ) : (
                    <ShieldOff
                      size={20}
                      className="text-[#C9922A] shrink-0 mt-0.5"
                    />
                  )}
                  <div>
                    <div className="text-[13px] font-semibold">
                      {isMfaEnabled
                        ? 'Two-factor authentication is active'
                        : 'Two-factor authentication is not set up'}
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                      {isMfaEnabled
                        ? 'Your account is secured with an authenticator app.'
                        : 'Add an extra layer of security by enabling two-factor authentication.'}
                    </p>
                  </div>
                </div>

                {isMfaEnabled ? (
                  <button
                    type="button"
                    disabled={disabling}
                    onClick={handleOpenDisableModal}
                    className="shrink-0 px-4 py-2 rounded-full text-[12px] border border-[#E74C3C]/40 text-[#E74C3C] hover:bg-[#E74C3C]/10 transition-all disabled:opacity-50"
                  >
                    {disabling ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      'Disable'
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => router.push('/profile/mfa')}
                    className="shrink-0 px-4 py-2 rounded-full text-[12px] bg-[#C9922A] text-[#0A1628] hover:bg-[#D4A13C] transition-all inline-flex items-center gap-1.5"
                  >
                    Setup <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="helix-btn-primary"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ── MFA Disable Confirmation Modal ── */}
      {showDisableModal && (
        <Modal
          title="Disable Two-Factor Authentication"
          onClose={() => {
            if (!disabling) {
              setShowDisableModal(false);
              setMfaCode('');
              setCodeError('');
            }
          }}
          maxWidth="max-w-sm"
        >
          <div className="p-6 space-y-4">
            <p className="text-[13px] text-[#9CA3AF]">
              Enter a 6-digit code from your authenticator app to confirm you
              want to disable two-factor authentication.
            </p>

            <div>
              <label className="helix-label flex items-center gap-1.5">
                Authentication code
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                autoComplete="one-time-code"
                value={mfaCode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setMfaCode(val);
                  if (codeError) setCodeError('');
                }}
                className="helix-input"
              />
              {codeError && (
                <p className="text-[#E74C3C] text-[11px] mt-1">{codeError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={disabling}
                onClick={() => {
                  setShowDisableModal(false);
                  setMfaCode('');
                  setCodeError('');
                }}
                className="px-4 py-2 rounded-full text-[12px] border border-[#1A7A6E]/30 text-[#9CA3AF] hover:border-[#1A7A6E] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={disabling || mfaCode.length !== 6}
                onClick={handleDisableConfirm}
                className="px-4 py-2 rounded-full text-[12px] bg-[#E74C3C] text-white hover:bg-[#C0392B] transition-all disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                {disabling ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Disabling…
                  </>
                ) : (
                  'Confirm Disable'
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
