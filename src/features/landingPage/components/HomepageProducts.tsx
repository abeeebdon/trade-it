import { ListingCardSkeleton } from '@/features/shops/components/ListingCardSkeleton';
import { useGetLandingProducts } from '../hooks/useGetLandingPageProducts';
import { ProductsResponse } from '../types/home';
import { useMemo } from 'react';
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
  const { data, isPending, refetch, isError } = useGetLandingProducts({
    pageNumber: 1,
    pageSize: 10,
    search: debouncedSearch,
    category: category,
  });

  const fetchProducts: ProductsResponse = useMemo(() => {
    return data ? data : ({} as ProductsResponse);
  }, [data]);
  return (
    <section>
      <h2 className="text-lg font-semibold mb-5">
        {showCategoryGrid
          ? 'Featured today'
          : `${fetchProducts?.data?.length ?? 0} products`}
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
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {fetchProducts?.data?.length === 0 && (
            <div className="col-span-full text-center text-[#9CA3AF] py-16">
              No listings match your filters.
            </div>
          )}
          {fetchProducts?.data?.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomepageProducts;
