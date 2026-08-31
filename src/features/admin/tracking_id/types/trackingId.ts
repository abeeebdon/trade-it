export type TrackingStatus = 'received' | 'in_transit' | 'delivered';

export type TrackingId = {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  status: TrackingStatus;
  createdAt: string;
};

export type TrackingIdFormValues = {
  orderNumber: string;
  trackingNumber: string;
  status: TrackingStatus;
};
