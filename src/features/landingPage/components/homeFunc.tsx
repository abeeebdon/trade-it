export const getKicker = (path: string): string => {
  switch (path) {
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
    default:
      return 'Loading';
  }
};

export const getTitle = (path: string): string => {
  switch (path) {
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

    default:
      return 'Loading';
  }
};
