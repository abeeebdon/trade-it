'use client';

import { Pencil, Trash2 } from 'lucide-react';

import type { TrackingId, TrackingStatus } from '../types/trackingId';
import { TRACKING_STATUS_STYLES, TRACKING_STATUSES } from '../constants';

interface TrackingIdTableProps {
  items: TrackingId[];
  onEdit: (item: TrackingId) => void;
  onDelete: (item: TrackingId) => void;
  onStatusChange: (item: TrackingId, status: TrackingStatus) => void;
}

const TrackingIdTable = ({
  items,
  onEdit,
  onDelete,
  onStatusChange,
}: TrackingIdTableProps) => {
  return (
    <div className="helix-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="helix-table w-full min-w-160">
          <thead>
            <tr>
              <th>Order number</th>
              <th>Tracking number</th>
              <th>Status</th>
              <th>Created</th>
              <th className="w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const statusLabel =
                TRACKING_STATUSES.find((status) => status.value === item.status)
                  ?.label ?? item.status;

              return (
                <tr key={item.id}>
                  <td className="font-mono text-(--helix-gold)">
                    {item.orderNumber}
                  </td>
                  <td className="font-mono text-sm">{item.trackingNumber}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                          TRACKING_STATUS_STYLES[item.status]
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm text-(--helix-text-dim)">
                    {item.createdAt}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="rounded p-1.5 text-(--helix-text-dim) hover:bg-(--helix-hover) hover:text-(--helix-text) transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="rounded p-1.5 text-(--helix-text-dim) hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                      <select
                        value={item.status}
                        onChange={(e) =>
                          onStatusChange(item, e.target.value as TrackingStatus)
                        }
                        title="Update status"
                        aria-label={`Update status for ${item.orderNumber}`}
                        className="cursor-pointer rounded border border-(--helix-border) bg-(--helix-surface) px-1.5 py-1 text-[11px] text-(--helix-text) transition-colors hover:border-(--helix-gold)"
                      >
                        {TRACKING_STATUSES.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackingIdTable;
