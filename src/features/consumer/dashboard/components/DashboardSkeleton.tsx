import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardSkeleton() {
  return (
    <main>
      {/* Context line */}
      <Skeleton className="h-4 w-80 mb-6 bg-[#1E293B]" />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="helix-card p-5">
            <Skeleton className="h-3 w-20 mb-3 bg-[#1E293B]" />
            <div className="flex items-start justify-between">
              <Skeleton className="h-8 w-16 bg-[#1E293B]" />
              <Skeleton className="h-5 w-5 rounded bg-[#1E293B]" />
            </div>
          </div>
        ))}
      </div>

      {/* Active Orders */}
      <section className="mb-10">
        <Skeleton className="h-6 w-36 mb-4 bg-[#1E293B]" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="helix-card p-5">
              <div className="flex items-start gap-3 mb-4">
                <Skeleton className="w-13 h-13 rounded-lg bg-[#1E293B] shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-[#1E293B]" />
                  <Skeleton className="h-3 w-40 bg-[#1E293B]" />
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-5 w-16 ml-auto bg-[#1E293B]" />
                  <Skeleton className="h-5 w-20 ml-auto rounded-full bg-[#1E293B]" />
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
      </section>

      {/* Buy Again */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-24 bg-[#1E293B]" />
          <Skeleton className="h-4 w-36 bg-[#1E293B]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="helix-card p-3 flex flex-col">
              <Skeleton className="aspect-square rounded mb-2 bg-[#1E293B]" />
              <Skeleton className="h-3 w-full mb-1 bg-[#1E293B]" />
              <Skeleton className="h-3 w-2/3 mb-2 bg-[#1E293B]" />
              <Skeleton className="h-4 w-14 mt-2 bg-[#1E293B]" />
              <Skeleton className="h-8 w-full mt-2 rounded bg-[#1E293B]" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
