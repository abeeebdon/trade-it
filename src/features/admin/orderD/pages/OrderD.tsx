'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Loading } from '@/components/loading';
import { useGetAdminOrders } from '@/features/admin/hooks/useGetAdminOrders';
import type { AdminOrder } from '@/features/admin/types/orders';
import OrderDStats from '../components/OrderDStats';
import OrderDTable from '../components/OrderDTable';
import { exportOrdersToCsv, normalizeFulfillmentStatus } from '../utils';
import { OrderDFulfillmentFilter } from '../types';

type FulfillmentTab = {
  value: OrderDFulfillmentFilter;
  label: string;
};

const FULFILLMENT_TABS: FulfillmentTab[] = [
  { value: '', label: 'All' },
  { value: 'unfulfilled', label: 'Unfulfilled' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'fulfilled', label: 'Fulfilled' },
  { value: 'delivered', label: 'Delivered' },
];
export default function OrderD() {
  const { data, isPending, isError, refetch } = useGetAdminOrders();

  const [fulfillment, setFulfillment] = useState<OrderDFulfillmentFilter>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedCount = selectedIds.length;

  const handleClearSelection = () => setSelectedIds([]);

  const visibleOrders = useMemo<AdminOrder[]>(() => data?.data ?? [], [data]);

  const filteredOrders = useMemo(
    () =>
      fulfillment
        ? visibleOrders.filter(
            (order) =>
              normalizeFulfillmentStatus(order.fulfillmentStatus) ===
              fulfillment,
          )
        : visibleOrders,
    [visibleOrders, fulfillment],
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  // const toggleSelectAll = () => {
  //   setSelectedIds((prev) =>
  //     visibleOrders.every((order) => prev.includes(order.id))
  //       ? []
  //       : visibleOrders.map((order) => order.id),
  //   );
  // };

  const handleExport = () => {
    if (visibleOrders.length === 0) {
      toast.error('There are no orders to export.');
      return;
    }

    exportOrdersToCsv(visibleOrders);
    toast.success(`Exported ${visibleOrders.length} orders.`);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="helix-card p-12 text-center text-muted">
        <p className="text-lg font-medium text-text">Failed to load orders</p>
        <p className="mt-1 text-sm">Something went wrong. Please try again.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="helix-btn-primary mt-6 inline-flex items-center gap-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="pb-10">
      <div className="flex justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          {FULFILLMENT_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFulfillment(tab.value)}
              className={`px-3 cursor-pointer py-1.5 rounded-full text-[12px] border transition-colors ${
                fulfillment === tab.value
                  ? 'bg-primary text-secondary-foreground border-primary'
                  : 'border-border/40 text-muted hover:border-primary hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="helix-btn-secondary text-sm"
        >
          Export CSV
        </button>
      </div>

      <OrderDStats orders={visibleOrders} />

      <div className="mt-5 space-y-3">
        {selectedCount > 0 && (
          <div className="flex items-center gap-2 text-[12px] text-muted">
            <span>
              <strong className="text-text">{selectedCount}</strong> selected
            </span>
            <button
              type="button"
              onClick={handleClearSelection}
              className="inline-flex items-center gap-1 text-primary hover:underline cursor-pointer"
            >
              <X size={12} />
              Clear
            </button>
          </div>
        )}
        <div className="flex items-center justify-between gap-2 text-[13px] text-muted">
          <span>
            Showing{' '}
            <strong className="text-text">{filteredOrders.length}</strong> of{' '}
            <strong className="text-text">{visibleOrders.length}</strong> orders
          </span>
        </div>

        <OrderDTable
          orders={filteredOrders}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={() => {}}
        />
      </div>

      {/* {formOpen && (
        <Modal
          onClose={closeForm}
          maxWidth="max-w-lg"
          title={
            editing ? `Fulfillment · #${editing.orderNumber}` : 'Create order'
          }
        >
          {/* <FulfillmentForm
            key={editing?.id ?? 'new'}
            isSubmitting={false}
            onCancel={closeForm}
            // onSubmit={handleSubmit}
            defaultValues={
              editing
                ? {
                    fulfillmentStatus: toFormStatus(editing),
                    courierName: editing.courierName,
                    trackingNumber: editing.trackingNumber,
                    trackingUrl: editing.trackingUrl,
                  }
                : undefined
            }
          /> 
        </Modal>
  )
}
       */}
    </section>
  );
}
