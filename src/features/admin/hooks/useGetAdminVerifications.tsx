import { useMutation, useQuery } from '@tanstack/react-query';
import {
  approveVerification,
  getVerificationQueue,
  rejectVerification,
} from '../api/adminVerificationsApi';
import { invalidateQueries } from '@/lib/react-query';

export const useGetVerificationQueue = () => {
  return useQuery({
    queryKey: ['admin-verifications-queue'],
    queryFn: getVerificationQueue,
  });
};
export const useApproveVerification = () => {
  return useMutation({
    mutationFn: approveVerification,
    onSuccess: () => invalidateQueries(['admin-verifications-queue']),
  });
};
export const useRejectVerification = () => {
  return useMutation({
    mutationFn: rejectVerification,
    onSuccess: () => invalidateQueries(['admin-verifications-queue']),
  });
};
