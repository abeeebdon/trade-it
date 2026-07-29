export type PaymentKind = 'card' | 'zelle' | 'ach';

/** Maps API `type` number to PaymentKind string. */
export const TYPE_TO_KIND: Record<number, PaymentKind> = {
  1: 'card',
  2: 'zelle',
  3: 'ach',
};

/** Maps PaymentKind string to API `type` number. */
export const KIND_TO_TYPE: Record<PaymentKind, number> = {
  card: 1,
  zelle: 2,
  ach: 3,
};

/** Shape returned by GET /payment-methods */
export interface PaymentMethod {
  id: number;
  type: number;
  provider: string | null;
  displayName: string;
  lastFourDigits: string | null;
  expiryMonth: string | null;
  expiryYear: string | null;
  isDefault: boolean;
  zelleEmail: string | null;
  bankName: string | null;
  accountNumber: string | null;
  createdAt: string;
}

/** Derived convenience: resolved string kind */
export type PaymentMethodResolved = PaymentMethod & {
  kind: PaymentKind;
  label: string;
};

/** Resolve API PaymentMethod into a UI-friendly shape. */
export function resolvePaymentMethod(pm: PaymentMethod): PaymentMethodResolved {
  const kind = TYPE_TO_KIND[pm.type] ?? 'card';
  const label =
    kind === 'card'
      ? `Card ···· ${pm.lastFourDigits ?? '****'}`
      : kind === 'zelle'
        ? (pm.zelleEmail ?? pm.displayName)
        : `${pm.bankName ?? 'Bank'} ···· ${pm.accountNumber?.slice(-4) ?? '****'}`;
  return { ...pm, kind, label };
}

export type PaymentMethodForm = PaymentMethod;
