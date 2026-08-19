import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { HelpItem, CreateHelpPayload } from '../types/help';

export const getHelpItems = async () => {
  try {
    const response = await api.get(APIENDPOINTSTWO.HELP);
    return response.data.data ?? response.data;
  } catch (error) {
    throw error;
  }
};

export const getHelpItemById = async (id: number): Promise<HelpItem> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.HELP_BY_ID(id));
    return response.data.data ?? response.data;
  } catch (error) {
    throw error;
  }
};

export const createHelpItem = async (payload: CreateHelpPayload) => {
  try {
    await api.post(APIENDPOINTSTWO.HELP, payload);
  } catch (error) {
    throw error;
  }
};

export const updateHelpItem = async ({
  id,
  payload,
}: {
  id: number;
  payload: CreateHelpPayload;
}): Promise<void> => {
  try {
    await api.put(APIENDPOINTSTWO.HELP_BY_ID(id), payload);
  } catch (error) {
    throw error;
  }
};

export const deleteHelpItem = async (id: number): Promise<void> => {
  try {
    await api.delete(APIENDPOINTSTWO.HELP_BY_ID(id));
  } catch (error) {
    throw error;
  }
};
