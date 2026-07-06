import { Skeleton } from '@/components/ui/skeleton';

export default function FavouritesSkeleton() {
  return (
    <main>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="helix-card overflow-hidden flex flex-col">
            <Skeleton className="aspect-4/3 bg-[#1E293B]" />
            <div className="p-3 flex-1 flex flex-col space-y-2">
              <Skeleton className="h-4 w-full bg-[#1E293B]" />
              <Skeleton className="h-3 w-2/3 bg-[#1E293B]" />
              <Skeleton className="h-3 w-20 bg-[#1E293B] mt-1" />
              <Skeleton className="h-4 w-14 mt-auto pt-3 bg-[#1E293B]" />
              <Skeleton className="h-8 w-full mt-2 bg-[#1E293B]" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
