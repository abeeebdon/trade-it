import { Skeleton } from '@/components/ui/skeleton';

export function ListingCardSkeleton() {
  return (
    <div className="border   space-y-2 pb-4 helix-card group overflow-hidden flex flex-col">
      <Skeleton className="h-50  w-full dark:bg-gray-600 bg-gray-300 " />
      <div className="px-4 min-h-30 flex flex-col justify-between pt-6">
        <Skeleton className="h-4 w-full dark:bg-bg bg-muted rounded  " />
        <Skeleton className="h-4 w-2/3 my-2 dark:bg-bg bg-muted rounded" />

        <div className="flex justify-between pt-4">
          <Skeleton className="h-5 w-16 rounded dark:bg-bg bg-muted" />
          <Skeleton className="h-3 w-12 rounded dark:bg-bg bg-muted" />
        </div>
      </div>
    </div>
  );
}
