import api from '@/configs/api-config';
import { Order, OrderDetailData } from '../types/exporter';

export type SellerOrdersParams = {
  pageNumber: number;
  pageSize: number;
};

export type SellerOrdersResponse = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: Order[];
};

export const getSellerOrders = async ({
  pageNumber,
  pageSize,
}: SellerOrdersParams): Promise<SellerOrdersResponse> => {
  try {
    const response = await api.get(
      `/Orders/seller?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id: string): Promise<OrderDetailData> => {
  try {
    const response = await api.get(`/Orders/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
