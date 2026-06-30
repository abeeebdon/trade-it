'use client';

import { useGetAdminOrders } from '../hooks/useGetAdminOrders';

const AdminOrders = () => {
  const { isPending, data } = useGetAdminOrders();
  console.log(data);
  return <div>AdminOrders</div>;
};

export default AdminOrders;
