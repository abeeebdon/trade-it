import { Skeleton } from '@/components/ui/skeleton';

export function OrdersSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="helix-card p-5">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex-1 min-w-40">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-5 w-56 mt-2" />
              <Skeleton className="h-3 w-32 mt-2" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1A7A6E]/15 space-y-2">
            <Skeleton className="h-3 w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersSkeleton;
