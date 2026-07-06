import type { NotificationPrefs, NotificationGroup } from './types';

export const MOCK_NOTIFICATION_PREFS: NotificationPrefs = {
  order_updates_email: true,
  order_updates_sms: false,
  delivery_alerts_push: true,
  delivery_alerts_sms: true,
  reorder_reminders_email: true,
  promotions_email: false,
};

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    title: 'Order updates',
    body: 'Confirmation, packed, shipped, delivered.',
    keys: [
      { k: 'order_updates_email', l: 'Email' },
      { k: 'order_updates_sms', l: 'SMS' },
    ],
  },
  {
    title: 'Delivery alerts',
    body: 'Real-time push when your order moves through customs or is out for delivery.',
    keys: [
      { k: 'delivery_alerts_push', l: 'Push' },
      { k: 'delivery_alerts_sms', l: 'SMS' },
    ],
  },
  {
    title: 'Reorder reminders',
    body: "Gentle nudges when a favourite item is back or you're running low.",
    keys: [{ k: 'reorder_reminders_email', l: 'Email' }],
  },
  {
    title: 'Promotions & new arrivals',
    body: 'Occasional emails about deals and new African imports.',
    keys: [{ k: 'promotions_email', l: 'Email' }],
  },
];
