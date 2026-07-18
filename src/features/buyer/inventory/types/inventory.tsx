export interface CreateLocalListingPayload {
  Title: string;
  Category: string;
  RetailPriceUsd: string;
  StockQty: string;
  ShipsFrom: string;
  Description: string;
  LocalListingStatusId: string;
  Photos: File[];
}
export interface EditLocalListingPayload {
  id: number;
  payload: CreateLocalListingPayload;
}

export interface PaginatedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}
