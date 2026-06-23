import api from '@/configs/api-config';
import { CommandCenterData } from '../types/exporter';

export const getCommandCenter = async (): Promise<CommandCenterData> => {
  try {
    const response = await api.get('/Wallet/command-center');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
