import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createProduct,
  getProducts,
  getProductById,
  getProductCategories,
  getProductCategoryById,
  getProductCountries,
  editProduct,
} from '../api/productsApi';
import {
  CreateProductPayload,
  ProductListParams,
  ProductCategoryListParams,
  EditProductPayload,
} from '../types/exporter';

export const useGetProducts = ({ pageNumber, pageSize }: ProductListParams) => {
  return useQuery({
    queryKey: ['exporter-products', pageNumber, pageSize],
    queryFn: () => getProducts({ pageNumber, pageSize }),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
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
export const useEditProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: EditProductPayload) =>
      editProduct({ id, payload }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['exporter-products'] });
      toast.success(data ?? 'Product updated successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to save product. Please try again.');
    },
  });
};

//Product Categories hooks

export const useGetProductCategories = ({
  pageNumber,
  pageSize,
}: ProductCategoryListParams) => {
  return useQuery({
    queryKey: ['product-categories', pageNumber, pageSize],
    queryFn: () => getProductCategories({ pageNumber, pageSize }),
  });
};

export const useGetProductCategoryById = (id: number) => {
  return useQuery({
    queryKey: ['product-category', id],
    queryFn: () => getProductCategoryById(id),
    enabled: !!id,
  });
};

export const useGetProductCountries = () => {
  return useQuery({
    queryKey: ['product-countries'],
    queryFn: getProductCountries,
    staleTime: Infinity,
  });
};
