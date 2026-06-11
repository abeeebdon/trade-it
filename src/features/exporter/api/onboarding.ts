import api from '@/configs/api-config';
import { BusinessFormValues } from '../onboarding/types/validation';

export const getExporterOnboardingStatus = async () => {
  try {
    const response = await api.get('/ExporterOnboarding');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const onbaording = async ({ data }: { data: BusinessFormValues }) => {
  try {
    const response = await api.post(
      '/ExporterOnboarding/business-profile',
      data,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
