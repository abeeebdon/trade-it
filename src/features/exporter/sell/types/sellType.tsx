export type ListingsParams = {
  pageNumber: number;
  pageSize: number;
};
export type ProductPhoto = {
  id: number;
  imageUrl: string;
};

export type ProductListingTypes = {
  id: number;
  photo: string;
  title: string;
  category: string;
  retailPriceUsd: number;
  stockQty: number;
  shipsFrom: string;
  description: string;
  productStatusId: number;
  status: string;
  mode: string;
  deliveryPartnerOfRecord: string;
  photos: ProductPhoto[];
};
export type ListingsPageData = {
  title: string;
  sectionTitle: string;
  deliveryPartnerOfRecord: string;
  notice: string;
  totalListings: number;
  activeListings: number;
  outOfStockListings: number;
  listings: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: ProductListingTypes[];
  };
};
export interface ListingFormCardProps {
  l: ProductListingTypes;
  handleEdit: () => void;
}
export interface MobileListingCardProps {
  l: ProductListingTypes;
}
