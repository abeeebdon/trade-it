export interface ProductResponseType {
  id: number;
  productName: string;
  category: string;
  currencyId: number;
  description: string;
  images: string[];
  moq: number;
  amountInUsd: number;
  amountInNaira: number;
  priceUsd: number;
  statusId: number;
  thumbnailImage: string;
  unit: number;
}
