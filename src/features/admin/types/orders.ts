export interface AdminOrder {
  id: number;
  orderNumber: string;
  orderType: string;
  role: string;
  productId: number;
  productName: string;
  category: string;
  quantity: number;
  amount: number;
  deliveryDate: string;
  status: string;
  paymentStatus: string;
  shipTo: string;
  shippingAddress: string;
  email: string;
  phone: string;
  description: string;
}
