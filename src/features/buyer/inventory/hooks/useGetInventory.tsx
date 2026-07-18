import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  createLocalListing,
  deleteLocalListing,
  editLocalListing,
  getLocalListingById,
  getLocalListings,
} from '../api/inventoryApi';
import {
  CreateLocalListingPayload,
  EditLocalListingPayload,
  PaginatedResponse,
} from '../types/inventory';
import { ListingsParams } from '@/features/exporter/sell/types/sellType';
import { ListingItem } from '../../types/buyers';

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
        queryKey: ['dtc-listings'],
      });
      toast.success('Listing updated successfully');
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

export const useDeleteLocalListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteLocalListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dtc-listings'],
      });
      toast.success('Listing deleted successfully');
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      console.error('API Mutation Error:', error);
      const data = error?.response?.data as { message?: string } | undefined;
      toast.error(
        data?.message ?? 'Failed to delete listing. Please try again.',
      );
    },
  });
};

// Get Direct to customers listing
export const useGetLocalListings = ({
  pageNumber,
  pageSize,
}: ListingsParams) => {
  return useQuery<PaginatedResponse<ListingItem>>({
    queryKey: ['dtc-listings', pageNumber, pageSize],
    queryFn: () => getLocalListings({ pageNumber, pageSize }),
  });
};
export const useGetListingById = ({ id }: { id: string }) => {
  return useQuery<ListingItem>({
    queryKey: ['dtc-listings-details', id],
    queryFn: () => getLocalListingById({ id }),
  });
};
