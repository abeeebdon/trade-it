import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <main>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Avatar skeleton */}
        <div className="helix-card p-6 text-center flex flex-col items-center gap-3">
          <Skeleton className="w-20 h-20 rounded-full bg-[#1E293B]" />
          <Skeleton className="h-6 w-36 bg-[#1E293B]" />
          <Skeleton className="h-3 w-28 bg-[#1E293B]" />
          <div className="mt-4 pt-4 border-t border-[#1A7A6E]/15 w-full flex justify-center">
            <Skeleton className="h-3 w-40 bg-[#1E293B]" />
          </div>
        </div>

        {/* Form skeleton */}
        <div className="md:col-span-2 helix-card p-6 space-y-4">
          <Skeleton className="h-6 w-44 bg-[#1E293B]" />
          <div className="space-y-3">
            <Skeleton className="h-3 w-20 bg-[#1E293B]" />
            <Skeleton className="h-10 w-full bg-[#1E293B]" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-12 bg-[#1E293B]" />
            <Skeleton className="h-10 w-full bg-[#1E293B]" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-14 bg-[#1E293B]" />
            <Skeleton className="h-10 w-full bg-[#1E293B]" />
          </div>
          <Skeleton className="h-10 w-32 bg-[#1E293B]" />
        </div>
      </div>
    </main>
  );
}
