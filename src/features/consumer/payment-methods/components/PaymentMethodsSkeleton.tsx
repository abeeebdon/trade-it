import { Skeleton } from '@/components/ui/skeleton';

export default function PaymentMethodsSkeleton() {
  return (
    <main>
      {/* Description */}
      <Skeleton className="h-4 w-96 mb-6 bg-[#1E293B]" />

      {/* Payment method cards */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="helix-card p-5 flex items-center gap-4">
            <Skeleton className="w-11 h-11 rounded-lg bg-[#1E293B] shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-4 w-40 bg-[#1E293B]" />
              <Skeleton className="h-3 w-32 bg-[#1E293B]" />
            </div>
            <Skeleton className="h-4 w-4 bg-[#1E293B] shrink-0" />
          </div>
        ))}
      </div>
    </main>
  );
}
