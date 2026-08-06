import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createListing,
  deleteListing,
  editListing,
  getListingById,
  getListings,
} from '../api/listingsApi';
import { toast } from 'sonner';
import { CreateListingPayload } from '../types/exporter';
import { AxiosError } from 'axios';
import { ListingsParams } from '../sell/types/sellType';
import { EditListingPayload } from '../fulfillment/types/fulftillment';

export const useCreateListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateListingPayload) => createListing(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['dtc-listings'],
      });
      toast.success(data?.message ?? 'Listing created successfully');
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
export const useEditListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: EditListingPayload) =>
      editListing({ id, payload }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['dtc-listings'],
      });
      toast.success(data?.message ?? 'Listing edited successfully');
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
export const useGetListingById = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ['dtc-listings-details', id],
    queryFn: () => getListingById({ id }),
    enabled: !!id,
  });
};

export const useDeleteListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteListing(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['dtc-listings'],
      });
      toast.success(data?.message ?? 'Listing deleted successfully');
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
