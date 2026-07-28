'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getProfile, updateProfile } from '../api/profileApi';
import { disableMfaApi } from '@/features/authentication/api/mfa';
import { setMfaEnabled } from '@/store/auth/auth.slice';
import { useAppDispatch } from '@/hooks/store/store';
import type { ProfileUpdatePayload } from '../types';

const PROFILE_KEY = ['consumer-profile'];

export const useGetProfile = () => {
  return useQuery({
    queryKey: PROFILE_KEY,
    queryFn: () => getProfile(),
  });
};

export const useUpdateProfile = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileUpdatePayload) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY });
      toast.success('Profile updated');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to update profile. Please try again.');
    },
  });
};

export const useDisableMfa = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (code: string) => disableMfaApi({ code }),
    onSuccess: (data) => {
      dispatch(setMfaEnabled(false));
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY });
      toast.success(data.message || 'MFA disabled');
    },
    onError: () => {
      toast.error('Failed to disable MFA. Please try again.');
    },
  });
};
