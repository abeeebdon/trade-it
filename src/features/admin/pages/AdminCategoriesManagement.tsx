'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  useGetProductCategories,
  useCreateProductCategory,
  useUpdateProductCategory,
  useDeleteProductCategory,
} from '@/features/exporter/hooks/useProducts';
import { ProductCategory } from '@/features/exporter/types/exporter';
import Modal from '@/components/ui/Modal';
import WarningModal from '@/components/modals/WarningModal';
import InputField from '@/components/form/InputFIeld';
import PressableBtn from '@/components/buttons/PressableBtn';
import { Skeleton } from '@/components/ui/skeleton';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const AdminCategoriesManagement = () => {
  const { data, isLoading } = useGetProductCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<ProductCategory | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<ProductCategory | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '' },
  });

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
    reset({ name: '', description: '' });
  };

  const createMutation = useCreateProductCategory(() => {
    closeModal();
  });
  const updateMutation = useUpdateProductCategory(() => {
    closeModal();
  });
  const deleteMutation = useDeleteProductCategory(() => {
    setDeleteTarget(null);
  });

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const openCreateModal = () => {
    setEditingCategory(null);
    reset({ name: '', description: '' });
    setModalOpen(true);
  };

  const openEditModal = (cat: ProductCategory) => {
    setEditingCategory(cat);
    reset({ name: cat.name, description: cat.description });
    setModalOpen(true);
  };

  const onSubmit = (values: CategoryFormValues) => {
    const payload = {
      name: values.name.trim(),
      description: values.description.trim(),
    };

    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const categories: ProductCategory[] = data?.data ?? [];

  return (
    <main className="min-h-[70vh]">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="helix-h2">Categories</h2>
          <p className="text-sm text-[#9CA3AF]">Manage product categories</p>
        </div>
        <PressableBtn
          title="Add Category"
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
      ) : categories.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No categories found. Create your first category.
        </div>
      ) : (
        <div className="helix-card overflow-hidden">
          <table className="helix-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th className="w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="font-mono text-[#C9922A]">{cat.id}</td>
                  <td className="font-medium">{cat.name}</td>
                  <td className="text-sm text-[#9CA3AF] max-w-xs truncate">
                    {cat.description}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="rounded p-1.5 text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="rounded p-1.5 text-[#9CA3AF] hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <Modal
          onClose={closeModal}
          title={editingCategory ? 'Edit Category' : 'Create Category'}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <InputField
              label="Name"
              {...register('name')}
              placeholder="e.g. Electronics"
              error={errors.name?.message}
            />
            <InputField
              label="Description"
              {...register('description')}
              placeholder="Brief description of the category"
              error={errors.description?.message}
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="helix-btn-secondary flex-1"
                disabled={isMutating}
              >
                Cancel
              </button>
              <PressableBtn
                title={editingCategory ? 'Save Changes' : 'Create'}
                className="helix-btn-primary flex-1 justify-center items-center"
                handleClick={handleSubmit(onSubmit)}
                loading={isMutating}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <WarningModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
        }}
        loading={deleteMutation.isPending}
        label="Delete Category"
        text={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        btnText="Delete"
      />
    </main>
  );
};

export default AdminCategoriesManagement;
