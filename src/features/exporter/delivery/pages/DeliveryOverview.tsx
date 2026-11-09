'use client';

import { Loading } from '@/components/loading';
import { useGetSellerOrders } from '../../hooks/useOrders';
import CustomSelect from '@/components/form/CustomSelect';
import { CustomSearchInput } from '@/components/form/CustomSearchInput';
import { ALL_FILTER, DELIVERY_FILTER_OPTIONS } from '@/lib/orderFilters';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  deliveryGroupOf,
  paymentGroupOf,
} from '@/features/orderManagement/components/CardMeta';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';

import { OrderCard } from '@/components/orders/OrderCard';

const PAYMENT_OPTIONS = [
  { label: 'Pending payment', value: 'Pending' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Failed', value: 'Failed' },
];

export default function ExporterDeliveryOverview() {
  const [search, setSearch] = useState('');
  const [delivery, setDelivery] = useState('');
  const [payment, setPayment] = useState('');

  const { data, isPending, isError } = useGetSellerOrders({
    pageNumber: 1,
    pageSize: 100,
  });

  const allOrders = useMemo(() => data ?? [], [data]);

  const visibleOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

    let list = allOrders;
    if (delivery) {
      list = list.filter((o) => deliveryGroupOf(o.status) === delivery);
    }
    if (payment) {
      list = list.filter(
        (o) => paymentGroupOf(o.paymentStatus, o.status) === payment,
      );
    }
    if (term) {
      list = list.filter((o) =>
        [o.orderNumber, o.productName, o.category, o.email, o.shipTo]
          .join(' ')
          .toLowerCase()
          .includes(term),
      );
    }

    return list;
  }, [allOrders, delivery, payment, search]);

  if (isPending) {
    return (
      <div className="h-[70vh] overflow-hidden justify-center flex items-center opacity-40">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="helix-card p-12 text-center text-muted text-sm">
        Failed to load orders. Please refresh.
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-5">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 justify-between sm:flex-row lg:items-center">
          <CustomSearchInput
            className="lg:flex-1"
            value={search}
            onChange={setSearch}
            placeholder="Search by order, product or customer..."
          />

          <div className="basis-2/3 flex justify-end gap-2">
            <CustomSelect
              className="w-full max-w-40"
              placeholder="All deliveries"
              value={delivery === '' ? ALL_FILTER : delivery}
              onValueChange={(value) =>
                setDelivery(value === ALL_FILTER ? '' : value)
              }
              options={[
                { label: 'Delivery', value: ALL_FILTER },
                ...DELIVERY_FILTER_OPTIONS,
              ]}
            />

            <CustomSelect
              className="w-full max-w-40"
              placeholder="All payments"
              value={payment === '' ? ALL_FILTER : payment}
              onValueChange={(value) =>
                setPayment(value === ALL_FILTER ? '' : value)
              }
              options={[
                { label: 'Payments', value: ALL_FILTER },
                ...PAYMENT_OPTIONS,
              ]}
            />
          </div>
        </div>

        <p className="text-[12px] text-muted text-right">
          Showing <strong className="text-text">{visibleOrders.length}</strong>{' '}
          of <strong className="text-text">{allOrders.length}</strong> orders
        </p>
      </section>

      {/* Payment + delivery filters */}

      {visibleOrders.length === 0 ? (
        <div className="helix-card rounded-xl p-12 text-center text-muted text-sm">
          No orders match your filters.
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block helix-card overflow-x-auto">
            <table className="helix-table min-w-200">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Fulfillment</th>
                  <th>Delivery date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-[13px] text-[#C9922A] whitespace-nowrap">
                      {order.orderNumber}
                    </td>
                    <td className="whitespace-nowrap">{order.shipTo}</td>
                    <td className="max-w-56 truncate">{order.productName}</td>
                    <td className="font-mono">{order.quantity}</td>
                    <td className="font-mono text-[#C9922A] whitespace-nowrap">
                      {formatUSD(order.totalAmount ?? order.amount)}
                    </td>
                    <td>{order.paymentStatus}</td>
                    <td>
                      {order.fulfillmentStatus && (
                        <StatusPill status={order.fulfillmentStatus} />
                      )}
                    </td>
                    <td className="text-[12px] text-muted whitespace-nowrap">
                      {formatDateTime(order.deliveryDate)}
                    </td>
                    <td>
                      <Link
                        href={{
                          pathname: '/exporter/fulfillment/details',
                          query: { id: `${order.id}` },
                        }}
                        className="text-[12px] text-primary hover:underline whitespace-nowrap"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-4">
            {visibleOrders.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                detailsHref={(id) => `/exporter/fulfillment/details?id=${id}`}
              />
            ))}
          </div>
        </>
      )}
    </article>
  );
}
