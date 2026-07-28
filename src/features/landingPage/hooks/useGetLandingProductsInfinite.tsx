import { useInfiniteQuery } from '@tanstack/react-query';
import { getLandingPageProducts } from '../api/getProducts';
import { LandingPageParams } from '../types/home';

export const useGetLandingProductsInfinite = ({
  pageSize = 10,
  category,
  search,
}: Omit<LandingPageParams, 'pageNumber'>) => {
  return useInfiniteQuery({
    queryKey: ['get-landing-products-infinite', pageSize, category, search],
    queryFn: ({ pageParam }) =>
      getLandingPageProducts({
        pageNumber: pageParam as number,
        pageSize,
        search,
        category,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber < lastPage.totalPages) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
  });
};
