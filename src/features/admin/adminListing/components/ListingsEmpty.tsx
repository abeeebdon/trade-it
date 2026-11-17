import { Package } from 'lucide-react';

export function ListingsEmpty() {
  return (
    <div className="helix-card p-12 text-center text-muted">
      <Package size={48} className="mx-auto mb-4 opacity-40" />
      <p className="text-lg font-medium text-text">No listings found</p>
      <p className="mt-1 text-sm">
        Listings will appear here once sellers publish products.
      </p>
    </div>
  );
}
