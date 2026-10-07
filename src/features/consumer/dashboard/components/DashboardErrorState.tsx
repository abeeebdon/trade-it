import { RefreshCw } from 'lucide-react';

interface DashboardErrorStateProps {
  onRetry: () => void;
}

export default function DashboardErrorState({
  onRetry,
}: DashboardErrorStateProps) {
  return (
    <main className="helix-card p-10 text-center">
      <p className="text-[14px] text-[#9CA3AF] mb-4">
        We couldn&apos;t load your dashboard. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="helix-btn-primary text-[12px]"
        data-testid="cs-retry"
      >
        <RefreshCw size={14} className="inline mr-1" />
        Retry
      </button>
    </main>
  );
}
