'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BackButton from '@/components/buttons/BackButton';
import { ShoppingBag } from 'lucide-react';
import { selectOrderById, setOrderStatus } from '@/store/orders/orders.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { DUMMY_ORDERS } from '@/features/orderManagement/data/dummyOrders';
import { formatDateTime } from '@/lib/func';
import { OrderSummaryCard } from '@/features/orderManagement/components/OrderSummaryCard';
import { OrderStatusTracker } from '@/features/orderManagement/components/OrderStatusTracker';
import {
  ORDER_STATUS_LABELS,
  OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';
import DeclineModal from '@/features/exporter/delivery/components/DeclineModal';
import TrackingModal from '@/features/exporter/delivery/components/TrackingModal';
import SuccessModal from '@/components/modals/SuccessModal';

export default function DeliveryOrderDetail() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [trackingCode, setTrackingCode] = useState('');

  const id = searchParams.get('id') ?? '';
  const order =
    useAppSelector((state) => selectOrderById(state, id)) ?? DUMMY_ORDERS[0];

  if (!order) {
    return <p className="text-sm text-danger px-4 py-6">Order not found.</p>;
  }

  const currentStatus = order.status as OrderStatus;
  const lineItems = [
    {
      id: String(order.productId),
      name: order.productName,
      quantity: order.quantity,
      price: order.amount / order.quantity,
    },
  ];
  const total = order.totalAmount ?? order.amount;

  const handleAccept = () => {
    dispatch(
      setOrderStatus({
        id: order.id,
        status: OrderStatus.ACCEPTED,
      }),
    );
    setSuccessMessage('Order accepted successfully.');
    setShowSuccessModal(true);
  };
  const handlePacked = () => {
    dispatch(
      setOrderStatus({
        id: order.id,
        status: OrderStatus.PACKED,
      }),
    );
    setSuccessMessage('Order packed successfully.');
    setShowSuccessModal(true);
  };

  const handleDecline = () => {
    const reason = declineReason.trim();
    if (!reason) return;

    dispatch(
      setOrderStatus({
        id: order.id,
        status: OrderStatus.DECLINED,
        declineReason: reason,
      }),
    );

    setShowDeclineModal(false);
    setDeclineReason('');
    setSuccessMessage('Order status updated successfully.');
    setShowSuccessModal(true);
  };

  const handleReadyForShipping = () => {
    const value = trackingCode.trim();
    if (!value) return;

    dispatch(
      setOrderStatus({
        id: order.id,
        status: OrderStatus.READY_FOR_SHIPPING,
        trackingCode: value,
      }),
    );

    setShowTrackingModal(false);
    setTrackingCode('');
    setSuccessMessage('Order is ready for shipping.');
    setShowSuccessModal(true);
  };

  return (
    <section>
      <div className="flex flex-col gap-4 p-4 max-w-3xl">
        <BackButton title="Back to orders" path="/exporter/fulfillment" />

        <div className="flex items-center ,t-4 gap-2">
          <ShoppingBag size={18} className="text-primary" />
          <h1 className="text-lg font-semibold text-text">
            Order #{order.orderNumber}
          </h1>
          <span className="text-xs text-muted ml-auto">
            Placed {formatDateTime(order.paidAt ?? order.deliveryDate)}
          </span>
        </div>
        <p className="text-sm text-muted">
          Deliver to {order.shipTo} · {order.shippingAddress}
        </p>

        <div className="helix-card rounded-xl p-4">
          <OrderStatusTracker currentStatus={currentStatus} />
        </div>

        <OrderSummaryCard items={lineItems} total={total} />

        <div className="helix-card rounded-xl p-4 flex flex-col gap-3">
          <p className="text-sm font-medium text-text">Manage order</p>
          <p className="text-xs text-muted">
            Current status:{' '}
            <span className="text-primary">
              {ORDER_STATUS_LABELS[currentStatus]}
            </span>
          </p>

          <article className="mt-4">
            {order.status === 'paid' && (
              <div className="flex items-center gap-5">
                <button className="helix-btn-primary" onClick={handleAccept}>
                  Accept
                </button>
                <button
                  className="helix-btn-secondary"
                  onClick={() => setShowDeclineModal(true)}
                >
                  Decline
                </button>
              </div>
            )}
            {order.status === 'accepted' && (
              <div className="flex items-center gap-5">
                <button className="helix-btn-primary" onClick={handlePacked}>
                  Order Packed
                </button>
              </div>
            )}

            {order.status === 'packed' && (
              <div className="flex items-center gap-5">
                <button
                  className="helix-btn-primary"
                  onClick={() => setShowTrackingModal(true)}
                >
                  Ready for shipping
                </button>
              </div>
            )}
          </article>
        </div>
      </div>

      <DeclineModal
        open={showDeclineModal}
        value={declineReason}
        onClose={() => setShowDeclineModal(false)}
        onChange={setDeclineReason}
        onConfirm={handleDecline}
      />

      <TrackingModal
        open={showTrackingModal}
        value={trackingCode}
        onClose={() => setShowTrackingModal(false)}
        onChange={setTrackingCode}
        onConfirm={handleReadyForShipping}
      />

      <SuccessModal
        open={showSuccessModal}
        message={successMessage}
        onContinue={() => setShowSuccessModal(false)}
        onCancel={() => setShowSuccessModal(false)}
        continueText="Done"
        cancelText="Close"
      />
    </section>
  );
}
