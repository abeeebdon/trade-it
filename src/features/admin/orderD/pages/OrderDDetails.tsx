'use client';

import { useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { Truck } from 'lucide-react';
import { formatDateTime, formatUSD } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import BackButton from '@/components/buttons/BackButton';
import { Loading } from '@/components/loading';
import { useGetAdminOrderById } from '@/features/admin/hooks/useGetAdminOrders';
import UpdateOrderStatusModal from '../components/UpdateOrderStatusModal';

export default function OrderDDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: order, isPending, isError, refetch } = useGetAdminOrderById(id);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  if (!id) {
    return (
      <div className="helix-card p-12 text-center text-muted">
        Order details could not be found. Please check the order ID.
        <div className="mt-4 flex justify-center">
          <BackButton title="Back to orders" path="/admin/orders" />
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="helix-card p-12 text-center text-muted">
        <p className="text-lg font-medium text-text">
          {isError ? 'Failed to load order details' : 'Order not found'}
        </p>
        <p className="mt-1 text-sm">
          {isError
            ? 'Something went wrong. Please try again.'
            : 'Please check the order ID and try again.'}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {isError && (
            <button
              type="button"
              onClick={() => refetch()}
              className="helix-btn-primary"
            >
              Retry
            </button>
          )}
          <BackButton title="Back to orders" path="/admin/orders" />
        </div>
      </div>
    );
  }

  return (
    <main className="w-full">
      <article className="p-6 space-y-6">
        <BackButton title="Back" path="/admin/orders" />

        <section className="">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12px] text-muted">
              Order{' '}
              <span className="font-mono text-primary">
                #{order.orderNumber}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setStatusModalOpen(true)}
              className="helix-btn-secondary text-sm inline-flex items-center gap-2"
            >
              <Truck size={14} />
              Update status
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={order.paymentStatus} />
            <StatusPill status={order.status} />
            {order.fulfillmentStatus && (
              <StatusPill status={order.fulfillmentStatus} />
            )}
          </div>
        </section>

        <DetailSection title="Order">
          <DetailField
            label="Order number"
            value={`#${order.orderNumber}`}
            mono
            accent
          />
          <DetailField label="Order type" value={order.orderType} />
          <DetailField label="Role" value={order.role} />
          <DetailField
            label="Delivery date"
            value={
              order.deliveryDate ? formatDateTime(order.deliveryDate) : '—'
            }
          />
          <DetailField label="Quantity" value={order.quantity} />
          <DetailField label="Status" value={humanize(order.status)} />
        </DetailSection>

        <DetailSection title="Product">
          <DetailField label="Product" value={order.productName} />
          <DetailField label="Category" value={order.category} />
          {order.variantTitle && (
            <DetailField label="Variant" value={order.variantTitle} />
          )}
          {order.sku && <DetailField label="SKU" value={order.sku} mono />}
          <div className="sm:col-span-2 lg:col-span-3">
            <DetailField label="Description" value={order.description} />
          </div>
        </DetailSection>

        <DetailSection title="Customer">
          <DetailField label="Ship to" value={order.shipTo} />
          <DetailField label="Email" value={order.email} />
          <DetailField label="Phone" value={order.phone} />
          <div className="sm:col-span-2 lg:col-span-3">
            <DetailField
              label="Shipping address"
              value={order.shippingAddress}
            />
          </div>
        </DetailSection>

        <DetailSection title="Payment">
          <DetailField
            label="Payment status"
            value={humanize(order.paymentStatus)}
          />
          <DetailField label="Provider" value={order.paymentProvider} />
          <DetailField
            label="Paid at"
            value={order.paidAt ? formatDateTime(order.paidAt) : '—'}
          />
          <DetailField
            label="Subtotal"
            value={formatUSD(order.subtotalAmount ?? order.amount)}
            mono
          />
          <DetailField
            label="Shipping"
            value={formatUSD(order.shippingAmount ?? 0)}
            mono
          />
          <DetailField
            label="Total"
            value={formatUSD(order.totalAmount ?? order.amount)}
            mono
            accent
          />
        </DetailSection>

        <DetailSection title="Delivery & fulfillment">
          <DetailField
            label="Fulfillment status"
            value={humanize(order.fulfillmentStatus)}
          />
          <DetailField label="Courier" value={order.courierName} />
          <DetailField
            label="Tracking number"
            value={order.trackingNumber}
            mono
          />
          <DetailField
            label="Shipped at"
            value={order.shippedAt ? formatDateTime(order.shippedAt) : '—'}
          />
          <DetailField
            label="Delivered at"
            value={order.deliveredAt ? formatDateTime(order.deliveredAt) : '—'}
          />
          {order.trackingUrl && (
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="text-[10px] uppercase tracking-widest text-muted">
                Tracking URL
              </p>
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm text-primary hover:underline wrap-break-word"
              >
                {order.trackingUrl}
              </a>
            </div>
          )}
        </DetailSection>
      </article>

      {statusModalOpen && (
        <UpdateOrderStatusModal
          order={order}
          onClose={() => setStatusModalOpen(false)}
        />
      )}
    </main>
  );
}

const humanize = (value?: string | null) =>
  value
    ? value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    : undefined;

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="helix-card p-5">
      <h2 className="text-sm font-medium text-text mb-4">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

function DetailField({
  label,
  value,
  mono = false,
  accent = false,
}: {
  label: string;
  value?: ReactNode;
  mono?: boolean;
  accent?: boolean;
}) {
  const isEmpty = value === null || value === undefined || value === '';

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted">
        {label}
      </p>
      <p
        className={`mt-1 text-sm wrap-break-word ${
          mono ? 'font-mono' : ''
        } ${accent ? 'text-primary' : 'text-text'}`}
      >
        {isEmpty ? '—' : value}
      </p>
    </div>
  );
}
