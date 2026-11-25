import { Package, AlertTriangle } from 'lucide-react';

export function AdminProductsEmpty() {
  return (
    <div className="helix-card p-12 text-center text-muted">
      <Package size={48} className="mx-auto mb-4 opacity-40" />
      <p className="text-lg font-medium text-text">No products found</p>
      <p className="mt-1 text-sm">
        Products will appear here once sellers create them.
      </p>
    </div>
  );
}

export function AdminProductsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="helix-card p-12 text-center text-muted">
      <AlertTriangle size={48} className="mx-auto mb-4 text-danger/60" />
      <p className="text-lg font-medium text-text">Failed to load products</p>
      <p className="mt-1 text-sm">Something went wrong. Please try again.</p>
      <button
        type="button"
        onClick={onRetry}
        className="helix-btn-primary mt-6 inline-flex items-center gap-2"
      >
        Retry
      </button>
    </div>
  );
}
