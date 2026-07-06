import { Skeleton } from '@/components/ui/skeleton';

export default function NotificationsSkeleton() {
  return (
    <main>
      <Skeleton className="h-4 w-72 mb-6 bg-[#1E293B]" />
      <div className="space-y-4 max-w-2xl">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="helix-card p-5 space-y-2">
            <Skeleton className="h-5 w-32 bg-[#1E293B]" />
            <Skeleton className="h-3 w-64 bg-[#1E293B]" />
            <div className="flex gap-3 pt-2">
              {Array.from({ length: i < 2 ? 2 : 1 }).map((_, j) => (
                <Skeleton
                  key={j}
                  className="h-8 w-24 rounded-full bg-[#1E293B]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
