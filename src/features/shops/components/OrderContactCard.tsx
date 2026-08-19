import { User } from 'lucide-react';
import DetailCard from '@/components/custom/DetailCard';
import { ConsumerOrder } from '../types/shops';
import OrderCard from './OrderCard';

interface OrderContactCardProps {
  order: ConsumerOrder;
}

const OrderContactCard = ({ order }: OrderContactCardProps) => {
  return (
    <OrderCard
      icon={User}
      title="Contact"
      iconClassName="bg-[#374151]/30 text-muted"
    >
      <div className="space-y-4">
        <DetailCard label="Email" value={order.email} />
        <DetailCard label="Phone" value={order.phone} />
      </div>
    </OrderCard>
  );
};

export default OrderContactCard;
