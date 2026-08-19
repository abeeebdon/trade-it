import { FileText } from 'lucide-react';
import { StatusPill } from './StatusPill';
import { ConsumerOrder } from '../types/shops';
import OrderCard from './OrderCard';

interface OrderMetaCardProps {
  order: ConsumerOrder;
}

const OrderMetaCard = ({ order }: OrderMetaCardProps) => {
  return (
    <OrderCard
      icon={FileText}
      title="Details"
      iconClassName="bg-[#374151]/30 text-muted"
    >
      <div className="space-y-4 text-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-muted">Order ID</span>
          <span className="text-text font-mono text-[13px]">#{order.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Order Number</span>
          <span className="text-text font-mono text-[12px]">
            {order.orderNumber}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Order Type</span>
          <span className="text-text capitalize">{order.orderType}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Status</span>
          <StatusPill status={order.status} />
        </div>
      </div>
    </OrderCard>
  );
};

export default OrderMetaCard;
