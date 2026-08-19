import { Package } from 'lucide-react';
import DetailCard from '@/components/custom/DetailCard';
import { ConsumerOrder } from '../types/shops';
import OrderCard from './OrderCard';

interface OrderProductCardProps {
  order: ConsumerOrder;
}

const OrderProductCard = ({ order }: OrderProductCardProps) => {
  return (
    <OrderCard
      icon={Package}
      title={order.productName}
      subtitle={`Product ID: #${order.productId}`}
      iconClassName="bg-[#C9922A]/10 text-primary"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <DetailCard
          label="Category"
          value={order.category?.replace(/-/g, ' ') ?? '—'}
        />
        <DetailCard label="Quantity" value={`${order.quantity} unit(s)`} />
        <DetailCard label="Order Type" value={order.orderType} />
      </div>

      {order.description && (
        <div className="mt-6 pt-6 border-t border-[#1A7A6E]/15">
          <div className="helix-label mb-1">Description</div>
          <p className="text-[14px] text-text leading-relaxed">
            {order.description}
          </p>
        </div>
      )}
    </OrderCard>
  );
};

export default OrderProductCard;
