import api from '@/configs/api-config';

export const getCommandCenter = async () => {
  try {
    const response = await api.get('/Wallet/command-center');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
