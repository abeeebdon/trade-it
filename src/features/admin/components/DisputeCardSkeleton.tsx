const DisputeCardSkeleton = () => {
  return (
    <div className="helix-card p-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div className="flex-1">
          {/* Title */}
          <div className="h-4 w-40 bg-border-soft rounded mb-2" />

          {/* Order + date */}
          <div className="h-3 w-56 bg-border-soft rounded mb-3" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-border-soft rounded" />
            <div className="h-3 w-[90%] bg-border-soft rounded" />
            <div className="h-3 w-[70%] bg-border-soft rounded" />
          </div>
        </div>

        {/* Status pill */}
        <div className="h-6 w-20 bg-border-soft rounded-full" />
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {/* Input */}
        <div className="h-10 flex-1 min-w-50 bg-border-soft rounded" />

        {/* Buttons */}
        <div className="h-10 w-32 bg-border-soft rounded" />
        <div className="h-10 w-24 bg-border-soft rounded" />
      </div>
    </div>
  );
};

export default DisputeCardSkeleton;
