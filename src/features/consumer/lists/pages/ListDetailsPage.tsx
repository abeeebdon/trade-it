'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trash, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import {
  useGetShoppingList,
  useRemoveItemFromList,
  useAddAllToCart,
} from '../hooks/useShoppingLists';
import { Loading } from '@/components/loading';
import { ShoppingListItem } from '../types';
import Loader from '@/components/buttons/Loader';
import PressableBtn from '@/components/buttons/PressableBtn';

const ListDetailsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') ?? '';

  const { data, isLoading } = useGetShoppingList(id);
  const { mutate: removeItem, isPending: removingItem } =
    useRemoveItemFromList();
  const { mutate: addToCart, isPending: addingToCart } = useAddAllToCart();

  const list = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Shopping list not found.</p>
        <button
          onClick={() => router.back()}
          className="helix-btn-secondary mt-4"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleAddAllToCart = () => {
    addToCart(list.id);
  };

  return (
    <main className="">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className=" rounded-full hover:bg-[#1A7A6E]/10 transition-colors"
        >
          <ArrowLeft size={18} className="text-muted" />
        </button>
        <PressableBtn
          className="helix-btn-primary"
          title="Add New Items"
          handleClick={() => router.push('/')}
        />
      </div>

      <div className="flex items-center gap-4 mb-6 ">
        <div>
          <h1 className="helix-h2">{list.name}</h1>
          <p className="text-[12px] text-muted font-mono mt-0.5">
            {list.itemCount} item{list.itemCount === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      {/* Items */}
      <article className="space-y-3 max-w-xl">
        {list.items && list.items.length > 0 ? (
          <div className="space-y-3">
            {list.items.map((item: ShoppingListItem) => (
              <div
                key={item.id}
                className="helix-card p-4 flex items-center gap-4"
              >
                <Image
                  src={item.thumbnailImage ?? '/images/placeholder.png'}
                  alt={item.productName ?? ''}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[14px] truncate">
                    {item.productName ?? 'Unnamed item'}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[12px] text-muted">
                    <span>Qty: {item.quantity}</span>
                    {item.price != null && (
                      <span>${item.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={removingItem}
                  className="p-2 text-muted hover:text-[#E74C3C] transition-colors"
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}

            {/* Add all to cart */}
            <div className="pt-4">
              <button
                onClick={handleAddAllToCart}
                disabled={addingToCart}
                className="helix-btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                {addingToCart ? <Loader /> : 'Add all to cart'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted text-[14px]">
              This list is empty. Browse products to add items.
            </p>
          </div>
        )}
      </article>
    </main>
  );
};

export default ListDetailsPage;
