'use client';

import { Skeleton } from '@/components/ui/skeleton';

const ROWS = 5;

const InventoryTableSkeleton = () => {
  return (
    <div className="helix-card overflow-hidden">
      <table className="helix-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Mode</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROWS }).map((_, i) => (
            <tr key={i}>
              <td>
                <Skeleton className="w-14 h-14 rounded" />
              </td>
              <td>
                <Skeleton className="h-4 w-32" />
              </td>
              <td>
                <Skeleton className="h-4 w-20" />
              </td>
              <td>
                <Skeleton className="h-4 w-16" />
              </td>
              <td>
                <Skeleton className="h-4 w-12" />
              </td>
              <td>
                <Skeleton className="h-5 w-24 rounded-full" />
              </td>
              <td>
                <Skeleton className="h-5 w-20 rounded-full" />
              </td>
              <td>
                <Skeleton className="h-4 w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTableSkeleton;
