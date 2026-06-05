import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createProduct, getProducts } from '../api/productsApi';
import { CreateProductPayload, ProductListParams } from '../types/exporter';

export const useGetProducts = ({ pageNumber, pageSize }: ProductListParams) => {
  return useQuery({
    queryKey: ['exporter-products', pageNumber, pageSize],
    queryFn: () => getProducts({ pageNumber, pageSize }),
  });
};

export const useCreateProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exporter-products'] });
      toast.success('Product created successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to save product. Please try again.');
    },
  });
};
