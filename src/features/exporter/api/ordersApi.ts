import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import {
  SellerOrder,
  SellerOrdersParams,
} from '../orders/types/exporterOrdersType';
import { CreateOrderPayload } from '@/features/shops/types/shops';
import { toast } from 'sonner';

export const getSellerOrders = async ({
  pageNumber,
  pageSize,
}: SellerOrdersParams): Promise<SellerOrder[]> => {
  try {
    const response = await api.get(
      `${APIENDPOINTSTWO.ORDERS_SELLER}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id: string): Promise<SellerOrder> => {
  try {
    const response = await api.get(APIENDPOINTSTWO.ORDERS_BY_ID(id));
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const createOrder = async (data: CreateOrderPayload) => {
  try {
    const response = await api.post(APIENDPOINTSTWO.ORDERS, data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.response.data.message);
    throw error;
  }
};
