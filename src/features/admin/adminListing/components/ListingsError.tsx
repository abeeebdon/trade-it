'use client';

import { AlertTriangle } from 'lucide-react';

export function ListingsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="helix-card p-12 text-center text-[#9CA3AF]">
      <AlertTriangle size={48} className="mx-auto mb-4 text-[#EF4444]/60" />
      <p className="text-lg font-medium text-[#F5F5F5]">
        Failed to load listings
      </p>
      <p className="mt-1 text-sm">Something went wrong. Please try again.</p>
      <button
        onClick={onRetry}
        className="helix-btn-primary mt-6 inline-flex items-center gap-2"
      >
        Retry
      </button>
    </div>
  );
}
