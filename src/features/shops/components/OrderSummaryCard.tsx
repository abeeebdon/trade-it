'use client';

import { CreditCard } from 'lucide-react';
import { formatUSD } from '@/lib/func';
import { ConsumerOrder } from '../types/shops';
import OrderCard from './OrderCard';
import { useState } from 'react';
import { PaymentIntentDetails } from '@/features/payment/api/paymentApi';

interface OrderSummaryCardProps {
  order: ConsumerOrder;
  hidePayButton?: boolean;
}

const OrderSummaryCard = ({
  order,
  hidePayButton = false,
}: OrderSummaryCardProps) => {
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntentDetails>();
  const total = order.totalAmount ?? order.amount;
  const handlePay = () => {
    setShowPayModal(true);
  };

  return (
    <OrderCard
      icon={CreditCard}
      title="Order Summary"
      iconClassName="bg-[#C9922A]/10 text-primary"
    >
      <section className="space-y-4">
        <h3 className="helix-label">Total Amount</h3>
        <p className="font-mono text-3xl text-primary-dim font-bold">
          {formatUSD(total)}
        </p>

        {!hidePayButton && order.status === 'pending_payment' && (
          <button
            onClick={handlePay}
            className="helix-btn-primary w-full inline-flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            Pay
          </button>
        )}

        <div className="space-y-3 pt-3 border-t border-[#1A7A6E]/15 text-[14px]">
          <div className="flex items-center justify-between">
            <span className="text-muted">Subtotal</span>
            <span className="text-text">
              {formatUSD(order.subtotalAmount ?? order.amount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">Shipping</span>
            <span className="text-text">
              {formatUSD(order.shippingAmount ?? 0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">Quantity</span>
            <span className="text-text">{order.quantity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">Currency</span>
            <span className="text-text uppercase">
              {order.currency ?? 'usd'}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[#1A7A6E]/15">
            <span className="text-muted">Role</span>
            <span className="text-text">{order.role}</span>
          </div>
        </div>
      </section>
    </OrderCard>
  );
};

export default OrderSummaryCard;
