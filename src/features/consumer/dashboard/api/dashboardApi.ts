import { APIENDPOINTSTWO } from '@/configs/api-urls';
import api from '@/configs/api-config';
import type { ConsumerDashboardResponse, DashboardData } from '../types';

/**
 * .NET returns "0001-01-01T00:00:00" for unset DateTimes.
 * Picks the first valid date (year > 2000) from the candidates.
 */
const pickValidDate = (...dates: (string | undefined)[]) => {
  for (const date of dates) {
    if (!date) continue;
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.getTime()) && parsed.getFullYear() > 2000) {
      return date;
    }
  }
  return new Date().toISOString();
};

/** GET /api/ConsumerDashboard — fetch the consumer dashboard */
export const getConsumerDashboard = async (): Promise<DashboardData> => {
  const response = await api.get(APIENDPOINTSTWO.CONSUMER_DASHBOARD);
  return response.data?.data;

  //   return {
  //     greeting_name: '',
  //     stats: {
  //       total_orders: stats?.totalOrders ?? 0,
  //       in_transit: stats?.inTransit ?? 0,
  //       favourites: stats?.favourites ?? 0,
  //       total_spent_usd: stats?.totalSpent ?? 0,
  //     },
  //     active_orders: activeOrders.map((order) => ({
  //       id: String(order.orderId),
  //       order_number: order.orderNumber,
  //       product_name: order.productName,
  //       status: order.status,
  //       total_usd: order.totalAmount,
  //       // orderDate is often the .NET default; prefer deliveryDate when valid
  //       created_at: pickValidDate(order.orderDate, order.deliveryDate),
  //       listing_photos: order.thumbnailImage ? [order.thumbnailImage] : [],
  //       journey: [],
  //     })),
  //     buy_again: buyAgain.map((item) => ({
  //       id: String(item.id ?? item.listingId ?? item.productId ?? ''),
  //       title: item.title ?? item.productName ?? 'Item',
  //       retail_price_usd: item.retail_price_usd ?? item.price ?? 0,
  //       photos: item.photos ?? (item.thumbnailImage ? [item.thumbnailImage] : []),
  //     })),
  //   };
};
