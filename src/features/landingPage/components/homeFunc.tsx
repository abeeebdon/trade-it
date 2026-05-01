export const getKicker = (path: string): string => {
  switch (path) {
    case '/admin':
      return 'Helix Platform Control';
    case '/admin/verifications':
      return 'KYC / KYB · Admin';
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

    default:
      return 'Loading';
  }
};
