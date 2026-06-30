import { useQuery } from '@tanstack/react-query';
import { getCatalogProducts, CatalogParams } from '../api/catalogApi';

export const useGetCatalogProducts = ({
  pageNumber,
  pageSize,
  category,
  country,
}: CatalogParams) => {
  return useQuery({
    queryKey: ['catalog-products', pageNumber, pageSize, category, country],
    queryFn: () =>
      getCatalogProducts({ pageNumber, pageSize, category, country }),
  });
};
