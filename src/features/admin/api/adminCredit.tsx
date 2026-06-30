import api from '@/configs/api-config';
import { toast } from 'sonner';
import { CreditAPiType } from '../types/credit';

export const getCreditQueue = async () => {
  try {
    const response = await api.get('/AdminCredit/queue');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const underReview = async ({ id, data }: CreditAPiType) => {
  try {
    const response = await api.patch(
      `/AdminCredit/applications/${id}/under-review`,
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
      `/AdminCredit/applications/${id}/extend-offer`,
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
      `/AdminCredit/applications/${id}/reject`,
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
