import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { CommandCenterData } from '../types/exporter';

export const getCommandCenter = async (): Promise<CommandCenterData> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.WALLET_COMMAND_CENTER);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
