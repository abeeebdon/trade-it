import { NavItems } from '@/types';
import {
  ChartLine,
  LayoutDashboard,
  Package,
  Store,
  Receipt,
  Truck,
  ShoppingCart,
  ShieldCheck,
  Wallet,
  HandCoins,
  RefreshCw,
  FileText,
  DollarSign,
  // Users,
  Currency,
  Lightbulb,
  HandHelping,
} from 'lucide-react';

export const helixCards = [
  {
    title: 'RIBY INC',
    subtitle: 'US & GLOBAL',
    description:
      'US & Global operations and transaction management. Payment collection entity, escrow custodian, and Delivery Partner of Record for direct-to-consumer shipments.',
  },
  {
    title: 'JOMPSTART DIGITAL',
    subtitle: 'NIGERIA & AFRICA · TECH · CREDIT',
    description:
      'Nigeria & Africa ground operations. Builds and maintains the platform and technology integrations. Underwrites and manages Business Credit to suppliers.',
  },
  {
    title: 'ANCHOR',
    subtitle: 'BANKING INFRASTRUCTURE',
    description:
      'Global Business Banking and Payment Services — NGN & USD deposit accounts, virtual accounts, transfers, and reconciliation.',
  },
];

export const CARGO_IMG =
  'https://images.pexels.com/photos/12047372/pexels-photo-12047372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
export const heroText = [
  { k: '$0', v: 'to open an NGN + USD account' },
  { k: '1%', v: 'flat platform fee per trade' },
  { k: '7', v: 'lifecycle stages tracked' },
];

export const moduleArr = [
  {
    icon: ShieldCheck,
    title: 'Onboarding & Verification',
    body: 'Nigeria KYC / KYB with CAC, BVN, TIN. US-side EIN. Anchor customers created automatically on approval.',
  },
  {
    icon: Package,
    title: 'Product & Export Catalog',
    body: 'Dual-currency pricing from live FX, compliance badges, marketplace browsable by buyers.',
  },
  {
    icon: ChartLine,
    title: 'Trade & Order Management',
    body: 'RFQ → Proforma → Confirmation → Production → Shipment → Delivery, with Riby Inc–held escrow accounts per order.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Vault',
    body: 'SON, NAFDAC, phytosanitary, FDA prior notice. Expiry alerts at 30 and 7 days. Auto score per business.',
  },
  {
    icon: Currency,
    title: 'Anchor-Powered Finance',
    body: 'NGN + USD balances, virtual accounts, NIP withdrawals, book transfers, platform fees — all live via Anchor.',
  },
  {
    icon: Lightbulb,
    title: 'Document Automation',
    body: 'Commercial Invoice, Packing List, Proforma, Certificate of Origin — generated on demand, ready to ship.',
  },
];
export const catData = [
  'Fashion',
  'Agriculture',
  'Staple Foods',
  'General Goods',
];
export const NAV: {
  exporter: NavItems[];
  buyer: NavItems[];
  super_admin: NavItems[];
  admin: NavItems[];
} = {
  exporter: [
    { to: '/exporter', label: 'Command Center', icon: LayoutDashboard },
    { to: '/exporter/my-products', label: 'My Products', icon: Package },
    { to: '/exporter/catalog', label: 'Marketplace', icon: Store },
    { to: '/exporter/orders', label: 'Orders', icon: Receipt },
    { to: '/exporter/sell', label: 'Sell Direct (DTC)', icon: Truck },
    { to: '/exporter/fulfillment', label: 'Fulfillment', icon: ShoppingCart },
    { to: '/exporter/compliance', label: 'Compliance', icon: ShieldCheck },
    { to: '/exporter/finance', label: 'Finance', icon: Wallet },
    {
      to: '/exporter/withdrawal-accounts',
      label: 'Withdrawal Accounts',
      icon: HandCoins,
    },
    { to: '/exporter/credit', label: 'Business Credit', icon: HandCoins },
    { to: '/exporter/repayment', label: 'Repayments', icon: RefreshCw },
    { to: '/exporter/onboarding', label: 'Business Profile', icon: FileText },
  ],

  buyer: [
    { to: '/buyer', label: 'Command Center', icon: LayoutDashboard },
    { to: '/buyer/catalog', label: 'Marketplace', icon: Store },
    { to: '/buyer/orders', label: 'My Orders', icon: Receipt },
    { to: '/buyer/sell', label: 'Local Inventory Shop', icon: ShoppingCart },
    { to: '/buyer/fulfillment', label: 'Fulfillment', icon: Truck },
    { to: '/buyer/finance', label: 'Finance', icon: Wallet },
    { to: '/buyer/accounts', label: 'Withdrawal Accounts', icon: HandHelping },
    { to: '/buyer/onboarding', label: 'Business Profile', icon: FileText },
  ],

  admin: [
    { to: '/admin', label: 'Admin Overview', icon: LayoutDashboard },
    { to: '/admin/verifications', label: 'Verifications', icon: ShieldCheck },
    { to: '/admin/credit', label: 'JompStart Credit', icon: HandCoins },
    { to: '/admin/disputes', label: 'Disputes', icon: RefreshCw },
    {
      to: '/admin/finance',
      label: 'Financial Overview',
      icon: DollarSign,
    },
    { to: '/admin/catalog', label: 'Marketplace', icon: Store },
  ],

  super_admin: [
    { to: '/admin/credit', label: 'JompStart Credit', icon: HandCoins },
  ],
};

export const NAV_LINKS = [
  {
    label: 'Shops',
    href: '/',
  },
  {
    label: 'Direct from Africa',
    href: '/?mode=buyer_local',
  },
  {
    label: 'US In-Stock',
    href: '/?mode=riby_dtc',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Become a Seller',
    href: '/register?role=exporter',
  },
];
