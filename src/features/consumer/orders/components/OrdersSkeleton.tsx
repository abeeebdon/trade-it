import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersSkeleton() {
  return (
    <main>
      {/* Filter chips skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full bg-[#1E293B]" />
        ))}
      </div>

      {/* Summary bar skeleton */}
      <div className="helix-card p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-4 w-48 bg-[#1E293B]" />
          <Skeleton className="h-4 w-px bg-[#1A7A6E]/30" />
          <Skeleton className="h-4 w-40 bg-[#1E293B]" />
        </div>
      </div>

      {/* Order cards skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="helix-card p-5">
            {/* Top row */}
            <div className="flex items-start gap-3 mb-4">
              <Skeleton className="w-14 h-14 rounded-lg bg-[#1E293B] shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-4 w-3/4 bg-[#1E293B]" />
                <Skeleton className="h-3 w-52 bg-[#1E293B]" />
              </div>
              <div className="text-right space-y-2 shrink-0">
                <Skeleton className="h-5 w-16 ml-auto bg-[#1E293B]" />
                <Skeleton className="h-5 w-20 ml-auto rounded-full bg-[#1E293B]" />
              </div>
            </div>

            {/* Breakdown skeleton */}
            <div className="rounded-md border border-[#1A7A6E]/15 bg-[#0A1628]/25 p-3 mb-4 space-y-2">
              <Skeleton className="h-3 w-28 bg-[#1E293B]" />
              <Skeleton className="h-4 w-full bg-[#1E293B]" />
              <Skeleton className="h-3 w-3/4 bg-[#1E293B]" />
              <div className="pt-2 mt-1 border-t border-[#1A7A6E]/15">
                <Skeleton className="h-4 w-32 bg-[#1E293B]" />
              </div>
            </div>

            {/* Journey skeleton */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={j}
                  className="flex items-center gap-1 flex-1 last:flex-none"
                >
                  <div className="flex flex-col items-center flex-1 gap-1">
                    <Skeleton className="w-3 h-3 rounded-full bg-[#1E293B]" />
                    <Skeleton className="h-2 w-10 bg-[#1E293B]" />
                  </div>
                  {j < 4 && (
                    <Skeleton className="h-px flex-1 min-w-3 -mt-3 bg-[#1E293B]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
