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
import ExporterOrderSearchFilter from '../../orders/components/ExporterOrderSearchFilter';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime, formatUSD } from '@/lib/func';

export default function Orders() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [productName, setProductName] = useState('');
  const [status, setStatus] = useState('');

  const { data, isPending, isError } = useGetSellerOrders({
    pageNumber: page,
    pageSize,
  });

  const orders = useMemo(() => {
    return data ? data : [];
  }, [data]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesProduct = order.productName
        .toLowerCase()
        .includes(productName.trim().toLowerCase());
      const matchesStatus =
        !status || order.status.toLowerCase() === status.toLowerCase();

      return matchesProduct && matchesStatus;
    });
  }, [orders, productName, status]);

  const totalPages = useMemo(() => {
    return filteredOrders.length
      ? Math.ceil(filteredOrders.length / pageSize)
      : 1;
  }, [filteredOrders, pageSize]);

  const clearFilters = () => {
    setProductName('');
    setStatus('');
  };

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
      <ExporterOrderSearchFilter
        productName={productName}
        status={status}
        onProductNameChange={setProductName}
        onStatusChange={setStatus}
        onClear={clearFilters}
      />

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
