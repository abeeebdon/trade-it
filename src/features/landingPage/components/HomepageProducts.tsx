import { ListingCardSkeleton } from '@/features/shops/components/ListingCardSkeleton';
import { useGetLandingProductsInfinite } from '../hooks/useGetLandingProductsInfinite';
import { useMemo, useEffect, useRef, useCallback } from 'react';
import ListingCard from '@/features/shops/components/ListingCard';
import PressableBtn from '@/components/buttons/PressableBtn';
interface HomepageProductsProps {
  debouncedSearch: string;
  category: string;
  showCategoryGrid: boolean;
}
const HomepageProducts = ({
  debouncedSearch,
  category,
  showCategoryGrid,
}: HomepageProductsProps) => {
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLandingProductsInfinite({
    pageSize: 10,
    search: debouncedSearch,
    category: category,
  });

  // Flatten all pages into a single array
  const allProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // Intersection observer sentinel for infinite scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '200px',
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect]);

  // Total count from the first page
  const totalRecords = data?.pages[0]?.totalRecords ?? 0;
  return (
    <section>
      <h2 className="text-lg font-semibold mb-5">
        {showCategoryGrid ? 'Featured today' : `${totalRecords} products`}
      </h2>
      {isPending ? (
        <article className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </article>
      ) : isError ? (
        <div>
          <p>There is an error fetching the products </p>
          <PressableBtn
            title="Retry"
            handleClick={refetch}
            className="helix-btn-primary"
          />
        </div>
      ) : (
        <>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allProducts.length === 0 && (
              <div className="col-span-full text-center text-[#9CA3AF] py-16">
                No listings match your filters.
              </div>
            )}
            {allProducts.map((product) => (
              <ListingCard key={product.id} l={product} />
            ))}
          </div>

          {/* Infinite scroll sentinel & loading indicator */}
          <div ref={sentinelRef} className="flex justify-center py-8">
            {isFetchingNextPage && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                {[...Array(4)].map((_, i) => (
                  <ListingCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            )}
            {!hasNextPage && allProducts.length > 0 && (
              <p className="text-[#9CA3AF] text-sm">
                You&apos;ve reached the end
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default HomepageProducts;
