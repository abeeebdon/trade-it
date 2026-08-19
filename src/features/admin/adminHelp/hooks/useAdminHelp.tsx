import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getHelpItems,
  getHelpItemById,
  createHelpItem,
  updateHelpItem,
  deleteHelpItem,
} from '../api/adminHelp';
import { CreateHelpPayload } from '../types/help';
import { queryClient } from '@/lib/react-query';

export const useGetHelpItems = () => {
  return useQuery({
    queryKey: ['admin-help'],
    queryFn: getHelpItems,
  });
};

export const useGetHelpItemById = (id: number) => {
  return useQuery({
    queryKey: ['admin-help', id],
    queryFn: () => getHelpItemById(id),
    enabled: !!id,
  });
};

export const useCreateHelpItem = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: createHelpItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-help'] });
      toast.success('Help article created successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to create help article. Please try again.');
    },
  });
};

export const useUpdateHelpItem = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CreateHelpPayload }) =>
      updateHelpItem({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-help'] });
      toast.success('Help article updated successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to update help article. Please try again.');
    },
  });
};

export const useDeleteHelpItem = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (id: number) => deleteHelpItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-help'] });
      toast.success('Help article deleted successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to delete help article. Please try again.');
    },
  });
};
