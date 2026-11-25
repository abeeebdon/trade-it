import { Skeleton } from '@/components/ui/skeleton';

export function AdminProductRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-border/50">
      <td className="px-3.5 py-3">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-9 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-40 rounded" />
            <Skeleton className="h-2.5 w-24 rounded" />
          </div>
        </div>
      </td>
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-3.5 py-3">
          <Skeleton className="h-3 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

export function AdminProductCardSkeleton() {
  return (
    <div className="helix-card p-4 animate-pulse">
      <div className="flex gap-3">
        <Skeleton className="size-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
          <div className="flex justify-between pt-2">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminProductsToolbarSkeleton() {
  return (
    <div className="helix-card p-4 animate-pulse">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}
