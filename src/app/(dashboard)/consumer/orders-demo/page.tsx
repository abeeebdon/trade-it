import OrdersManagementList from '@/features/orderManagement/pages/OrdersManagementList';

export default function ConsumerOrdersDemoPage() {
  return (
    <OrdersManagementList
      role="consumer"
      perspective="Buyer"
      title="Order Management"
      subtitle="Track your purchases and confirm delivery once your order arrives."
      basePath="/consumer/orders-demo"
    />
  );
}
