'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag, Truck } from 'lucide-react';
import BackButton from '@/components/buttons/BackButton';
import { PageLoading } from '@/components/loading';
import { formatDateTime, formatUSD } from '@/lib/func';
import {
  useGetOrderById,
  useUpdateOrderFulfillment,
} from '@/features/exporter/hooks/useOrders';
import type { SellerOrder } from '@/features/exporter/orders/types/exporterOrdersType';
import { OrderSummaryCard } from '@/features/orderManagement/components/OrderSummaryCard';
import { OrderStatusTracker } from '@/features/orderManagement/components/OrderStatusTracker';
import {
  ORDER_STATUS_LABELS,
  OrderStatus,
} from '@/features/orderManagement/lib/orderStatus';
import DeclineModal from '@/features/exporter/delivery/components/DeclineModal';
import TrackingModal from '@/features/exporter/delivery/components/TrackingModal';
import SuccessModal from '@/components/modals/SuccessModal';
import Modal from '@/components/ui/Modal';
import FulfillmentForm, {
  type FulfillmentPayload,
  type FulfillmentStatus,
} from '@/components/form/FulfillmentForm';
import OrderTimeline, {
  type OrderTimelineEvent,
} from '@/features/exporter/delivery/components/OrderTimeline';

const statusText = (status: string) =>
  ORDER_STATUS_LABELS[status as OrderStatus] ??
  status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

/** Seeds the fulfillment form from the order's current status. */
const fulfillmentStatusFromOrder = (order: SellerOrder): FulfillmentStatus => {
  const current = order.status.toLowerCase();

  if (current === 'delivered' || current === 'received') return 'delivered';
  if (current === 'shipped' || current === 'out_for_delivery') return 'shipped';

  return 'unfulfilled';
};

const orderStatusFromFulfillment = (
  fulfillmentStatus: FulfillmentStatus,
): OrderStatus => {
  switch (fulfillmentStatus) {
    case 'shipped':
      return OrderStatus.SHIPPED;
    case 'delivered':
      return OrderStatus.DELIVERED;
    default:
      return OrderStatus.PAID;
  }
};

export default function DeliveryOrderDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const { data: order, isLoading, isError } = useGetOrderById(id);

  if (!id) {
    return <p className="text-sm text-danger px-4 py-6">Order not found.</p>;
  }

  if (isLoading) {
    return <PageLoading message="Loading order..." />;
  }

  if (isError || !order) {
    return (
      <p className="text-sm text-danger px-4 py-6">
        Failed to load this order. Please refresh and try again.
      </p>
    );
  }

  return <DeliveryOrderContent key={order.id} order={order} />;
}

function DeliveryOrderContent({ order }: { order: SellerOrder }) {
  const [status, setStatus] = useState(order.status);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showFulfillmentModal, setShowFulfillmentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState({
    courierName: order.courierName ?? '',
    trackingNumber: order.trackingNumber ?? '',
    trackingUrl: order.trackingUrl ?? '',
  });
  const [activity, setActivity] = useState<OrderTimelineEvent[]>([]);

  const fulfillmentMutation = useUpdateOrderFulfillment(order.id);

  const currentStatus = status as OrderStatus;
  const quantity = order.quantity || 1;
  const lineItems = [
    {
      id: String(order.productId),
      name: order.productName,
      quantity: order.quantity,
      price: order.amount / quantity,
    },
  ];
  const total = order.totalAmount ?? order.amount;

  const addActivity = (title: string) =>
    setActivity((prev) => [
      {
        id: `${Date.now()}-${prev.length}`,
        title,
        timestamp: new Date(),
      },
      ...prev,
    ]);

  const timelineEvents = useMemo<OrderTimelineEvent[]>(() => {
    const events: OrderTimelineEvent[] = [];
    const currency = (order.currency ?? 'usd').toUpperCase();
    const amount = formatUSD(order.totalAmount ?? order.amount);

    if (order.paidAt) {
      events.push({
        id: 'payment-captured',
        title: `${amount} ${currency} was captured.`,
        meta: order.stripePaymentStatus
          ? `Payment status: ${order.stripePaymentStatus.replace(/_/g, ' ')}`
          : undefined,
        timestamp: order.paidAt,
      });
    } else {
      events.push({
        id: 'payment-pending',
        title: `Payment is pending (${statusText(order.paymentStatus)}).`,
      });
    }

    if (order.shippedAt || order.trackingNumber) {
      events.push({
        id: 'shipped',
        title: `Order was shipped${
          order.courierName ? ` via ${order.courierName}` : ''
        }.`,
        meta: order.trackingNumber
          ? `Tracking number: ${order.trackingNumber}`
          : undefined,
        timestamp: order.shippedAt,
        action: order.trackingUrl ? (
          <a
            href={order.trackingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center rounded border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-primary hover:text-text"
          >
            Track shipment
          </a>
        ) : undefined,
      });
    }

    if (order.deliveredAt) {
      events.push({
        id: 'delivered',
        title: 'Order was delivered.',
        timestamp: order.deliveredAt,
      });
    }

    if (!order.shippedAt && !order.deliveredAt) {
      events.push({
        id: 'scheduled-delivery',
        title: 'Delivery scheduled.',
        meta: formatDateTime(order.deliveryDate),
      });
    }

    return [...activity, ...events];
  }, [order, activity]);

  const handleAccept = () => {
    setStatus(OrderStatus.ACCEPTED);
    addActivity('Order was accepted by the exporter.');
    setSuccessMessage('Order accepted successfully.');
    setShowSuccessModal(true);
  };

  const handlePacked = () => {
    setStatus(OrderStatus.PACKED);
    addActivity('Order was marked as packed.');
    setSuccessMessage('Order packed successfully.');
    setShowSuccessModal(true);
  };

  const handleDecline = () => {
    const reason = declineReason.trim();
    if (!reason) return;

    setStatus(OrderStatus.DECLINED);
    addActivity(`Order was declined. Reason: ${reason}`);
    setShowDeclineModal(false);
    setDeclineReason('');
    setSuccessMessage('Order status updated successfully.');
    setShowSuccessModal(true);
  };

  const handleReadyForShipping = () => {
    const value = trackingCode.trim();
    if (!value) return;

    setStatus(OrderStatus.READY_FOR_SHIPPING);
    addActivity(`Order is ready for shipping. Tracking code: ${value}`);
    setShowTrackingModal(false);
    setTrackingCode('');
    setSuccessMessage('Order is ready for shipping.');
    setShowSuccessModal(true);
  };

  const handleFulfillmentSubmit = (values: FulfillmentPayload) => {
    fulfillmentMutation.mutate(values, {
      onSuccess: () => {
        setShipment({
          courierName: values.courierName,
          trackingNumber: values.trackingNumber,
          trackingUrl: values.trackingUrl,
        });
        setStatus(orderStatusFromFulfillment(values.fulfillmentStatus));
        addActivity(`Fulfillment updated to ${values.fulfillmentStatus}.`);
        setShowFulfillmentModal(false);
        setSuccessMessage('Fulfillment details saved.');
        setShowSuccessModal(true);
      },
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-4 p-4 max-w-3xl">
        <BackButton title="Go Back" path="/exporter/fulfillment" />

        <div className="flex items-center mt-4 gap-2">
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

        {/* <div className="helix-card rounded-xl p-4">
          <OrderStatusTracker currentStatus={currentStatus} />
        </div> */}

        <OrderSummaryCard items={lineItems} total={total} />

        <div className="helix-card rounded-xl p-4 flex flex-col gap-4">
          <p className="text-sm font-medium text-text">Activity</p>
          <OrderTimeline events={timelineEvents} />
        </div>

        {(order.courierName || order.trackingNumber || order.trackingUrl) && (
          <div className="helix-card rounded-xl p-4 flex flex-col gap-2">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-text">
              <Truck size={16} className="text-primary" />
              Shipment
            </p>
            <div className="flex flex-col gap-1 text-xs text-muted">
              <p>
                Courier:{' '}
                <span className="text-text">{order.courierName || '—'}</span>
              </p>
              <p>
                Tracking number:{' '}
                <span className="text-text">{order.trackingNumber || '—'}</span>
              </p>
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {order.trackingUrl}
                </a>
              )}
            </div>
          </div>
        )}

        <div className="helix-card rounded-xl p-4 flex flex-col gap-3">
          <p className="text-sm font-medium text-text">Manage order</p>
          <p className="text-xs text-muted">
            Current status:{' '}
            <span className="text-primary">{statusText(status)}</span>
          </p>

          <button
            type="button"
            onClick={() => setShowFulfillmentModal(true)}
            className="helix-btn-secondary inline-flex items-center gap-2 self-start"
          >
            <Truck size={14} />
            Update fulfillment
          </button>

          <article className="mt-4">
            {status === 'paid' && (
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
            {status === 'accepted' && (
              <div className="flex items-center gap-5">
                <button className="helix-btn-primary" onClick={handlePacked}>
                  Order Packed
                </button>
              </div>
            )}

            {status === 'packed' && (
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

      {showFulfillmentModal && (
        <Modal
          onClose={() => setShowFulfillmentModal(false)}
          title="Update fulfillment"
          maxWidth="max-w-lg"
        >
          <FulfillmentForm
            isSubmitting={fulfillmentMutation.isPending}
            onCancel={() => setShowFulfillmentModal(false)}
            onSubmit={handleFulfillmentSubmit}
            defaultValues={{
              fulfillmentStatus: fulfillmentStatusFromOrder(order),
              courierName: shipment.courierName,
              trackingNumber: shipment.trackingNumber,
              trackingUrl: shipment.trackingUrl,
            }}
          />
        </Modal>
      )}

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
