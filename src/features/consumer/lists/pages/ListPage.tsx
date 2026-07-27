'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import ListCard from '../components/ListCard';
import ListsEmptyState from '../components/ListsEmptyState';
import CreateListModal from '../components/CreateListModal';
import ListsSkeleton from '../components/ListsSkeleton';
import WarningModal from '@/components/modals/WarningModal';
import {
  useGetShoppingLists,
  useDeleteShoppingList,
  useAddAllToCart,
} from '../hooks/useShoppingLists';

export default function ShoppingLists() {
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { data, isLoading } = useGetShoppingLists();
  const { mutate: remove, isPending: deleting } = useDeleteShoppingList();
  const { mutate: addToCart, isPending: addingToCart } = useAddAllToCart();

  const lists = data?.data?.data ?? [];

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget === null) return;
    remove(deleteTarget, {
      onSettled: () => setDeleteTarget(null),
    });
  };

  const handleAddAllToCart = (id: string) => {
    addToCart(id);
  };

  if (isLoading) return <ListsSkeleton />;

  return (
    <main>
      {lists.length === 0 ? (
        <ListsEmptyState onCreate={() => setOpen(true)} />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setOpen(true)}
              className="helix-btn-primary text-sm inline-flex items-center gap-1.5"
              data-testid="cs-new-list"
            >
              <Plus size={13} /> New list
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {lists.map((l) => (
              <ListCard
                key={l.id}
                list={l}
                onDelete={handleDelete}
                onAddAllToCart={handleAddAllToCart}
                addingToCart={addingToCart}
              />
            ))}
          </div>
        </>
      )}

      {open && <CreateListModal onClose={() => setOpen(false)} />}

      <WarningModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        label="Delete list"
        text="Are you sure you want to delete this shopping list? This action cannot be undone."
        btnText="Delete"
      />
    </main>
  );
}
