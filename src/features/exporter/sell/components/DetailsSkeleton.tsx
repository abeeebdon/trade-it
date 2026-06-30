const DTCProductDetailsSkeleton = () => {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-2xl shadow-sm">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="p-6">
            <div className="aspect-square animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />

            <div className="mt-4 flex gap-3 overflow-x-auto">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 shrink-0 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />

                <div className="mt-4 h-10 w-72 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                <div className="mt-3 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="flex gap-2">
                <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>

            {/* Price & Stock */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="mt-3 h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </div>

            {/* Metadata */}
            <div className="mt-8 space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />

                  <div className="flex-1">
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="mt-2 h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-8">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

              <div className="mt-4 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DTCProductDetailsSkeleton;
