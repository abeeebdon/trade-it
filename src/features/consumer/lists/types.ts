export interface ShoppingListItem {
  id: string;
  listingId?: string;
  listingName?: string;
  quantity: number;
  photo?: string;
  price?: number;
}

export interface ShoppingList {
  id: string;
  name: string;
  item_count: number;
  preview?: {
    id: string;
    photos?: string[];
  }[];
  items?: ShoppingListItem[];
}

export interface AddShoppingListItemPayload {
  listingId: string;
  quantity?: number;
}

export interface ShoppingListApiResponse {
  data: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: ShoppingList[];
  };
}

export interface SingleShoppingListApiResponse {
  data: ShoppingList;
}
