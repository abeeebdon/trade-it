import { ReactNode } from 'react';
import { AccountDetails } from './finance';
import { LucideIcon } from 'lucide-react';
import { ProductResponseType } from '../products/types/product';

export interface StatProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: boolean;
}

// Currency & Sector

export type CurrencyCode = 'USD' | 'NGN' | 'EUR' | string;

export type SectorStat = {
  volume_usd: number;
  count: number;
};

export type OverviewType = {
  business_count: number;
  order_count: number;
  transaction_count: number;
  fees_collected_usd: number;
  total_volume_by_currency: Record<CurrencyCode, number>;
  by_sector: Record<string, SectorStat>;
};

//  Verification
export interface FieldProps {
  label?: string;
  children: ReactNode;
  full?: string;
}

export type VerificationStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'under_review';

export type Verification = {
  id: string;
  business_name: string;
  country: string;
  sector: string;
  kyc_status: VerificationStatus;
  kyb_status: VerificationStatus;
  updated_at: string;
};

export interface VerificationItem {
  id: string;
  business_name: string;
  registration_type: string;
  country: string;
  sector: string;
  anchor_customer_id?: string;
  cac_number?: string;
  bvn?: string;
  tin?: string;
  ein?: string;
  director_name?: string;
  kyc_status: VerificationStatus;
  kyb_status: VerificationStatus;
}

// Credit (Admin-facing)

type CreditStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'offered';

export interface CreditApplicationX {
  id: string;
  application_number: string;
  business_name: string;
  business_country: string;
  amount_usd: number;
  indicative_apr: number;
  term_months: number;
  risk_score: number;
  status: CreditStatus;
  created_at: string;
  snapshot_sales?: {
    total_volume_usd: number;
  };
}

export interface OfferState {
  offered_amount_usd: string;
  offered_apr: string;
  offered_term_months: string;
  decision_note: string;
}

//  Disputes

export type DisputeStatus = 'open' | 'resolved' | 'rejected' | 'under_review';

export interface Dispute {
  id: string;
  reason: string;
  order_id: string;
  description: string;
  status: DisputeStatus;
  created_at: string;
}

export interface DisputeCardPRops {
  d: Dispute;
}

export type ProductStatus = 'active' | 'inactive' | 'draft' | 'archived';

export interface Product {
  id: string;
  business_id: string;
  name: string;
  category: string;
  description: string;
  photos: string[];
  price_ngn: number;
  price_usd: number;
  min_order_qty: number;
  unit: string;
  export_readiness_score: number;
  compliance_badges: string[];
  status: ProductStatus;
  created_at: string;
  country?: string;
}

export interface ProductCardPRops {
  p: Product;
}

export type ProductUnitOption = {
  id: number;
  label: string;
};

export type ProductStatusOption = {
  id: number;
  label: string;
  value: string;
};

export type CreateProductPayload = {
  UserId?: number;
  Name: string;
  Category: string;
  Unit: number;
  PriceUsd: number;
  Moq: number;
  Description: string;
  CurrencyId: number;
  StatusId: number;
  ThumbnailImage: File | null;
  Images: File[];
};

// Internal form state — maps to CreateProductPayload before submit
export type ProductFormState = {
  name: string;
  category: string;
  unitId: number;
  price_usd: number;
  moq: number;
  description: string;
  currencyId: number;
  statusId: number;
  thumbnail: File | null;
  images: File[];
};

export type ProductListParams = {
  pageNumber: number;
  pageSize: number;
};

export type ProductListResponse = {
  data: ProductResponseType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
};

// Supplier
export type Supplier = {
  business_name: string;
  country: string;
  address: string;
  compliance_score: number;
  kyb_status: string;
  kyc_status: string;
  anchor_customer_id: string | null;
};

export type ProductData = {
  product: Product;
  supplier: Supplier;
};
//  Orders

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'draft'
  | 'in_progress'
  | 'delivered'
  | 'completed'
  | 'disputed'
  | 'cancelled';

export type PaymentStatus =
  | 'awaiting'
  | 'paid'
  | 'confirmed'
  | 'refunded'
  | 'failed';

export type Order = {
  id: string;
  order_number: string;
  buyer_user_id: string;
  product_name: string;
  quantity: number;
  agreed_price_usd: number;
  target_delivery_date: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
};

export type TimelineEvent = {
  event: string;
  at: string;
};

export type OrderDetail = {
  id: string;
  order_number: string;
  buyer_user_id: string;
  supplier_user_id: string;
  product_name: string;
  quantity: number;
  agreed_price_usd: number;
  unit_price_usd: number;
  target_delivery_date: string;
  delivery_address: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  anchor_reserved_account_number: string | null;
  timeline: TimelineEvent[];
};

export type OrderDetailData = {
  order: OrderDetail;
  supplier: { business_name: string; country: string };
  buyer: { business_name: string; country: string };
};

//  Listings

export type FulfillmentMode = 'riby_dtc' | 'buyer_local';

export type ListingStatus = 'active' | 'out_of_stock' | 'archived';

export type Listing = {
  id: string;
  title: string;
  category: string;
  description: string;
  retail_price_usd: number;
  stock_qty: number;
  fulfillment_mode: FulfillmentMode;
  ships_from: string;
  photos: string[];
  status: ListingStatus;
};

export type ListingFormData = Omit<Listing, 'id' | 'fulfillment_mode'>;

export type CreateListingPayload = {
  UserId: number;
  Title: string;
  ThumbnailImage: File | null;
  Category: string;
  RetailPriceUsd: number;
  StockQty: number;
  ShipsFrom: string;
  Description: string;
  ProductStatusId: number;
  FulfillmentMode: string;
  Photos: File[];
};
// Fulfillment
export type EditListingPayload = {
  payload: CreateListingPayload;
  id: string | number;
};
export type QuoteStatus =
  | 'pending'
  | 'quoted'
  | 'accepted'
  | 'rejected'
  | 'expired';

export type EscrowStatus = 'held' | 'released' | 'refunded';

export type FulfillmentOrderStatus =
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type CheckoutMode = 'quote_prepay' | 'listed';

export type SellerQuote = {
  id: string;
  quote_number: string;
  listing_title: string;
  quantity: number;
  consumer_name: string;
  consumer_email: string;
  message?: string;
  quoted_unit_price_usd?: number;
  quoted_total_usd?: number;
  quote_valid_until?: string;
  status: QuoteStatus;
};

export type FulfillmentOrder = {
  id: string;
  order_number: string;
  listing_title: string;
  quantity: number;
  unit_price_usd: number;
  total_usd: number;
  checkout_mode: CheckoutMode;
  delivery_partner_of_record?: string;
  status: FulfillmentOrderStatus;
  escrow_status: EscrowStatus;
  created_at: string;
  shipping_name: string;
  shipping_address: string;
  shipping_email: string;
  shipping_phone?: string;
  tracking_number?: string;
};

export type RespondForm = {
  quoted_unit_price_usd: string;
  quote_note: string;
  valid_days: number;
};

// ─── Compliance ───────────────────────────────────────────────────────────────

export type DocStatus = 'active' | 'expired' | 'expiring_soon' | 'pending';

export type ComplianceDocument = {
  id: string;
  document_type: string;
  issuing_authority: string;
  issued_date: string;
  expiry_date: string;
  original_filename: string;
  file_url: string;
  status: DocStatus;
};

export type CategoryScore = {
  score: number;
  max: number;
};

export type ComplianceScore = {
  score: number;
  missing: string[];
  category_scores?: Record<string, CategoryScore>;
};

export type ComplianceRequirement = {
  us_import_guide: string[];
};

export type AddDocForm = {
  document_type: string;
  issuing_authority: string;
  issued_date: string;
  expiry_date: string;
  file_url: string;
  original_filename: string;
};

//Withdrawal Accounts

export type AccountCurrency = 'USD' | 'NGN';
export type AccountType = 'checking' | 'savings';
export type ApprovalStatus = 'approved' | 'pending' | 'rejected';

export type WithdrawalAccount = {
  id: string;
  label: string;
  currency: AccountCurrency;
  bank_name: string;
  account_number_masked: string;
  account_name: string;
  account_type?: AccountType;
  routing_number?: string;
  swift_code?: string;
  is_default: boolean;
  approval_status: ApprovalStatus;
};

export type NgnBank = {
  code: string;
  name: string;
};

export type WithdrawalAccountForm = {
  label: string;
  account_name: string;
  is_default: boolean;
  bank_code: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  account_type: AccountType;
  swift_code: string;
};

// Credit

export type CreditApplicationStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'disbursed'
  | 'offered';

export type CreditSales = {
  paid_order_count: number;
  total_volume_usd: number;
  average_order_usd: number;
};

export type CreditTimelineEvent = {
  event: string;
  at: string;
};

export type CreditEligibility = {
  eligible: boolean;
  max_limit_usd: number;
  indicative_apr_percent: number | null;
  indicative_term_months: number | null;
  risk_score: number;
  compliance_score: number;
  reasons_blocked?: string[];
  sales?: CreditSales;
};

export type CreditApplication = {
  id: string;
  application_number: string;
  amount_usd: number;
  offered_amount_usd?: number;
  term_months: number;
  offered_term_months?: number;
  indicative_apr?: number;
  offered_apr?: number;
  status: CreditApplicationStatus;
  created_at: string;
  risk_score?: number;
  purpose?: string;
  decision_note?: string;
  timeline?: CreditTimelineEvent[];
  snapshot_sales?: CreditSales;
};

// Repayments

export type InstallmentStatus = 'paid' | 'pending' | 'overdue' | 'upcoming';

export type Installment = {
  id: string;
  installment_number: number;
  due_date: string;
  principal_usd: number;
  interest_usd: number;
  total_due_usd: number;
  paid_usd: number;
  status: InstallmentStatus;
};

export type NextDue = {
  due_date: string;
  total_due_usd: number;
  paid_usd: number;
};

export type RepaymentApplication = {
  application: {
    id: string;
    application_number: string;
    offered_amount_usd: number;
    offered_term_months: number;
    offered_apr: number;
  };
  outstanding_usd: number;
  next_due: NextDue | null;
  installments: Installment[];
};

export type RepaymentData = {
  total_outstanding_usd: number;
  applications: RepaymentApplication[];
};

// Onboarding

export type RegistrationType = 'business' | 'individual';

export type Business = {
  id: string;
  business_name: string;
  registration_type: RegistrationType;
  country: string;
  sector: string;
  contact_phone: string;
  contact_email: string;
  address: string;
  anchor_customer_id: string;
  anchor_ngn_virtual_account?: string;
  anchor_usd_virtual_account?: string;
  kyc_status: VerificationStatus;
  kyb_status: VerificationStatus;
  cac_number?: string;
  tin?: string;
  bvn?: string;
  nin?: string;
  director_name?: string;
};

export type BusinessForm = {
  business_name: string;
  registration_type: RegistrationType;
  country: string;
  sector: string;
  role: string;
  cac_number: string;
  tin: string;
  bvn: string;
  nin: string;
  ein: string;
  director_name: string;
  contact_phone: string;
  contact_email: string;
  address: string;
};

export type KycForm = {
  bvn: string;
  nin: string;
  cac_number: string;
  tin: string;
  director_name: string;
  docs: string[];
};

export type OnboardingStep = {
  n: number;
  label: string;
  done: boolean;
};

//  Finance / Transactions

export type TransactionType = 'credit' | 'debit' | 'fee';

export type Transaction = {
  id: string;
  timestamp: string;
  type: TransactionType;
  description: string;
  anchor_transaction_ref: string;
  currency: string;
  amount: number;
};

export type FxRate = {
  pair: string;
  rate: number;
  source: string;
  updatedAt: string;
};

// Component Props

export interface BalanceCardProps {
  label: string;
  value: string;
  sub: string;
  va?: AccountDetails;
  accent?: boolean;
}

export interface AccountSectionProps {
  title: string;
  icon: LucideIcon;
  items: WithdrawalAccount[];
  loading: boolean;
  empty: string;
  onDefault: (id: string) => void;
  onRemove: (id: string) => void;
}

export interface AccountSectionCardProps {
  onDefault: (id: string) => void;
  onRemove: (id: string) => void;
  a: WithdrawalAccount;
}

// Categories

export type ProductCategory = {
  id: number;
  name: string;
  description: string;
};

export type ProductCategoryListParams = {
  pageNumber: number;
  pageSize: number;
};

export type ProductCategoryListResponse = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: ProductCategory[];
};

// Product country
export type ProductCountry = {
  id: number;
  name: string;
};

export type ProductCountryListResponse = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: ProductCountry[];
};
export interface FieldProps {
  label?: string;
  children: ReactNode;
  full?: string;
}
