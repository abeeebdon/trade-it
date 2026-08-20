// data/dummyOrders.ts
// Constant dummy order data used by the order-management demo pages
// (admin, consumer, retailer, exporter). Spans the full order lifecycle
// so every role has orders to view and manage in each status.

import { OrderStatus } from '@/features/orderManagement/lib/orderStatus';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface DummyOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  consumerName: string;
  vendorName: string;
  createdAt: string;
}

export const DUMMY_ORDERS: DummyOrder[] = [
  {
    id: 'ord-1042',
    orderNumber: 'JM-1042',
    status: OrderStatus.PAID,
    items: [
      { id: 'itm-1', name: 'Raw Shea Butter (1kg)', quantity: 2, price: 84 },
    ],
    total: 168,
    consumerName: 'Amaka Okafor',
    vendorName: 'GreenFields Export',
    createdAt: '2026-08-12T09:24:00Z',
  },
  {
    id: 'ord-1043',
    orderNumber: 'JM-1043',
    status: OrderStatus.PACKED,
    items: [
      {
        id: 'itm-2',
        name: 'Premium Cocoa Beans (25kg)',
        quantity: 4,
        price: 150,
      },
    ],
    total: 600,
    consumerName: 'Tunde Balogun',
    vendorName: 'GreenFields Export',
    createdAt: '2026-08-13T11:02:00Z',
  },
  {
    id: 'ord-1044',
    orderNumber: 'JM-1044',
    status: OrderStatus.READY_FOR_SHIPPING,
    items: [
      { id: 'itm-3', name: 'Raw Cashew Nuts (10kg)', quantity: 3, price: 95 },
    ],
    total: 285,
    consumerName: 'Fatima Usman',
    vendorName: 'Lagos Craft Hub',
    createdAt: '2026-08-14T14:40:00Z',
  },
  {
    id: 'ord-1045',
    orderNumber: 'JM-1045',
    status: OrderStatus.SHIPPED,
    items: [
      {
        id: 'itm-4',
        name: 'Handwoven Ankara Textiles',
        quantity: 6,
        price: 40,
      },
    ],
    total: 240,
    consumerName: 'Chidi Eze',
    vendorName: 'Lagos Craft Hub',
    createdAt: '2026-08-15T08:15:00Z',
  },
  {
    id: 'ord-1046',
    orderNumber: 'JM-1046',
    status: OrderStatus.OUT_FOR_DELIVERY,
    items: [
      { id: 'itm-5', name: 'Genuine Leather Handbag', quantity: 2, price: 120 },
    ],
    total: 240,
    consumerName: 'Ngozi Adeyemi',
    vendorName: 'Aba Leather Works',
    createdAt: '2026-08-16T16:05:00Z',
  },
  {
    id: 'ord-1047',
    orderNumber: 'JM-1047',
    status: OrderStatus.DELIVERED,
    items: [
      { id: 'itm-6', name: 'Dried Ginger (5kg)', quantity: 5, price: 32 },
    ],
    total: 160,
    consumerName: 'Emeka Obi',
    vendorName: 'Aba Leather Works',
    createdAt: '2026-08-17T10:30:00Z',
  },
  {
    id: 'ord-1048',
    orderNumber: 'JM-1048',
    status: OrderStatus.RECEIVED,
    items: [
      {
        id: 'itm-7',
        name: 'Dried Hibiscus / Zobo (2kg)',
        quantity: 8,
        price: 18,
      },
    ],
    total: 144,
    consumerName: 'Yemi Alade',
    vendorName: 'GreenFields Export',
    createdAt: '2026-08-10T13:45:00Z',
  },
  {
    id: 'ord-1049',
    orderNumber: 'JM-1049',
    status: OrderStatus.PAID,
    items: [
      {
        id: 'itm-8',
        name: 'Unrefined Palm Kernel Oil (5L)',
        quantity: 3,
        price: 60,
      },
    ],
    total: 180,
    consumerName: 'Bisi Akin',
    vendorName: 'Lagos Craft Hub',
    createdAt: '2026-08-18T09:10:00Z',
  },
  {
    id: 'ord-1050',
    orderNumber: 'JM-1050',
    status: OrderStatus.RECEIVED,
    items: [
      { id: 'itm-9', name: 'Cotton Fabric (per yard)', quantity: 4, price: 25 },
    ],
    total: 100,
    consumerName: 'Kemi Aderibigbe',
    vendorName: 'Aba Leather Works',
    createdAt: '2026-08-11T12:20:00Z',
  },
];
