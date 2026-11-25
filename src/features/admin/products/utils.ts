import { STATUSES } from '@/lib/constants';
import { AdminProduct } from './types/product';

export const productStatusLabel = (statusId?: number | null) => {
  const status = STATUSES.find((s) => s.id === statusId);
  return status?.label ?? 'Draft';
};

/** Fallback client-side search so the page still filters if the API ignores `search`. */
export const matchesSearch = (product: AdminProduct, search: string) => {
  const term = search.trim().toLowerCase();
  if (!term) return true;

  return [product.productName, product.category, product.sourceType]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(term));
};
