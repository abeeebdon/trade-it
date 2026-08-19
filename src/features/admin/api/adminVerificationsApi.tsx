import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { ApproveVerificationPayload } from '../types/verifications';
import { toast } from 'sonner';

export const getVerificationQueue = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ADMIN_VERIFICATION_QUEUE);
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
      APIENDPOINTSTWO.ADMIN_VERIFICATION_APPROVE(id),
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
    const response = await api.patch(
      APIENDPOINTSTWO.ADMIN_VERIFICATION_REJECT(id),
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
