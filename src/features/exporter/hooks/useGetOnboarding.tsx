import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getExporterOnboardingStatus, onbaording } from '../api/onboarding';
import { toast } from 'sonner';

export const useGetExporterOnboardingDetails = () => {
  return useQuery({
    queryKey: ['onboarding-details'],
    queryFn: () => getExporterOnboardingStatus(),
  });
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
