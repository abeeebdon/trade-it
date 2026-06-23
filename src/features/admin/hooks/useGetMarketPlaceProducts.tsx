import { useQuery } from '@tanstack/react-query';
import { getMarketPlaceProducts } from '../api/marketplace';
import { GetMarketPlaceProductsParams } from '../types/catalog';

export const useGetMarketPlaceProd = ({
  pageNumber,
  pageSize,
  search,
  category,
}: GetMarketPlaceProductsParams) => {
  return useQuery({
    queryKey: ['marketplace-products', pageNumber, pageSize, category, search],
    queryFn: () =>
      getMarketPlaceProducts({ pageNumber, pageSize, search, category }),
  });
};
