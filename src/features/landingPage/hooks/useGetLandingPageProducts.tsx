import { useQuery } from '@tanstack/react-query';
import { getLandingPageProducts } from '../api/getProducts';
import { LandingPageParams } from '../types/home';

export const useGetLandingProducts = ({
  pageNumber,
  pageSize,
  category,
  search,
}: LandingPageParams) => {
  return useQuery({
    queryKey: ['get-landing-products', pageNumber, pageSize, category, search],
    queryFn: () =>
      getLandingPageProducts({ pageNumber, pageSize, search, category }),
  });
};
