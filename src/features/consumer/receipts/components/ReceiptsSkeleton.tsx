import { Skeleton } from '@/components/ui/skeleton';

export default function ReceiptsSkeleton() {
  return (
    <main>
      {/* Description */}
      <Skeleton className="h-4 w-80 mb-6 bg-[#1E293B]" />

      {/* Table skeleton */}
      <div className="helix-card overflow-x-auto">
        <div className="p-5 space-y-4">
          {/* Table header */}
          <div className="flex gap-4 pb-3 border-b border-[#1A7A6E]/15">
            <Skeleton className="h-3 w-16 bg-[#1E293B]" />
            <Skeleton className="h-3 w-28 bg-[#1E293B]" />
            <Skeleton className="h-3 w-40 bg-[#1E293B]" />
            <Skeleton className="h-3 w-16 ml-auto bg-[#1E293B]" />
            <Skeleton className="h-3 w-20 bg-[#1E293B]" />
            <Skeleton className="h-3 w-24 bg-[#1E293B]" />
          </div>
          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-16 bg-[#1E293B]" />
              <Skeleton className="h-4 w-28 bg-[#1E293B]" />
              <Skeleton className="h-4 w-40 bg-[#1E293B]" />
              <Skeleton className="h-4 w-16 ml-auto bg-[#1E293B]" />
              <Skeleton className="h-5 w-20 rounded-full bg-[#1E293B]" />
              <div className="flex gap-2">
                <Skeleton className="h-7 w-20 rounded bg-[#1E293B]" />
                <Skeleton className="h-7 w-20 rounded bg-[#1E293B]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
