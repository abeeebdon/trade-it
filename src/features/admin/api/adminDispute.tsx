import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { ApproveVerificationPayload } from '../types/verifications';
import { toast } from 'sonner';

export const getDisputeQueue = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ADMIN_DISPUTE_QUEUE);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getDisputeQueueById = async ({ id }: { id: string | number }) => {
  try {
    const response = await api.get(
      APIENDPOINTSTWO.ADMIN_DISPUTE_BY_ID(String(id)),
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const resolveDispute = async ({
  id,
  data,
}: ApproveVerificationPayload) => {
  try {
    const response = await api.patch(`AdminDispute/${id}/resolve`, data);
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
export const rejectDispute = async ({
  id,
  data,
}: ApproveVerificationPayload) => {
  try {
    const response = await api.patch(`AdminDispute/${id}/reject`, data);
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
