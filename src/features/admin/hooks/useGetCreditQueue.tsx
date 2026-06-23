import { useMutation, useQuery } from '@tanstack/react-query';
import { extendOffer, getCreditQueue, underReview } from '../api/adminCredit';
import { invalidateQueries } from '@/lib/react-query';

export const useGetCreditQueue = () => {
  return useQuery({
    queryKey: ['admin-credit-queue'],
    queryFn: getCreditQueue,
  });
};
export const useReviewCredit = () => {
  return useMutation({
    mutationFn: underReview,
    onSuccess: () => invalidateQueries(['admin-credit-queue']),
  });
};
export const useExtendCreditApp = () => {
  return useMutation({
    mutationFn: extendOffer,
    onSuccess: () => invalidateQueries(['admin-credit-queue']),
  });
};
export const useRejectCredit = () => {
  return useMutation({
    mutationFn: extendOffer,
    onSuccess: () => invalidateQueries(['admin-credit-queue']),
  });
};
