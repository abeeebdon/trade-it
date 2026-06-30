export interface Product {
  id: number;
  productName: string;
  description: string;
  category: string;
  amountInUsd: number;
  amountInNGN: number;
  moq: number;
  exportStatus: string;
  thumbnailImage: string;
}

export interface MarketPlaceProducts {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: Product[];
}
export interface MarketPlaceCardProps {
  p: Product;
}
export interface GetMarketPlaceProductsParams {
  category?: string;
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}
