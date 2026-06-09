import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createListing, getListings, ListingsParams } from '../api/listingsApi';
import { toast } from 'sonner';
import { CreateListingPayload } from '../types/exporter';
import { AxiosError } from 'axios';

export const useCreateListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateListingPayload) => createListing(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listings'],
      });
      toast.success('Listing created successfully');
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

// Get Direct to customers listing
export const useGetListings = ({ pageNumber, pageSize }: ListingsParams) => {
  return useQuery({
    queryKey: ['dtc-listings', pageNumber, pageSize],
    queryFn: () => getListings({ pageNumber, pageSize }),
  });
};
