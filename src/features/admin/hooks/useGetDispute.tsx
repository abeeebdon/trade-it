import { useMutation, useQuery } from '@tanstack/react-query';
import { invalidateQueries } from '@/lib/react-query';
import {
  getDisputeQueue,
  getDisputeQueueById,
  rejectDispute,
  resolveDispute,
} from '../api/adminDispute';

export const useGetVerificationQueue = () => {
  return useQuery({
    queryKey: ['admin-dispute-queue'],
    queryFn: getDisputeQueue,
  });
};
export const useGetVerificationQueueByID = ({
  id,
}: {
  id: string | number;
}) => {
  return useQuery({
    queryKey: ['admin-dispute-details', id],
    queryFn: () => getDisputeQueueById({ id }),
  });
};
export const useResolveDispute = () => {
  return useMutation({
    mutationFn: resolveDispute,
    onSuccess: () => invalidateQueries(['admin-dispute-queue']),
  });
};
export const useRejectDispute = () => {
  return useMutation({
    mutationFn: rejectDispute,
    onSuccess: () => invalidateQueries(['admin-dispute-queue']),
  });
};
