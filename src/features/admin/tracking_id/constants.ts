import type { TrackingStatus } from './types/trackingId';

export const TRACKING_STATUSES: Array<{
  value: TrackingStatus;
  label: string;
}> = [
  { value: 'received', label: 'Received' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
];

export const TRACKING_STATUS_STYLES: Record<TrackingStatus, string> = {
  received: 'bg-[var(--helix-gold-dim)]/15 text-[var(--helix-gold)]',
  in_transit: 'bg-[var(--helix-teal)]/15 text-[var(--helix-teal)]',
  delivered: 'bg-emerald-500/15 text-emerald-500',
};
