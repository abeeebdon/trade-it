'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MOCK_FAVOURITES } from '../constants';
import FavouriteCard from '../components/FavouriteCard';
import FavouritesEmptyState from '../components/FavouritesEmptyState';
import FavouritesSkeleton from '../components/FavouritesSkeleton';
import type { FavouriteItem } from '../types';

const SIMULATED_DELAY_MS = 800;

export default function Favourites() {
  const [items, setItems] = useState<FavouriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(MOCK_FAVOURITES);
      setLoading(false);
    }, SIMULATED_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const removeFav = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removed from favourites');
  };

  const addToCart = (l: FavouriteItem) => {
    try {
      const c = JSON.parse(localStorage.getItem('jomp_cart') || '[]') as {
        id: string;
        title: string;
        price: number;
        qty: number;
        photo: string;
      }[];
      const idx = c.findIndex((x) => x.id === l.id);
      if (idx >= 0) {
        c[idx].qty += 1;
      } else {
        c.push({
          id: l.id,
          title: l.title,
          price: l.retail_price_usd,
          qty: 1,
          photo: l.photos?.[0] ?? '',
        });
      }
      localStorage.setItem('jomp_cart', JSON.stringify(c));
      window.dispatchEvent(new Event('jomp-cart-updated'));
      toast.success(`${l.title} added to cart`);
    } catch {
      toast.error("Couldn't add");
    }
  };

  if (loading) return <FavouritesSkeleton />;

  return (
    <main>
      {items.length === 0 ? (
        <FavouritesEmptyState />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((l) => (
            <FavouriteCard
              key={l.id}
              item={l}
              onRemove={removeFav}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
}
