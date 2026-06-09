const RoleCardSkeleton = () => {
  return (
    <div className="helix-card p-6 animate-pulse">
      {/* top row (icon + check) */}
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-md bg-gray-300/40" />
        <div className="w-4 h-4 rounded-full bg-gray-300/40" />
      </div>

      {/* title + sub */}
      <div className="mt-5 space-y-2">
        <div className="h-2 w-32 bg-gray-300/40 rounded" />
        <div className="h-3 w-48 bg-gray-300/30 rounded" />
      </div>

      {/* blurb */}
      <div className="my-5 space-y-2">
        <div className="h-3 w-full bg-gray-300/30 rounded" />
        <div className="h-3 w-5/6 bg-gray-300/30 rounded" />
      </div>

      {/* pill */}
      <div className="mt-5">
        <div className="h-6 w-28 bg-gray-300/40 rounded-full" />
      </div>
    </div>
  );
};

export default RoleCardSkeleton;
