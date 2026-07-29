import { Skeleton } from '@/components/ui/skeleton';

const HelpLoading = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="helix-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpLoading;
