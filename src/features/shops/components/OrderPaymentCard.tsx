import { ShieldCheck } from 'lucide-react';
import { formatDateTime } from '@/lib/func';
import { StatusPill } from './StatusPill';
import { ConsumerOrder } from '../types/shops';
import OrderCard from './OrderCard';

interface OrderPaymentCardProps {
  order: ConsumerOrder;
}

const OrderPaymentCard = ({ order }: OrderPaymentCardProps) => {
  return (
    <OrderCard
      icon={ShieldCheck}
      title="Payment"
      iconClassName="bg-[#1A7A6E]/10 text-[#1A7A6E] "
    >
      <div className="space-y-4 text-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-muted">Provider</span>
          <span className="text-text capitalize">
            {order.paymentProvider ?? '—'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Payment status</span>
          <StatusPill status={order.paymentStatus} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Stripe status</span>
          <span className="text-text capitalize">
            {order.stripePaymentStatus?.replace(/_/g, ' ') ?? '—'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Paid at</span>
          <span className="text-text">
            {order.paidAt ? formatDateTime(order.paidAt) : 'Not paid yet'}
          </span>
        </div>
      </div>
    </OrderCard>
  );
};

export default OrderPaymentCard;
