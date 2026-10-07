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
  ShoppingBagIcon,
} from 'lucide-react';

export interface NavItemConfig {
  href: string;
  icon: LucideIcon;
  label: string;
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
      },
      {
        href: '/',
        icon: ShoppingBag,
        label: 'MarketPlace',
      },
      {
        href: '/cart',
        icon: ShoppingBasket,
        label: 'Cart',
      },
      {
        href: '/checkout',
        icon: ShoppingBagIcon,
        label: 'Checkout',
      },
      {
        href: '/consumer/orders',
        icon: Receipt,
        label: 'Orders',
      },

      {
        href: '/consumer/quotes',
        icon: Package,
        label: 'Quotation',
      },
      {
        href: '/consumer/favourites',
        icon: Heart,
        label: 'Favourites',
      },
      {
        href: '/consumer/lists',
        icon: ListChecks,
        label: 'Shopping Lists',
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
      },
      {
        href: '/consumer/receipts',
        icon: Receipt,
        label: 'Receipts',
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        href: '/profile',
        icon: UserCircle,
        label: 'Profile',
      },
      {
        href: '/consumer/addresses',
        icon: MapPin,
        label: 'Delivery Addresses',
      },
      {
        href: '/consumer/notifications',
        icon: Bell,
        label: 'Notifications',
      },
      {
        href: '/consumer/help',
        icon: HelpCircle,
        label: 'Help & Support',
      },
    ],
  },
];
