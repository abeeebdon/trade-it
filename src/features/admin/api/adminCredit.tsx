import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { toast } from 'sonner';
import { CreditAPiType } from '../types/credit';

export const getCreditQueue = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ADMIN_CREDIT_QUEUE);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const underReview = async ({ id, data }: CreditAPiType) => {
  try {
    const response = await api.patch(
      APIENDPOINTSTWO.ADMIN_CREDIT_UNDER_REVIEW(id),
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
export const extendOffer = async ({ id, data }: CreditAPiType) => {
  try {
    const response = await api.patch(
      APIENDPOINTSTWO.ADMIN_CREDIT_EXTEND_OFFER(id),
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
export const rejectCreditApplication = async ({ id, data }: CreditAPiType) => {
  try {
    const response = await api.patch(
      APIENDPOINTSTWO.ADMIN_CREDIT_REJECT(id),
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
