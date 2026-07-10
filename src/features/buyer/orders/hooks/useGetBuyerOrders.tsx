import { useQuery } from '@tanstack/react-query';
import { getBuyerOrderByID, getBuyerOrders } from '../api/buyerOrder';

export const useGetBuyerOrders = () => {
  return useQuery({
    queryKey: ['buyer-orders'],
    queryFn: getBuyerOrders,
  });
};

export const useGetBuyerOrderDetails = ({ orderId }: { orderId: string }) => {
  return useQuery({
    queryKey: ['buyer-order-details', orderId],
    queryFn: () => getBuyerOrderByID(orderId),
    enabled: !!orderId, // Only run the query if orderId is truthy
  });
};
