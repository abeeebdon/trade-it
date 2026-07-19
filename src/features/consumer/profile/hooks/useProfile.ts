'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getProfile, updateProfile } from '../api/profileApi';
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
