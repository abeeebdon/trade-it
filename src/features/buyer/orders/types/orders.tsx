export interface QuoteRequestType {
  buyerId: number | string;
  sellerId: number;
  productName: string;
  buyerName: string;
  buyerEmail: string;
  quantity: number;
  message: string;
}
