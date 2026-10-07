'use client';

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import SelectField from '@/components/form/SelectField';
import PressableBtn from '@/components/buttons/PressableBtn';
import WarningModal from '@/components/modals/WarningModal';
import { Skeleton } from '@/components/ui/skeleton';
import TrackingIdModal from '../components/TrackingIdModal';
import TrackingIdTable from '../components/TrackingIdTable';
import { TRACKING_STATUSES } from '../constants';
import {
  useCreateTrackingId,
  useDeleteTrackingId,
  useGetTrackingIds,
  useUpdateTrackingId,
} from '../hooks/useTrackingIds';
import type {
  TrackingId,
  TrackingIdFormValues,
  TrackingStatus,
} from '../types/trackingId';

const TrackingIdPage = () => {
  const { data, isLoading } = useGetTrackingIds();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TrackingId | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TrackingId | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const createMutation = useCreateTrackingId(closeModal);
  const updateMutation = useUpdateTrackingId(closeModal);
  const deleteMutation = useDeleteTrackingId(() => setDeleteTarget(null));

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const openCreateModal = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (item: TrackingId) => {
    setEditing(item);
    setModalOpen(true);
  };

  const handleSubmit = (values: TrackingIdFormValues) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleStatusChange = (item: TrackingId, status: TrackingStatus) => {
    if (status === item.status) return;

    updateMutation.mutate({
      id: item.id,
      values: {
        orderNumber: item.orderNumber,
        trackingNumber: item.trackingNumber,
        status,
      },
    });
  };

  const items: TrackingId[] = useMemo(() => data ?? [], [data]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesStatus =
        statusFilter === 'all' || item.status === statusFilter;

      const matchesSearch =
        !query ||
        item.orderNumber.toLowerCase().includes(query) ||
        item.trackingNumber.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [items, search, statusFilter]);

  return (
    <main className="min-h-[70vh]">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="helix-h2">Tracking IDs</h2>
          <p className="text-sm text-(--helix-text-dim)">
            Map order numbers to shipment tracking numbers
          </p>
        </div>
        <PressableBtn
          title="Add Tracking ID"
          leftComponent={<Plus size={16} />}
          className="helix-btn-primary"
          handleClick={openCreateModal}
        />
      </div>

      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            id="tracking-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order or tracking number…"
            className="helix-input w-full pl-9 text-[13px]"
          />
        </div>

        <SelectField
          label="Status"
          name="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="helix-input w-full sm:w-48"
        >
          <option value="all">All statuses</option>
          {TRACKING_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </SelectField>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="helix-card p-12 text-center text-(--helix-text-dim)">
          {items.length === 0
            ? 'No tracking IDs found. Create your first tracking ID.'
            : 'No tracking IDs match your filters.'}
        </div>
      ) : (
        <TrackingIdTable
          items={filteredItems}
          onEdit={openEditModal}
          onDelete={setDeleteTarget}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Create / Edit Modal */}
      <TrackingIdModal
        open={modalOpen}
        onClose={closeModal}
        editing={editing}
        isMutating={isMutating}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <WarningModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
        }}
        loading={deleteMutation.isPending}
        label="Delete Tracking ID"
        text={`Are you sure you want to delete tracking ID "${deleteTarget?.trackingNumber}" for order "${deleteTarget?.orderNumber}"? This action cannot be undone.`}
        btnText="Delete"
      />
    </main>
  );
};

export default TrackingIdPage;
