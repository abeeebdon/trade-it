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
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  deleteProduct,
} from '../api/productsApi';
import {
  CreateProductPayload,
  ProductListParams,
  EditProductPayload,
} from '../types/exporter';
import { router } from 'next/client';
import { useRouter } from 'next/navigation';

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

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exporter-products'] });
      toast.success('Product created successfully');
      router.push('/exporter/my-products');
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

export const useGetProductCategories = () => {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: () => getProductCategories(),
  });
};

export const useGetProductCategoryById = (id: number) => {
  return useQuery({
    queryKey: ['product-category', id],
    queryFn: () => getProductCategoryById(id),
    enabled: !!id,
  });
};

export const useCreateProductCategory = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; description: string }) =>
      createProductCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
      toast.success('Category created successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to create category. Please try again.');
    },
  });
};

export const useUpdateProductCategory = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: { name: string; description: string };
    }) => updateProductCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
      toast.success('Category updated successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to update category. Please try again.');
    },
  });
};

export const useDeleteProductCategory = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProductCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
      toast.success('Category deleted successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to delete category. Please try again.');
    },
  });
};

export const useDeleteProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exporter-products'] });
      queryClient.invalidateQueries({ queryKey: ['product-detail'] });
      toast.success('Product deleted successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to delete product. Please try again.');
    },
  });
};

export const useGetProductCountries = () => {
  return useQuery({
    queryKey: ['product-countries'],
    queryFn: getProductCountries,
    staleTime: Infinity,
  });
};
