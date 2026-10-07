'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatUSD } from '@/lib/func';
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
      <article className=" p-6 space-y-4">
        <section className="flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={orderDetails.status} />
            <StatusPill status={orderDetails.paymentStatus} />
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

        <div className="grid gap-6 mt-5 md:pt-10 md:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Order Number
            </p>
            <p className="mt-1 font-mono text-primary">
              {orderDetails.orderNumber}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Product Name
            </p>
            <p className="mt-1 text-text">{orderDetails.productName}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Category
            </p>
            <p className="mt-1 text-text">{orderDetails.category}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Order Type
            </p>
            <p className="mt-1 text-text">{orderDetails.orderType}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Quantity
            </p>
            <p className="mt-1 text-text">{orderDetails.quantity}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Amount
            </p>
            <p className="mt-1 font-mono text-primary">
              {formatUSD(orderDetails.amount)}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Description
            </p>
            <p className="mt-1 text-text">{orderDetails.description}</p>
          </div>
        </div>
      </article>
    </main>
  );
}
