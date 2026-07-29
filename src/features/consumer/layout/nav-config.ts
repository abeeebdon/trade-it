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
  ShoppingBag,
  ShoppingBasket,
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
        href: '/consumer',
        icon: Home,
        label: 'Dashboard',
        testid: 'cs-nav-dash',
      },
      {
        href: '/',
        icon: ShoppingBag,
        label: 'MarketPlace',
        testid: 'cs-nav-dash',
      },
      {
        href: '/consumer/cart',
        icon: ShoppingBasket,
        label: 'Cart',
        testid: 'cs-nav-cart',
      },
      {
        href: '/consumer/orders',
        icon: Package,
        label: 'My Orders',
        testid: 'cs-nav-orders',
        badgeKey: 'orders',
      },
      {
        href: '/consumer/favourites',
        icon: Heart,
        label: 'Favourites',
        testid: 'cs-nav-favs',
      },
      {
        href: '/consumer/lists',
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
        href: '/consumer/payment-methods',
        icon: CreditCard,
        label: 'Payment Methods',
        testid: 'cs-nav-pm',
      },
      {
        href: '/consumer/receipts',
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
        href: '/consumer/profile',
        icon: UserCircle,
        label: 'Profile',
        testid: 'cs-nav-profile',
      },
      {
        href: '/consumer/addresses',
        icon: MapPin,
        label: 'Delivery Addresses',
        testid: 'cs-nav-addr',
      },
      {
        href: '/consumer/notifications',
        icon: Bell,
        label: 'Notifications',
        testid: 'cs-nav-notifs',
      },
      {
        href: '/consumer/help',
        icon: HelpCircle,
        label: 'Help & Support',
        testid: 'cs-nav-help',
      },
    ],
  },
];
