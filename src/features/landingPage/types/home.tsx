export interface Product {
  id: number;
  productName: string;
  thumbnailImage: string;
  category: string;
  unit: number;
  priceUsd: number;
  description: string;
  createdAt: string;
}

export interface ProductsResponse {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: Product[];
}
