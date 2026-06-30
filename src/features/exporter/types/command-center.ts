import { ConsumerOrder } from '@/features/shops/types/shops';
import { Transaction, FxRate } from './exporter';

export type WalletStatus = 'active' | 'inactive' | 'suspended';

export type CommandCenterWallet = {
  id: number;
  currency: string;
  balance: number;
  availableBalance: number;
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
  provider: string;
  status: WalletStatus;
};

export type CommandCenterCompliance = {
  score: number;
  status: string;
  missingDocuments: string[];
};

export type CommandCenterRecentOrders = {
  activeCount: number;
  items: ConsumerOrder[];
};

export type CommandCenterData = {
  title: string;
  welcomeMessage: string;
  badges: string[];
  wallets: CommandCenterWallet[];
  fxRate: FxRate;
  recentOrders: CommandCenterRecentOrders;
  compliance: CommandCenterCompliance;
  recentTransactions: Transaction[];
};

export type CommandCenterResponse = {
  success: boolean;
  message: string;
  data: CommandCenterData;
  statusCode: number;
};
