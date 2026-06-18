import { ListingsParams } from '@/features/exporter/sell/types/sellType';
import { useQuery } from '@tanstack/react-query';
import { getLandingPageProducts } from '../api/getProducts';

export const useGetLandingProducts = ({
  pageNumber,
  pageSize,
}: ListingsParams) => {
  return useQuery({
    queryKey: ['get-landing-products', pageNumber, pageSize],
    queryFn: () => getLandingPageProducts({ pageNumber, pageSize }),
  });
};
