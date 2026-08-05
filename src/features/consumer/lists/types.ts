export interface ShoppingListItem {
  id: string;
  productId?: string;
  productName?: string;
  quantity: number;
  thumbnailImage?: string;
  price?: number;
}

export interface ShoppingList {
  id: string;
  name: string;
  itemCount: number;
  preview?: {
    id: string;
    photos?: string[];
  }[];
  items?: ShoppingListItem[];
}

export interface AddShoppingListItemPayload {
  productId: string;
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
