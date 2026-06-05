import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/productDetailApi';

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // don't fire if id is empty
  });
};
