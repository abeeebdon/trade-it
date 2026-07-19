'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/hooks/store/store';
import { profileSchema } from '../components/validation';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileSkeleton from '../components/ProfileSkeleton';
import { useGetProfile, useUpdateProfile } from '../hooks/useProfile';

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetProfile();
  const { mutate: save, isPending: saving } = useUpdateProfile();

  const profile = data?.data;

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
    </main>
  );
}
