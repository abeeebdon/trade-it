export default function OrderTableSkeleton() {
  return (
    <div className="helix-card overflow-hidden animate-pulse">
      <table className="helix-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Payment</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i}>
              <td>
                <div className="h-4 w-16 bg-gray-700 rounded" />
              </td>
              <td>
                <div className="h-4 w-40 bg-gray-700 rounded" />
              </td>
              <td>
                <div className="h-4 w-10 bg-gray-700 rounded" />
              </td>
              <td>
                <div className="h-4 w-20 bg-gray-700 rounded" />
              </td>
              <td>
                <div className="h-4 w-24 bg-gray-700 rounded" />
              </td>
              <td>
                <div className="h-4 w-16 bg-gray-700 rounded" />
              </td>
              <td>
                <div className="h-4 w-16 bg-gray-700 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
