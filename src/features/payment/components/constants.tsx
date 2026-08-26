interface PaymentProvidersType {
  id: string;
  name: string;
  logo: string;
}

/** Logo lookup keyed by lowercase provider name (the API returns no logo). */
export const PROVIDER_LOGO: Record<string, string> = {
  stripe: '/images/stripe.svg',
  flutterwave: '/images/flutterwave.png',
  paystack: '/images/paystack.svg.webp',
};

export const paymentProviders: PaymentProvidersType[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    logo: PROVIDER_LOGO.stripe,
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    logo: PROVIDER_LOGO.flutterwave,
  },
  {
    id: 'paystack',
    name: 'Paystack',
    logo: PROVIDER_LOGO.paystack,
  },
];
