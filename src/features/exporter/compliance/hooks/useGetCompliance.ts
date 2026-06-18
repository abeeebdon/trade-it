import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addComplianceDocument, getCompliance } from '../../api/complianceApi';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { AddComplianceFormType } from '../types/compliance';

// Get Direct to customers listing
export const useGetCOmplianceStatus = () => {
  return useQuery({
    queryKey: ['compliance'],
    queryFn: () => getCompliance(),
  });
};
export const useSubmitComplianceDoc = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddComplianceFormType) =>
      addComplianceDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['compliance'],
      });
      toast.success('Compliance document submitted  successfully');
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      console.error('API Mutation Error:', error);
      const data = error?.response?.data as { message?: string } | undefined;
      toast.error(
        data?.message ?? 'Failed to create listing. Please try again.',
      );
    },
  });
};
