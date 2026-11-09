'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '@/components/ui/Modal';
import CustomSelect from '@/components/form/CustomSelect';
import FulfillmentForm, {
  type FulfillmentPayload,
} from '@/components/form/FulfillmentForm';
import OrderDFilters from '../components/OrderDFilters';
import OrderDStats from '../components/OrderDStats';
import OrderDTable from '../components/OrderDTable';
import { ORDER_D_ROWS } from '../data/orderDData';
import type { OrderDFulfillmentFilter, OrderDRecord } from '../types';
import {
  deliveryMethodOptions,
  exportOrdersToCsv,
  matchesFilters,
  nextOrderNumber,
  toDeliveryStatus,
  toFulfillmentStatus,
  toFormStatus,
} from '../utils';

const LOCATIONS = ['All locations', 'Lagos HQ', 'Abuja', 'Accra'];

export default function OrderD() {
  const [orders, setOrders] = useState<OrderDRecord[]>(ORDER_D_ROWS);
  const [search, setSearch] = useState('');
  const [fulfillment, setFulfillment] = useState<OrderDFulfillmentFilter>('');
  const [method, setMethod] = useState('');
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editing, setEditing] = useState<OrderDRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const methods = useMemo(() => deliveryMethodOptions(orders), [orders]);

  const selectedCount = selectedIds.length;

  const handleClearSelection = () => setSelectedIds([]);

  const visibleOrders = useMemo(
    () =>
      orders.filter((order) =>
        matchesFilters(order, { search, fulfillment, method }),
      ),
    [orders, search, fulfillment, method],
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) =>
      visibleOrders.every((order) => prev.includes(order.id))
        ? []
        : visibleOrders.map((order) => order.id),
    );
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (order: OrderDRecord) => {
    setEditing(order);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleSubmit = (payload: FulfillmentPayload) => {
    const hasTracking = Boolean(
      payload.courierName || payload.trackingNumber || payload.trackingUrl,
    );
    const fulfillmentStatus = toFulfillmentStatus(payload.fulfillmentStatus);
    const deliveryStatus = toDeliveryStatus(
      payload.fulfillmentStatus,
      hasTracking,
    );

    if (editing) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === editing.id
            ? {
                ...order,
                fulfillmentStatus,
                deliveryStatus,
                courierName: payload.courierName,
                trackingNumber: payload.trackingNumber,
                trackingUrl: payload.trackingUrl,
              }
            : order,
        ),
      );

      toast.success(`Order #${editing.orderNumber} updated.`);
    } else {
      const orderNumber = nextOrderNumber(orders);

      setOrders((prev) => [
        {
          id: orderNumber,
          orderNumber,
          placedAt: new Date().toISOString(),
          customer: 'No customer',
          fulfillBy: '',
          channel: 'Draft Orders',
          total: 0,
          paymentStatus: 'Pending',
          fulfillmentStatus,
          items: 0,
          deliveryStatus,
          deliveryMethod: 'Shipping',
          tags: [],
          courierName: payload.courierName,
          trackingNumber: payload.trackingNumber,
          trackingUrl: payload.trackingUrl,
        },
        ...prev,
      ]);

      setSearch('');
      setFulfillment('');
      setMethod('');

      toast.success(`Order #${orderNumber} created.`);
    }

    closeForm();
  };

  const handleExport = () => {
    if (visibleOrders.length === 0) {
      toast.error('There are no orders to export.');
      return;
    }

    exportOrdersToCsv(visibleOrders);
    toast.success(`Exported ${visibleOrders.length} orders.`);
  };

  return (
    <section className="pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-text">Orders</h1>

          <article className="w-40">
            <CustomSelect
              size="sm"
              value={location}
              onValueChange={setLocation}
              options={LOCATIONS.map((option) => ({
                label: option,
                value: option,
              }))}
            />
          </article>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="helix-btn-secondary text-sm"
          >
            Export
          </button>

          <button
            type="button"
            onClick={openCreate}
            className="helix-btn-primary text-sm"
          >
            Create order
          </button>
        </div>
      </div>

      <OrderDStats orders={orders} />

      <div className="mt-5 space-y-3">
        <OrderDFilters
          search={search}
          onSearchChange={setSearch}
          fulfillment={fulfillment}
          onFulfillmentChange={setFulfillment}
          method={method}
          methods={methods}
          onMethodChange={setMethod}
        />
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
            <strong className="text-text">{visibleOrders.length}</strong> of{' '}
            <strong className="text-text">{orders.length}</strong> orders
          </span>
        </div>

        <OrderDTable
          orders={visibleOrders}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          onEdit={openEdit}
        />
      </div>

      {formOpen && (
        <Modal
          onClose={closeForm}
          maxWidth="max-w-lg"
          title={
            editing ? `Fulfillment · #${editing.orderNumber}` : 'Create order'
          }
        >
          <FulfillmentForm
            key={editing?.id ?? 'new'}
            isSubmitting={false}
            onCancel={closeForm}
            onSubmit={handleSubmit}
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
      )}
    </section>
  );
}
