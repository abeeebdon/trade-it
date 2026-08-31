import type { TrackingId } from '../types/trackingId';

export const mockTrackingIds: TrackingId[] = [
  {
    id: 'trk-001',
    orderNumber: 'JM-1042',
    trackingNumber: 'JMP202608200001',
    status: 'in_transit',
    createdAt: '2026-08-20',
  },
  {
    id: 'trk-002',
    orderNumber: 'JM-1043',
    trackingNumber: 'JMP202608210002',
    status: 'delivered',
    createdAt: '2026-08-21',
  },
  {
    id: 'trk-003',
    orderNumber: 'JM-1044',
    trackingNumber: 'JMP202608220003',
    status: 'pending',
    createdAt: '2026-08-22',
  },
  {
    id: 'trk-004',
    orderNumber: 'JM-1045',
    trackingNumber: 'JMP202608230004',
    status: 'exception',
    createdAt: '2026-08-23',
  },
  {
    id: 'trk-005',
    orderNumber: 'JM-1046',
    trackingNumber: 'JMP202608240005',
    status: 'in_transit',
    createdAt: '2026-08-24',
  },
];
