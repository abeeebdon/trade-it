'use client';

import { useMemo, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatDateTime, formatUSD } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import BackButton from '@/components/buttons/BackButton';
import { ORDER_D_ROWS } from '../data/orderDData';
import { formatItems } from '../utils';

export default function OrderDDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const order = useMemo(
    () => ORDER_D_ROWS.find((row) => row.id === id || row.orderNumber === id),
    [id],
  );

  if (!order) {
    return (
      <div className="helix-card p-12 text-center text-muted">
        Order details could not be found. Please check the order ID.
        <div className="mt-4 flex justify-center">
          <BackButton title="Back to orders" path="/admin/order-d" />
        </div>
      </div>
    );
  }

  return (
    <main className="w-full">
      <article className="p-6 space-y-6">
        <BackButton title="Back" path="/admin/order-d" />

        <section className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={order.paymentStatus} />
            <StatusPill status={order.fulfillmentStatus} />
            {order.deliveryStatus && (
              <StatusPill status={order.deliveryStatus} />
            )}
          </div>
          <p className="text-[12px] text-muted">
            Order{' '}
            <span className="font-mono text-primary">#{order.orderNumber}</span>
          </p>
        </section>

        <DetailSection title="Order">
          <DetailField
            label="Order number"
            value={`#${order.orderNumber}`}
            mono
            accent
          />
          <DetailField label="Channel" value={order.channel} />
          <DetailField label="Placed" value={formatDateTime(order.placedAt)} />
          <DetailField
            label="Fulfill by"
            value={order.fulfillBy ? formatDateTime(order.fulfillBy) : '—'}
          />
          <DetailField label="Items" value={formatItems(order.items)} />
          <DetailField
            label="Total"
            value={formatUSD(order.total)}
            mono
            accent
          />
        </DetailSection>

        <DetailSection title="Customer">
          <DetailField label="Customer" value={order.customer} />
          <div className="sm:col-span-2 lg:col-span-3">
            <DetailField
              label="Tags"
              value={order.tags.length > 0 ? order.tags.join(', ') : '—'}
            />
          </div>
        </DetailSection>

        <DetailSection title="Payment">
          <DetailField
            label="Payment status"
            value={humanize(order.paymentStatus)}
          />
          <DetailField label="Amount" value={formatUSD(order.total)} mono />
        </DetailSection>

        <DetailSection title="Delivery">
          <DetailField label="Delivery method" value={order.deliveryMethod} />
          <DetailField
            label="Delivery status"
            value={order.deliveryStatus || '—'}
          />
        </DetailSection>

        <DetailSection title="Fulfillment">
          <DetailField
            label="Fulfillment status"
            value={order.fulfillmentStatus}
          />
          <DetailField label="Courier" value={order.courierName} />
          <DetailField
            label="Tracking number"
            value={order.trackingNumber}
            mono
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
