'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetSellerOrders } from '../../hooks/useOrders';
import { Loading } from '@/components/loading';
import Pagination from '../../components/pagination';
import SelectDropDown from '@/components/SelectDropDown';
import ExporterOrderCard from '../../orders/components/ExporterOrderCard';
import CustomSelect from '@/components/form/CustomSelect';
import { CustomSearchInput } from '@/components/form/CustomSearchInput';
import { deliveryGroupOf } from '@/features/orderManagement/components/CardMeta';
import {
  ALL_FILTER,
  DELIVERY_FILTER_OPTIONS,
  toStatusOptions,
} from '@/lib/orderFilters';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';

export default function Orders() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState('');
  const [status, setStatus] = useState('');
  const [delivery, setDelivery] = useState('');

  const { data, isPending, isError } = useGetSellerOrders({
    pageNumber: page,
    pageSize,
  });

  const orders = useMemo(() => {
    return data ?? [];
  }, [data]);

  const products = useMemo(
    () =>
      Array.from(new Set(orders.map((order) => order.productName)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [orders],
  );

  const statusOptions = useMemo(
    () => toStatusOptions(orders.map((order) => order.status)),
    [orders],
  );

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesProduct = !product || order.productName === product;
      const matchesStatus =
        !status || order.status.toLowerCase() === status.toLowerCase();
      const matchesDelivery =
        !delivery || deliveryGroupOf(order.status) === delivery;
      const matchesSearch =
        !term ||
        [
          order.orderNumber,
          order.productName,
          order.category,
          order.email,
          order.shipTo,
        ]
          .join(' ')
          .toLowerCase()
          .includes(term);

      return (
        matchesProduct && matchesStatus && matchesDelivery && matchesSearch
      );
    });
  }, [orders, search, product, status, delivery]);

  const totalPages = useMemo(() => {
    return filteredOrders.length
      ? Math.ceil(filteredOrders.length / pageSize)
      : 1;
  }, [filteredOrders, pageSize]);

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  if (isPending) {
    return (
      <div className="h-[70vh] overflow-hidden justify-center flex items-center opacity-40">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="helix-card p-12 text-center text-[#9CA3AF] text-sm">
        Failed to load orders. Please refresh.
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="helix-card p-12 text-center text-[#9CA3AF]">
        No orders yet.{' '}
        {user?.role === 'retailer'
          ? 'Browse the marketplace to submit an RFQ.'
          : 'Inbound RFQs and confirmed trades will appear here.'}
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 justify-between sm:flex-row lg:items-center">
          <CustomSearchInput
            className="lg:flex-1"
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search by order, product or customer..."
          />

          <div className="basis-2/3 flex justify-end gap-2">
            <CustomSelect
              className="w-full max-w-40"
              placeholder="All products"
              value={product === '' ? ALL_FILTER : product}
              onValueChange={(value) => {
                setProduct(value === ALL_FILTER ? '' : value);
                setPage(1);
              }}
              options={[
                { label: 'All products', value: ALL_FILTER },
                ...products.map((name) => ({ label: name, value: name })),
              ]}
            />

            <CustomSelect
              className="w-full max-w-40"
              placeholder="All statuses"
              value={status === '' ? ALL_FILTER : status}
              onValueChange={(value) => {
                setStatus(value === ALL_FILTER ? '' : value);
                setPage(1);
              }}
              options={[
                { label: 'All statuses', value: ALL_FILTER },
                ...statusOptions,
              ]}
            />

            <CustomSelect
              className="w-full max-w-40"
              placeholder="All deliveries"
              value={delivery === '' ? ALL_FILTER : delivery}
              onValueChange={(value) => {
                setDelivery(value === ALL_FILTER ? '' : value);
                setPage(1);
              }}
              options={[
                { label: 'All deliveries', value: ALL_FILTER },
                ...DELIVERY_FILTER_OPTIONS,
              ]}
            />
          </div>
        </div>

        <p className="text-[12px] text-muted">
          Showing <strong className="text-text">{filteredOrders.length}</strong>{' '}
          of <strong className="text-text">{orders.length}</strong> orders
        </p>
      </section>

      {filteredOrders.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No orders match your current search.
        </div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {filteredOrders.map((order) => (
              <ExporterOrderCard key={order.id} order={order} />
            ))}
          </div>

          <article className="hidden md:block border border-border rounded overflow-hidden">
            <table className="helix-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Delivery</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-text">{order.orderNumber}</td>

                    <td className="max-w-55 truncate">{order.productName}</td>
                    <td className="font-mono">{order.quantity}</td>
                    <td className="font-mono">{formatUSD(order.amount)}</td>
                    <td className="text-[12px] text-[#9CA3AF]">
                      {formatDateTime(order.deliveryDate)}
                    </td>
                    <td>
                      <StatusPill
                        status={
                          order?.status?.toLowerCase() === 'pending_payment'
                            ? 'Not Paid'
                            : order.status
                        }
                      />
                    </td>

                    <td>
                      <Link
                        href={{
                          pathname: '/exporter/orders/details',
                          query: { id: `${order.id}` },
                        }}
                        className="text-[12px] text-[#C9922A] hover:underline whitespace-nowrap"
                      >
                        View details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </>
      )}

      <article className="flex flex-col md:items-center gap-3 md:flex-row mt-10  md:justify-between">
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(page) => setPage(page)}
        />
        <SelectDropDown pageNum={pageSize} setPageNum={handlePageSizeChange} />
      </article>
    </section>
  );
}
