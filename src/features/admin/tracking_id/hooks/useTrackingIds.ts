'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { mockTrackingIds } from '../data/mockTrackingIds';
import type { TrackingId, TrackingIdFormValues } from '../types/trackingId';

const TRACKING_KEYS = ['trackingIds'];

// Local in-memory store (swap for real API calls later).
let trackingStore: TrackingId[] = mockTrackingIds;

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export const useGetTrackingIds = () => {
  return useQuery({
    queryKey: TRACKING_KEYS,
    queryFn: async () => {
      await delay();
      return trackingStore;
    },
  });
};

export const useCreateTrackingId = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: TrackingIdFormValues) => {
      await delay();
      const created: TrackingId = {
        id: `trk-${Date.now()}`,
        orderNumber: values.orderNumber.trim(),
        trackingNumber: values.trackingNumber.trim(),
        status: values.status,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      trackingStore = [created, ...trackingStore];
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS });
      toast.success('Tracking ID created');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to create tracking ID');
    },
  });
};

export const useUpdateTrackingId = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: TrackingIdFormValues;
    }) => {
      await delay();
      trackingStore = trackingStore.map((item) =>
        item.id === id
          ? {
              ...item,
              orderNumber: values.orderNumber.trim(),
              trackingNumber: values.trackingNumber.trim(),
              status: values.status,
            }
          : item,
      );
      return trackingStore.find((item) => item.id === id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS });
      toast.success('Tracking ID updated');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to update tracking ID');
    },
  });
};

export const useDeleteTrackingId = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await delay();
      trackingStore = trackingStore.filter((item) => item.id !== id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS });
      toast.success('Tracking ID deleted');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to delete tracking ID');
    },
  });
};
