export interface NotificationPrefs {
  order_updates_email: boolean;
  order_updates_sms: boolean;
  delivery_alerts_push: boolean;
  delivery_alerts_sms: boolean;
  reorder_reminders_email: boolean;
  promotions_email: boolean;
}

export interface NotificationGroup {
  title: string;
  body: string;
  keys: { k: keyof NotificationPrefs; l: string }[];
}
