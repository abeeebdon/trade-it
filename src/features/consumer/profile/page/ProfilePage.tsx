'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCircle, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useAppSelector } from '@/hooks/store/store';
import { MOCK_PROFILE_PHONE } from '../constants';
import { profileSchema } from '../components/validation';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileSkeleton from '../components/ProfileSkeleton';

const SIMULATED_DELAY_MS = 600;

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const t = setTimeout(() => {
      reset({
        name: user?.fullName || '',
        phone: MOCK_PROFILE_PHONE,
      });
      setLoading(false);
    }, SIMULATED_DELAY_MS);
    return () => clearTimeout(t);
  }, [user?.fullName, reset]);

  const onSubmit = () => {
    setSaving(true);
    setTimeout(() => {
      toast.success('Profile updated');
      setSaving(false);
    }, 500);
  };

  if (loading || !user) return <ProfileSkeleton />;

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
                <UserCircle size={13} /> Full name
              </label>
              <input
                className="helix-input"
                {...register('name')}
                data-testid="profile-name"
              />
              {errors.name && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="helix-label flex items-center gap-1.5">
                <Mail size={13} /> Email
              </label>
              <input
                className="helix-input opacity-60 cursor-not-allowed"
                value={user.email}
                disabled
                data-testid="profile-email"
              />
              <div className="text-[10px] text-[#9CA3AF] mt-1">
                Email is managed by your sign-in provider.
              </div>
            </div>
            <div>
              <label className="helix-label flex items-center gap-1.5">
                <Phone size={13} /> Phone
              </label>
              <input
                className="helix-input"
                placeholder="+1 202 555 0100"
                {...register('phone')}
                data-testid="profile-phone"
              />
              {errors.phone && (
                <p className="text-[#E74C3C] text-[11px] mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="helix-btn-primary"
                data-testid="profile-save"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
