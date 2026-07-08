import { Skeleton } from '@/components/ui/skeleton';

export default function AddressesSkeleton() {
  return (
    <main>
      <Skeleton className="h-4 w-80 mb-6 bg-[#1E293B]" />
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="helix-card p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Skeleton className="h-5 w-24 bg-[#1E293B]" />
                <Skeleton className="h-3 w-28 bg-[#1E293B]" />
              </div>
              <Skeleton className="h-4 w-4 bg-[#1E293B]" />
            </div>
            <Skeleton className="h-4 w-full bg-[#1E293B]" />
            <Skeleton className="h-4 w-3/4 bg-[#1E293B]" />
            <Skeleton className="h-4 w-1/2 bg-[#1E293B]" />
          </div>
        ))}
      </div>
    </main>
  );
}
