export type SellerOrdersParams = {
  pageNumber: number;
  pageSize: number;
};
export interface SellerOrder {
  id: number;
  orderNumber: string;
  productId: number;
  productName: string;
  category: string;
  description: string;
  quantity: number;
  amount: number;
  orderType: string;
  paymentStatus: string;
  status: string;
  role: string;
  email: string;
  phone: string;
  shipTo: string;
  shippingAddress: string;
  deliveryDate: string;
}
