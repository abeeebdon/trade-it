import { Truck } from 'lucide-react';
import DetailCard from '@/components/custom/DetailCard';
import { formatDateTime } from '@/lib/func';
import { ConsumerOrder } from '../types/shops';
import OrderCard from './OrderCard';

interface OrderShippingCardProps {
  order: ConsumerOrder;
}

const OrderShippingCard = ({ order }: OrderShippingCardProps) => {
  return (
    <OrderCard
      icon={Truck}
      title="Shipping Information"
      iconClassName="bg-[#1A7A6E]/10 text-[#1A7A6E]"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <DetailCard label="Ship To" value={order.shipTo} />
        <DetailCard label="Shipping Address" value={order.shippingAddress} />
        <DetailCard
          label="Delivery Date"
          value={formatDateTime(order.deliveryDate)}
        />
      </div>
    </OrderCard>
  );
};

export default OrderShippingCard;
