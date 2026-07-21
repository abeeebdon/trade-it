export interface AdminListing {
  id: number;
  userId: number;
  sellerEmail: string;
  title: string;
  category: string;
  retailPriceUsd: number;
  stockQty: number;
  status: string;
  createdAt: string;
}

export interface ModerateListingPayload {
  status: string;
  notes: string;
}
