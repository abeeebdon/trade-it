export type PaymentKind = 'card' | 'zelle' | 'ach';

export interface PaymentMethod {
  id: string;
  kind: PaymentKind;
  label: string;
  is_default?: boolean;
  exp_month?: string;
  exp_year?: string;
}

export interface PaymentMethodForm {
  card_number?: string;
  exp_month?: string;
  exp_year?: string;
  zelle_target?: string;
  bank_name?: string;
  routing_number?: string;
  account_number?: string;
  is_default?: boolean;
}
