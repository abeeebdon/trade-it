import OrdersManagementList from '@/features/orderManagement/pages/OrdersManagementList';

export default function ExporterOrdersDemoPage() {
  return (
    <OrdersManagementList
      role="vendor"
      perspective="Exporter / Fulfiller"
      title="Order Management"
      subtitle="Pack and hand off confirmed export orders to the platform for shipping."
      basePath="/exporter/orders-demo"
    />
  );
}
