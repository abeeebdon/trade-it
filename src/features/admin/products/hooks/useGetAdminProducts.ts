import { useQuery } from '@tanstack/react-query';
import { getAdminProducts } from '../api/adminProducts';
import { GetAdminProductsParams } from '../types/product';

export const useGetAdminProducts = ({
  pageNumber = 1,
  pageSize = 10,
  search,
}: GetAdminProductsParams) => {
  return useQuery({
    queryKey: ['admin-products', pageNumber, pageSize, search],
    queryFn: () => getAdminProducts({ pageNumber, pageSize, search }),
    staleTime: 60 * 1000,
  });
};
