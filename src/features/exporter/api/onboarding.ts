import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { BusinessFormValues } from '../onboarding/types/validation';

export const getExporterOnboardingStatus = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.EXPORTER_ONBOARDING);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const onbaording = async ({ data }: { data: BusinessFormValues }) => {
  try {
    const response = await api.post(
      APIENDPOINTSTWO.EXPORTER_ONBOARDING_BUSINESS_PROFILE,
      data,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
