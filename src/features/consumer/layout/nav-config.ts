import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Package,
  Heart,
  ListChecks,
  CreditCard,
  Receipt,
  UserCircle,
  Bell,
  HelpCircle,
  MapPin,
} from 'lucide-react';

export interface NavItemConfig {
  href: string;
  icon: LucideIcon;
  label: string;
  testid: string;
  /** Key into the badge-count map passed down from ConsumerShell. */
  badgeKey?: 'orders';
}

export interface NavGroupConfig {
  label: string;
  items: NavItemConfig[];
}

export const NAV_GROUPS: NavGroupConfig[] = [
  {
    label: 'My Account',
    items: [
      {
        href: '/account',
        icon: Home,
        label: 'Dashboard',
        testid: 'cs-nav-dash',
      },
      {
        href: '/account/orders',
        icon: Package,
        label: 'My Orders',
        testid: 'cs-nav-orders',
        badgeKey: 'orders',
      },
      {
        href: '/account/favourites',
        icon: Heart,
        label: 'Favourites',
        testid: 'cs-nav-favs',
      },
      {
        href: '/account/lists',
        icon: ListChecks,
        label: 'Shopping Lists',
        testid: 'cs-nav-lists',
      },
    ],
  },
  {
    label: 'Payments',
    items: [
      {
        href: '/account/payment-methods',
        icon: CreditCard,
        label: 'Payment Methods',
        testid: 'cs-nav-pm',
      },
      {
        href: '/account/receipts',
        icon: Receipt,
        label: 'Receipts',
        testid: 'cs-nav-receipts',
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        href: '/account/profile',
        icon: UserCircle,
        label: 'Profile',
        testid: 'cs-nav-profile',
      },
      {
        href: '/account/addresses',
        icon: MapPin,
        label: 'Delivery Addresses',
        testid: 'cs-nav-addr',
      },
      {
        href: '/account/notifications',
        icon: Bell,
        label: 'Notifications',
        testid: 'cs-nav-notifs',
      },
      {
        href: '/account/help',
        icon: HelpCircle,
        label: 'Help & Support',
        testid: 'cs-nav-help',
      },
    ],
  },
];
