import { Business, BuyerDashboardData, ListingItem } from '../types/buyers';

export const dataBuyerDashboard: BuyerDashboardData = {
  ngn_balance: 0.0,
  usd_balance: 0.0,
  recent_transactions: [],
  virtual_accounts: {
    ngn: {
      account_number: '8779683395',
      account_id: 'dep_ngn_b93ee2f74f8f4920',
      bank: 'Anchor Sandbox Bank',
    },
    usd: {
      account_number: 'HLX-USD-6012CAB8',
      account_id: 'dep_usd_6aeb2d49e98a4e6a',
      bank: 'Anchor USD FBO Riby Inc',
    },
  },
  anchor_customer_id: 'cust_biz_f487a4abcffb459e',
  kyc_status: 'approved',
  kyb_status: 'approved',
};

export const dummyBusiness: Business = {
  id: 'biz_001',

  business_name: 'Jomp Agro Export Ltd',
  sector: 'agriculture',
  country: 'Nigeria',

  anchor_customer_id: 'cust_anchor_98XHS72',

  kyc_status: 'approved',
  kyb_status: 'approved',

  registration_type: 'business',

  anchor_ngn_virtual_account: '8779683395',
  anchor_usd_virtual_account: 'HLX-USD-6012CAB8',
  anchor_account_ngn: '2',
};
export const SECTORS = [
  { value: 'fashion', label: 'Fashion & Textiles' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'staple-foods', label: 'Staple Foods' },
  { value: 'general-goods', label: 'General Goods' },
];

export const dummyItems: ListingItem[] = [
  {
    id: 1,
    title: 'African Ankara Tote Bag',
    category: 'fashion',
    retail_price_usd: 45,
    stock_qty: 20,
    fulfillment_mode: 'riby_dtc',
    status: 'active',
    photos: ['/images/product-1.jpg'],
    description: 'Premium handmade Ankara tote bag.',
    ships_from: 'Lagos → Riby US fulfillment',
  },
  {
    id: 2,
    title: 'Organic Shea Butter',
    category: 'beauty',
    retail_price_usd: 18,
    stock_qty: 50,
    fulfillment_mode: 'buyer_local',
    status: 'active',
    photos: ['/images/product-2.jpg'],
    description: 'Raw organic shea butter.',
    ships_from: 'Brooklyn, NY',
  },
  {
    id: 3,
    title: 'Leather Sandals',
    category: 'fashion',
    retail_price_usd: 60,
    stock_qty: 0,
    fulfillment_mode: 'riby_dtc',
    status: 'out_of_stock',
    photos: ['/images/product-3.jpg'],
    description: 'Handcrafted premium leather sandals.',
    ships_from: 'Lagos → Riby US fulfillment',
  },
];
