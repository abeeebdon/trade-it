export const formatUSD = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(n || 0);
export const formatDateTime = (iso: Date | string) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return String(iso);
  }
};

export const formatDateToMM = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB');
};

/** Keeps only the last 10 characters of a value (e.g. a long order number). */
export const sliceLastTen = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return '';
  return String(value).slice(-10);
};

export const formatNGN = (n: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(n || 0);
