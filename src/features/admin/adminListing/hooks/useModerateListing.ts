import { useMutation } from '@tanstack/react-query';
import { moderateListing } from '../api/adminListings';
import { invalidateQueries } from '@/lib/react-query';
import { toast } from 'sonner';

export const useModerateListing = () => {
  return useMutation({
    mutationFn: moderateListing,
    onSuccess: (data) => {
      invalidateQueries(['admin-listings']);
      toast.success(data?.message ?? 'Listing moderated successfully');
    },
  });
};
