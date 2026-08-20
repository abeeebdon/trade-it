import OrdersManagementList from '@/features/orderManagement/pages/OrdersManagementList';

export default function AdminOrdersDemoPage() {
  return (
    <OrdersManagementList
      role="admin"
      perspective="Platform admin"
      title="Order Management"
      subtitle="Oversee the full pipeline — ship, dispatch and deliver every order."
      basePath="/admin/orders-demo"
    />
  );
}
