import { Skeleton } from '@/components/ui/skeleton';

export default function ListsSkeleton() {
  return (
    <main>
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="helix-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-2">
                <Skeleton className="h-5 w-36 bg-[#1E293B]" />
                <Skeleton className="h-3 w-16 bg-[#1E293B]" />
              </div>
              <Skeleton className="h-4 w-4 bg-[#1E293B]" />
            </div>
            <div className="flex gap-2 mb-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="w-12 h-12 rounded bg-[#1E293B]" />
              ))}
            </div>
            <Skeleton className="h-8 w-full bg-[#1E293B]" />
          </div>
        ))}
      </div>
    </main>
  );
}
