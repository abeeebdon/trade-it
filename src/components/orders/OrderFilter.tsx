'use client';

export type PaymentFilter = 'All' | 'Paid' | 'Pending' | 'Failed' | 'Refunded';
export type DeliveryFilter =
  | 'All'
  | 'Processing'
  | 'Shipped'
  | 'Out for delivery'
  | 'Delivered'
  | 'Returned';

export const PAYMENT_FILTERS: PaymentFilter[] = [
  'All',
  'Paid',
  'Pending',
  'Failed',
  'Refunded',
];

export const DELIVERY_FILTERS: DeliveryFilter[] = [
  'All',
  'Processing',
  'Shipped',
  'Out for delivery',
  'Delivered',
  'Returned',
];

// Semantic status colors — fixed values so they read the same in both
// light and dark mode (green / amber / red / blue).
const PAYMENT_COLORS: Partial<Record<PaymentFilter, string>> = {
  Paid: '#00D639',
  Pending: '#FFB800',
  Failed: '#FF858B',
  Refunded: '#66AFFF',
};

const DELIVERY_COLORS: Partial<Record<DeliveryFilter, string>> = {
  Processing: '#C8C8C8',
  Shipped: '#66AFFF',
  'Out for delivery': '#FFB800',
  Delivered: '#00D639',
  Returned: '#FF858B',
};

export interface OrderFilterProps {
  paymentStatus: PaymentFilter;
  deliveryStatus: DeliveryFilter;
  onPaymentStatusChange: (status: PaymentFilter) => void;
  onDeliveryStatusChange: (status: DeliveryFilter) => void;
}

export default function OrderFilter({
  paymentStatus,
  deliveryStatus,
  onPaymentStatusChange,
  onDeliveryStatusChange,
}: OrderFilterProps) {
  return (
    <section className="w-full rounded-xl border border-border bg-surface p-4 md:p-6">
      {/* Payment status */}
      <div>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
          Payment status
        </h2>

        <div className="flex flex-wrap gap-3">
          {PAYMENT_FILTERS.map((status) => (
            <FilterButton
              key={status}
              label={status}
              color={PAYMENT_COLORS[status]}
              active={paymentStatus === status}
              onClick={() => onPaymentStatusChange(status)}
            />
          ))}
        </div>
      </div>

      {/* Delivery status */}
      <div className="mt-6 md:mt-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
          Delivery status
        </h2>

        <div className="flex flex-wrap gap-3">
          {DELIVERY_FILTERS.map((status) => (
            <FilterButton
              key={status}
              label={status}
              color={DELIVERY_COLORS[status]}
              active={deliveryStatus === status}
              onClick={() => onDeliveryStatusChange(status)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type FilterButtonProps = {
  label: string;
  color?: string;
  active: boolean;
  onClick: () => void;
};

function FilterButton({ label, color, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        flex h-8 items-center justify-center gap-2.5
        rounded-full border px-6
        text-sm font-medium
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
        ${
          active
            ? 'border-primary bg-primary/10 text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
            : 'border-border bg-transparent text-muted hover:border-border hover:bg-border-soft hover:text-text'
        }
      `}
    >
      {color && (
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}55`,
          }}
        />
      )}

      <span>{label}</span>
    </button>
  );
}
