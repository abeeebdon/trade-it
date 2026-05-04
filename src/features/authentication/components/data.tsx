import { authRoleType } from '@/types';
import { Globe, LucideIcon, ShoppingBag, Store } from 'lucide-react';

export interface RoleType {
  value: authRoleType;
  title: string;
  sub: string;
  blurb: string;
  Icon: LucideIcon;
  pill: string;
}
export const ROLES: RoleType[] = [
  {
    value: 'consumer',
    title: 'Direct Customer',
    sub: "I'm here to shop",
    blurb:
      'Buy authentic African goods for personal use. Escrow-protected on every order.',
    Icon: ShoppingBag,
    pill: 'Free · most popular',
  },
  {
    value: 'buyer',
    title: 'Reseller / Bulk Buyer',
    sub: 'I import & resell at scale',
    blurb:
      'Source bulk inventory from verified African suppliers. RFQs, custom quotes, US-bonded warehousing.',
    Icon: Store,
    pill: 'Business · Importer',
  },
  {
    value: 'exporter',
    title: 'African Exporter',
    sub: "I'm a maker / supplier from Africa",
    blurb:
      'List products, sell direct-to-consumer (Riby of record) or wholesale, access JompStart credit.',
    Icon: Globe,
    pill: 'Business · Supplier',
  },
];
