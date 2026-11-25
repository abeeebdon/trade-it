export interface AdminProductImage {
  id: number;
  imageUrl: string;
}

export interface AdminProductVariantOption {
  id: number;
  optionName: string;
  optionValue: string;
}

export interface AdminProductVariant {
  id: number;
  sku: string;
  price: number;
  quantity: number;
  shopifyVariantId: number | null;
  options: AdminProductVariantOption[];
}

export interface AdminProduct {
  id: number;
  sellerId: number;
  productName: string;
  thumbnailImage: string;
  category: string;
  unit: number;
  priceUsd: number;
  moq: number;
  description: string;
  currencyId: number;
  statusId: number;
  sourceType: string;
  images: AdminProductImage[];
  variants: AdminProductVariant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminProductsResponse {
  data: AdminProduct[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface GetAdminProductsParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}
