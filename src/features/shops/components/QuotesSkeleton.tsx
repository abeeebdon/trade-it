import { Skeleton } from '@/components/ui/skeleton';

export function QuotesSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="helix-card p-5">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex-1 min-w-40">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-3 w-32 mt-2" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="mt-4 pt-3 border-t border-[#1A7A6E]/15 space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
