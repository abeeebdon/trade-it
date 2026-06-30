import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  createLocalListing,
  editLocalListing,
  getLocalListingById,
  getLocalListings,
} from '../api/inventoryApi';
import {
  CreateLocalListingPayload,
  EditLocalListingPayload,
} from '../types/inventory';
import { ListingsParams } from '@/features/exporter/sell/types/sellType';

export const useCreateLocalListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLocalListingPayload) =>
      createLocalListing(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['local-listings'],
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
export const useEditLocalListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: EditLocalListingPayload) =>
      editLocalListing({ id, payload }),
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
export const useGetLocalListings = ({
  pageNumber,
  pageSize,
}: ListingsParams) => {
  return useQuery({
    queryKey: ['dtc-listings', pageNumber, pageSize],
    queryFn: () => getLocalListings({ pageNumber, pageSize }),
  });
};
export const useGetListingById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['dtc-listings-details', id],
    queryFn: () => getLocalListingById({ id }),
  });
};
