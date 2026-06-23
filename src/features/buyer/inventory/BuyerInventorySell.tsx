'use client';
import { useAppSelector } from '@/hooks/store/store';
import { Pencil, Plus, Store, Trash, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import ListingForm from '../components/ListingForm';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import Image from 'next/image';
import { ListingItem } from '../types/buyers';
import PressableBtn from '@/components/buttons/PressableBtn';
import { useHeader } from '@/context/HeaderContext';

const BuyerInventorySell = () => {
  const { setHeader } = useHeader();

  const [items, setItems] = useState<ListingItem[]>([]);

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState<ListingItem | null>(null);

  const load = () => {};

  const del = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  useEffect(() => {
    setHeader({
      title: 'Direct-to-Consumer Listings',
      kicker: 'Buyer · Sell from local inventory',
      action: (
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="helix-btn-primary inline-flex items-center gap-2"
        >
          <Plus size={14} /> New listing
        </button>
      ),
    });

    return () => setHeader(null);
  }, [setHeader]);

  return (
    <>
      <main className="">
        <div className="helix-card p-5 mb-6 border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <Store size={22} className="text-secondary" />

            <p className="text-[13px] text-text">
              Listings here sell your <b>US-stocked inventory</b> to consumers
              with 48-hour delivery. Helix keeps a 2% marketplace fee; Anchor
              credits the remainder to your USD wallet instantly.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="helix-card flex justify-center flex-col items-center gap-6 p-10 text-center text-muted">
            No listings yet.
            <PressableBtn
              handleClick={() => {
                setEditing(null);
                setOpen(true);
              }}
              title="New Listing"
              leftComponent={<Plus size={14} />}
              className="helix-btn-primary  w-fit gap-2"
            />
          </div>
        ) : (
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
                {items.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <Image
                        src={l.photos?.[0]}
                        alt=""
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded object-cover"
                      />
                    </td>
                    <td className="max-w-xs truncate">{l.title}</td>
                    <td className="text-[12px] text-muted">{l.category}</td>
                    <td className="font-mono">
                      {formatUSD(l.retail_price_usd)}
                    </td>
                    <td className="font-mono">{l.stock_qty}</td>
                    <td>
                      <span
                        className={`helix-status ${l.fulfillment_mode === 'riby_dtc' ? 'helix-status-gold' : 'helix-status-ok'}`}
                      >
                        {l.fulfillment_mode === 'riby_dtc'
                          ? 'DTC · RIBY'
                          : 'LOCAL · 48HR'}
                      </span>
                    </td>
                    <td>
                      <StatusPill status={l.status} />
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditing(l);
                            setOpen(true);
                          }}
                          className="text-secondary hover:text-primary"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => del(l.id ?? 0)}
                          className="text-danger hover:text-shadow-danger"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {open && (
        <ListingForm
          isExporter={false}
          editing={editing}
          onClose={() => {
            setOpen(false);
            load();
          }}
        />
      )}
    </>
  );
};

export default BuyerInventorySell;
