import OrdersManagementList from '@/features/orderManagement/pages/OrdersManagementList';

export default function RetailerOrdersDemoPage() {
  return (
    <OrdersManagementList
      role="vendor"
      perspective="Retailer / Fulfiller"
      title="Order Management"
      subtitle="Pack and prepare orders placed by your customers for dispatch."
      basePath="/buyer/orders-demo"
    />
  );
}
