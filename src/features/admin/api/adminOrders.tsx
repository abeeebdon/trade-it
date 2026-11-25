import api from '@/configs/api-config';
import { APIENDPOINTSTWO } from '@/configs/api-urls';
import { AdminOrder } from '../types/orders';

export interface GetAdminOrdersParams {
  status?: string;
}

export interface AdminOrdersResponse {
  data: AdminOrder[];
}

export const getAdminOrders = async ({
  status,
}: GetAdminOrdersParams = {}): Promise<AdminOrdersResponse> => {
  const response = await api.get(APIENDPOINTSTWO.ADMIN_ORDERS, {
    params: { status },
  });

  return response.data;
};

export interface AdminOrderResponse {
  data: AdminOrder;
}

export const getAdminOrderById = async (
  id: string | number,
): Promise<AdminOrder> => {
  const response = await api.get<AdminOrderResponse>(
    APIENDPOINTSTWO.ADMIN_ORDERS_ID(id),
  );

  return response.data.data;
};

export interface UpdateAdminOrderFulfillmentPayload {
  fulfillmentStatus: string;
  courierName: string;
  trackingNumber: string;
  trackingUrl: string;
}

export const updateAdminOrderFulfillment = async (
  id: string | number,
  payload: UpdateAdminOrderFulfillmentPayload,
): Promise<{ message?: string }> => {
  const response = await api.put(
    APIENDPOINTSTWO.ADMIN_ORDERS_FULFILLMENT(id),
    payload,
  );

  return response.data;
};
