'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  useGetHelpItems,
  useCreateHelpItem,
  useUpdateHelpItem,
  useDeleteHelpItem,
} from '@/features/admin/adminHelp/hooks/useAdminHelp';
import {
  HelpItem,
  CreateHelpPayload,
} from '@/features/admin/adminHelp/types/help';
import HelpFormModal from '@/features/admin/adminHelp/components/HelpFormModal';
import HelpTableRow from '@/features/admin/adminHelp/components/HelpTableRow';
import WarningModal from '@/components/modals/WarningModal';
import PressableBtn from '@/components/buttons/PressableBtn';
import { Skeleton } from '@/components/ui/skeleton';

const AdminHelp = () => {
  const { data, isLoading } = useGetHelpItems();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HelpItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HelpItem | null>(null);

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const createMutation = useCreateHelpItem(() => closeModal());
  const updateMutation = useUpdateHelpItem(() => closeModal());
  const deleteMutation = useDeleteHelpItem(() => setDeleteTarget(null));

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const openCreateModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item: HelpItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSave = ({
    id,
    payload,
  }: {
    id?: number;
    payload: CreateHelpPayload;
  }) => {
    if (id) {
      updateMutation.mutate({ id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const items: HelpItem[] = data ?? [];

  return (
    <main className="min-h-[70vh]">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="helix-h2">Help Articles</h2>
          <p className="text-sm text-[#9CA3AF]">
            Manage help center content and FAQs
          </p>
        </div>
        <PressableBtn
          title="Add Article"
          leftComponent={<Plus size={16} />}
          className="helix-btn-primary"
          handleClick={openCreateModal}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No help articles found. Create your first article.
        </div>
      ) : (
        <div className="helix-card overflow-hidden">
          <table className="helix-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Order</th>
                <th className="w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <HelpTableRow
                  key={item.id}
                  item={item}
                  onEdit={openEditModal}
                  onDelete={setDeleteTarget}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      <HelpFormModal
        open={modalOpen}
        onClose={closeModal}
        editingItem={editingItem}
        isMutating={isMutating}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <WarningModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
        }}
        loading={deleteMutation.isPending}
        label="Delete Help Article"
        text={`Are you sure you want to delete "${deleteTarget?.question}"? This action cannot be undone.`}
        btnText="Delete"
      />
    </main>
  );
};

export default AdminHelp;
