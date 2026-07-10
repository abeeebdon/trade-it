import { Skeleton } from '@/components/ui/skeleton';

export function OrderRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-[#1A7A6E]/10">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="helix-card p-4 animate-pulse space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-36 rounded" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-24 rounded" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-32 rounded" />
    </div>
  );
}
