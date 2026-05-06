import { BuyerDashboardData } from '../types/buyers';

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
