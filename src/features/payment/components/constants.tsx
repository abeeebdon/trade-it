interface PaymentProvidersType {
  id: string;
  name: string;
  logo: string;
}
export const paymentProviders: PaymentProvidersType[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '/images/stripe.svg',
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    logo: '/images/flutterwave.png',
  },
  {
    id: 'paystack',
    name: 'Paystack',
    logo: '/images/paystack.svg.webp',
  },
];
