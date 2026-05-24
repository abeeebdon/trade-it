import { Skeleton } from '@/components/ui/skeleton';

const BankAccountSkeleton = () => {
  return (
    <article className="border border-secondary/25 rounded p-4 flex items-start justify-between gap-3 bg-bg/40">
      {/* Left content */}
      <div className="min-w-0 flex-1">
        {/* Title + badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-4 w-32 rounded opacity-5" />

          <Skeleton className="h-5 w-16 rounded-full opacity-5" />

          <Skeleton className="h-4 w-20 rounded-full opacity-5" />
        </div>

        {/* Bank name */}
        <Skeleton className="h-3 w-28 opacity-5 mt-3 rounded" />

        {/* Account details */}
        <Skeleton className="h-3 w-52 opacity-5 mt-2 rounded" />

        {/* Holder */}
        <Skeleton className="h-3 w-40 opacity-5 mt-2 rounded" />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 shrink-0">
        <Skeleton className="h-2 w-5 opacity-5 rounded" />
        <Skeleton className="h-2 opacity-5 w-5 rounded" />
      </div>
    </article>
  );
};

export default BankAccountSkeleton;
