export interface ShoppingList {
  id: string;
  name: string;
  item_count: number;
  preview?: {
    id: string;
    photos?: string[];
  }[];
}
