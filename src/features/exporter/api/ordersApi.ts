import api from '@/configs/api-config';
import { OrderDetailData } from '../types/exporter';
import {
  SellerOrder,
  SellerOrdersParams,
} from '../orders/types/exporterOrdersType';
import { CreateOrderPayload } from '@/features/shops/types/shops';

export const getSellerOrders = async ({
  pageNumber,
  pageSize,
}: SellerOrdersParams): Promise<SellerOrder[]> => {
  try {
    const response = await api.get(
      `/Orders/seller?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id: string): Promise<SellerOrder> => {
  try {
    const response = await api.get(`/Orders/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const createOrder = async (data: CreateOrderPayload) => {
  try {
    const response = await api.post('/Orders', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
