import { Package } from 'lucide-react';

export function ListingsEmpty() {
  return (
    <div className="helix-card p-12 text-center text-[#9CA3AF]">
      <Package size={48} className="mx-auto mb-4 opacity-40" />
      <p className="text-lg font-medium text-[#F5F5F5]">No listings found</p>
      <p className="mt-1 text-sm">
        Listings will appear here once sellers publish products.
      </p>
    </div>
  );
}
