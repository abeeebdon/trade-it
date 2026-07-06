'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_LISTS } from '../constants';
import ListCard from '../components/ListCard';
import ListsEmptyState from '../components/ListsEmptyState';
import CreateListModal from '../components/CreateListModal';
import ListsSkeleton from '../components/ListsSkeleton';
import type { ShoppingList } from '../types';

const SIMULATED_DELAY_MS = 700;

export default function ShoppingLists() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLists(MOCK_LISTS);
      setLoading(false);
    }, SIMULATED_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const create = (name: string) => {
    const newList: ShoppingList = {
      id: `list_${Date.now()}`,
      name,
      item_count: 0,
    };
    setLists((prev) => [...prev, newList]);
    toast.success('List created');
    setOpen(false);
  };

  const remove = (id: string) => {
    if (!window.confirm('Delete this list?')) return;
    setLists((prev) => prev.filter((l) => l.id !== id));
    toast.success('List deleted');
  };

  if (loading) return <ListsSkeleton />;

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
              <ListCard key={l.id} list={l} onDelete={remove} />
            ))}
          </div>
        </>
      )}

      {open && (
        <CreateListModal onSuccess={create} onClose={() => setOpen(false)} />
      )}
    </main>
  );
}
