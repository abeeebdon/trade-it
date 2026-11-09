'use client';

import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatDateTime, formatUSD } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { useGetOrderById } from '../../hooks/useOrders';
import { LIFECYCLE } from '@/lib/constants';
import { SellerOrder } from '../types/exporterOrdersType';
import { Loading } from '@/components/loading';
import Link from 'next/link';

export default function OrderDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data, isLoading } = useGetOrderById(id ?? '');
  const orderDetails: SellerOrder = useMemo(() => {
    return data ? data : ({} as SellerOrder);
  }, [data]);

  const currentIdx = LIFECYCLE.findIndex(
    (item) => item.value === orderDetails.status,
  );
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [currentIdx]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="helix-card p-12 text-center text-[#9CA3AF]">
        Order details could not be found. Please check your tracking ID link.
      </div>
    );
  }

  return (
    <main className="w-full">
      <article className="p-6 space-y-6">
        <section className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={orderDetails.status} />
            <StatusPill status={orderDetails.paymentStatus} />
            {orderDetails.fulfillmentStatus && (
              <StatusPill status={orderDetails.fulfillmentStatus} />
            )}
          </div>
          <div>
            <Link
              href={{
                pathname: '/exporter/fulfillment/details',
                query: { id: `${orderDetails.id}` },
              }}
              className="text-[12px] text-primary hover:underline"
            >
              View Delivery Status
            </Link>
          </div>
        </section>

        <DetailSection title="Order">
          <DetailField
            label="Order number"
            value={orderDetails.orderNumber}
            mono
            accent
          />
          <DetailField label="Order type" value={orderDetails.orderType} />
          <DetailField label="Channel" value={orderDetails.role} />
          <DetailField
            label="Placed"
            value={
              orderDetails.paidAt ? formatDateTime(orderDetails.paidAt) : '—'
            }
          />
          <DetailField
            label="Quantity"
            value={String(orderDetails.quantity ?? '—')}
          />
          <DetailField
            label="Unit amount"
            value={formatUSD(orderDetails.amount)}
            mono
            accent
          />
        </DetailSection>

        <DetailSection title="Product">
          <DetailField label="Product name" value={orderDetails.productName} />
          <DetailField label="Category" value={orderDetails.category} />
          {orderDetails.variantTitle && (
            <DetailField label="Variant" value={orderDetails.variantTitle} />
          )}
          {orderDetails.sku && (
            <DetailField label="SKU" value={orderDetails.sku} mono />
          )}
          <div className="sm:col-span-2 lg:col-span-3">
            <DetailField label="Description" value={orderDetails.description} />
          </div>
        </DetailSection>

        <DetailSection title="Payment">
          <DetailField
            label="Payment status"
            value={humanize(orderDetails.paymentStatus)}
          />
          <DetailField label="Provider" value={orderDetails.paymentProvider} />
          <DetailField
            label="Stripe status"
            value={humanize(orderDetails.stripePaymentStatus)}
          />
          <DetailField
            label="Paid at"
            value={
              orderDetails.paidAt
                ? formatDateTime(orderDetails.paidAt)
                : 'Not paid yet'
            }
          />
          <DetailField
            label="Subtotal"
            value={formatUSD(
              orderDetails.subtotalAmount ?? orderDetails.amount,
            )}
            mono
          />
          <DetailField
            label="Shipping"
            value={formatUSD(orderDetails.shippingAmount ?? 0)}
            mono
          />
          <DetailField
            label="Total"
            value={`${formatUSD(
              orderDetails.totalAmount ?? orderDetails.amount,
            )} ${(orderDetails.currency ?? 'usd').toUpperCase()}`}
            mono
            accent
          />
        </DetailSection>

        <DetailSection title="Delivery">
          <DetailField label="Ship to" value={orderDetails.shipTo} />
          <DetailField label="Email" value={orderDetails.email} />
          <DetailField label="Phone" value={orderDetails.phone} />
          <div className="sm:col-span-2 lg:col-span-3">
            <DetailField
              label="Shipping address"
              value={orderDetails.shippingAddress}
            />
          </div>
          <DetailField
            label="Delivery date"
            value={
              orderDetails.deliveryDate
                ? formatDateTime(orderDetails.deliveryDate)
                : '—'
            }
          />
        </DetailSection>

        <DetailSection title="Fulfillment">
          <DetailField
            label="Fulfillment status"
            value={humanize(orderDetails.fulfillmentStatus)}
          />
          <DetailField label="Courier" value={orderDetails.courierName} />
          <DetailField
            label="Tracking number"
            value={orderDetails.trackingNumber}
            mono
          />
          {orderDetails.trackingUrl && (
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="text-[10px] uppercase tracking-widest text-muted">
                Tracking URL
              </p>
              <a
                href={orderDetails.trackingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm text-primary hover:underline wrap-break-word"
              >
                {orderDetails.trackingUrl}
              </a>
            </div>
          )}
          <DetailField
            label="Shipped at"
            value={
              orderDetails.shippedAt
                ? formatDateTime(orderDetails.shippedAt)
                : '—'
            }
          />
          <DetailField
            label="Delivered at"
            value={
              orderDetails.deliveredAt
                ? formatDateTime(orderDetails.deliveredAt)
                : '—'
            }
          />
        </DetailSection>

        {(orderDetails.shopifyOrderId ||
          orderDetails.shopifyFulfillmentId ||
          orderDetails.shopifyVariantId) && (
          <DetailSection title="Shopify">
            <DetailField
              label="Shopify order ID"
              value={orderDetails.shopifyOrderId}
              mono
            />
            <DetailField
              label="Fulfillment ID"
              value={orderDetails.shopifyFulfillmentId}
              mono
            />
            <DetailField
              label="Variant ID"
              value={orderDetails.shopifyVariantId}
              mono
            />
          </DetailSection>
        )}
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
