type ProductMeta = {
  name?: string;
  category?: string;
  country?: string;
};

export const getKicker = (path: string, product?: ProductMeta): string => {
  // 🔥 Dynamic Product Page
  if (path.startsWith('/exporter/products/') && product) {
    return `${product.category} · ${product.country}`;
  }

  switch (path) {
    // Admin
    case '/admin':
      return 'Helix Platform Control';
    case '/admin/verifications':
      return 'KYC / KYB · Admin';
    case '/admin/credit':
      return 'Business Credit · Admin';
    case '/admin/disputes':
      return 'Operations · Mediation';
    case '/admin/catalog':
      return 'Verified African Suppliers';

    // Exporter
    case '/exporter':
      return 'Exporter · Command Center';
    case '/exporter/orders':
      return 'Exporter · Orders';
    case '/exporter/finance':
      return 'Exporter · Finance';
    case '/exporter/compliance':
      return 'Exporter · Compliance';
    case '/exporter/onboarding':
      return 'Exporter · Onboarding';
    case '/exporter/my-products':
      return 'Exporter · Catalog Management';
    case '/exporter/catalog':
      return 'Verified African Suppliers';
    case '/exporter/fulfillment':
      return 'Consumer Orders · Quotes · Escrow';

    // Buyer
    case '/buyer':
      return 'Buyer · Trade Desk';
    case '/buyer/orders':
      return 'Buyer · Orders';
    case '/buyer/finance':
      return 'Buyer · Finance';
    case '/buyer/onboarding':
      return 'Buyer · Onboarding';
    case '/buyer/catalog':
      return 'Buyer · Marketplace';

    default:
      return '';
  }
};

export const getTitle = (path: string, product?: ProductMeta): string => {
  // 🔥 Dynamic Product Page
  if (path.startsWith('/exporter/products/') && product) {
    return product.name || '';
  }

  switch (path) {
    // Admin
    case '/admin':
      return 'Admin · Operations Overview';
    case '/admin/verifications':
      return 'Verification Queue';
    case '/admin/credit':
      return 'JompStart Credit Queue';
    case '/admin/disputes':
      return 'Disputes Queue';
    case '/admin/catalog':
      return 'Marketplace';

    // Exporter
    case '/exporter':
      return 'Welcome back, Callistus';
    case '/exporter/orders':
      return 'Orders';
    case '/exporter/finance':
      return 'Finance & Ledger';
    case '/exporter/compliance':
      return 'Compliance Vault';
    case '/exporter/onboarding':
      return 'Onboarding';
    case '/exporter/catalog':
      return 'Marketplace';
    case '/exporter/my-products':
      return 'My Products';
    case '/exporter/fulfillment':
      return 'Fulfillment Queue';

    // Buyer
    case '/buyer':
      return 'Trade Desk';
    case '/buyer/orders':
      return 'Orders';
    case '/buyer/finance':
      return 'Finance & Ledger';
    case '/buyer/onboarding':
      return 'Onboarding';
    case '/buyer/catalog':
      return 'Marketplace';

    default:
      return '';
  }
};
