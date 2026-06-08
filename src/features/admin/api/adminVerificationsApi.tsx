import api from '@/configs/api-config';
import { ApproveVerificationPayload } from '../types/verifications';
import { toast } from 'sonner';
import { invalidateQueries } from '@/lib/react-query';

export const getVerificationQueue = async () => {
  try {
    const response = await api.get('/AdminVerification/queue');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const approveVerification = async ({
  id,
  data,
}: ApproveVerificationPayload) => {
  try {
    const response = await api.patch(
      `/AdminVerification/${id}/approve-provision`,
      data,
    );
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
export const rejectVerification = async ({
  id,
  data,
}: ApproveVerificationPayload) => {
  try {
    const response = await api.patch(`/AdminVerification/${id}/reject`, data);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
