'use client';

import Modal from '@/components/ui/Modal';
import FulfillmentForm, {
  FULFILLMENT_STATUSES,
  type FulfillmentPayload,
  type FulfillmentStatus,
} from '@/components/form/FulfillmentForm';
import type { AdminOrder } from '@/features/admin/types/orders';
import { useUpdateAdminOrderFulfillment } from '../../hooks/useGetAdminOrders';

const fulfillmentStatusFromOrder = (order: AdminOrder): FulfillmentStatus => {
  const current = (order.fulfillmentStatus ?? order.status ?? '').toLowerCase();

  const exactMatch = FULFILLMENT_STATUSES.find(
    (status) => status.value === current,
  );
  if (exactMatch) return exactMatch.value;

  return 'unfulfilled';
};

type UpdateOrderStatusModalProps = {
  order: AdminOrder;
  onClose: () => void;
};

export default function UpdateOrderStatusModal({
  order,
  onClose,
}: UpdateOrderStatusModalProps) {
  const updateMutation = useUpdateAdminOrderFulfillment(order?.id ?? '');
  const handleSubmit = (values: FulfillmentPayload) => {
    updateMutation.mutate(values);
  };
  return (
    <Modal
      onClose={onClose}
      title={`Update status · #${order.orderNumber}`}
      maxWidth="max-w-lg"
    >
      <FulfillmentForm
        isSubmitting={updateMutation.isPending}
        onCancel={onClose}
        onSubmit={handleSubmit}
        defaultValues={{
          fulfillmentStatus: fulfillmentStatusFromOrder(order),
          courierName: order.courierName ?? '',
          trackingNumber: order.trackingNumber ?? '',
          trackingUrl: order.trackingUrl ?? '',
        }}
      />
    </Modal>
  );
}
