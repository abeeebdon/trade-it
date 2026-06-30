import { Skeleton } from '@/components/ui/skeleton';

export default function ProductCardSkeleton() {
  return (
    <div className="helix-card overflow-hidden flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/3] relative">
        <Skeleton className="w-full h-full" />

        {/* badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        {/* export ready */}
        <div className="absolute bottom-3 right-3">
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </div>

      {/* content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* category */}
        <Skeleton className="h-3 w-24 mb-2" />

        {/* title */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-4/5 mb-3" />

        {/* bottom */}
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <Skeleton className="h-6 w-20 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>

          <div className="text-right">
            <Skeleton className="h-3 w-10 mb-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
