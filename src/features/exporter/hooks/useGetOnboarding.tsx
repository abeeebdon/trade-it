import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getExporterOnboardingStatus, onbaording } from '../api/onboarding';
import { toast } from 'sonner';
import { useAppSelector } from '@/hooks/store/store';
import { selectOnboarding } from '@/store/onboarding/onboarding.slice';
import {
  APPROVAL_DELAY_MS,
  buildMockOnboardingDetails,
} from '../onboarding/mocks/onboarding.mock';
import type { OnboardingRespType } from '../onboarding/types/exporterOnboardingtypes';

// TEMP: `getExporterOnboardingStatus` does not return the real payload yet, so the
// mock is built here and the page consumes the same return shape either way.
// Set to false (and delete `mocks/`) once the endpoint returns OnboardingRespType.
const USE_MOCK_ONBOARDING = true;

export const useGetExporterOnboardingDetails = () => {
  const { businessProfile, kycProfile, currentStep, kycSubmittedAt } =
    useAppSelector(selectOnboarding);

  const query = useQuery({
    queryKey: ['onboarding-details'],
    queryFn: () => getExporterOnboardingStatus(),
    enabled: !USE_MOCK_ONBOARDING,
  });

  // The mock approves on a clock, so nudge a re-render the moment it elapses.
  const [, tick] = useState(0);
  useEffect(() => {
    if (!USE_MOCK_ONBOARDING || !kycSubmittedAt) return;

    const remaining = kycSubmittedAt + APPROVAL_DELAY_MS - Date.now();
    if (remaining <= 0) return;

    const id = setTimeout(() => tick((n) => n + 1), remaining);
    return () => clearTimeout(id);
  }, [kycSubmittedAt]);

  const mock = USE_MOCK_ONBOARDING
    ? buildMockOnboardingDetails({
        businessProfile,
        kycProfile,
        currentStep,
        submittedAt: kycSubmittedAt,
      })
    : undefined;

  return {
    data: (mock ?? query.data) as OnboardingRespType | undefined,
    isPending: USE_MOCK_ONBOARDING ? false : query.isPending,
  };
};

export const useSubmitOnboardingDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onbaording,

    onSuccess: (data) => {
      toast.success('Business profile created successfully');

      queryClient.invalidateQueries({
        queryKey: ['onboarding-details'],
      });

      console.log(data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to submit onboarding details',
      );
    },
  });
};
