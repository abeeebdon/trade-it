'use client';
import { useAppSelector } from '@/hooks/store/store';
import { Pencil, Plus, Store, Trash, Truck } from 'lucide-react';
import { useState } from 'react';
import ListingForm from '../components/ListingForm';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatUSD } from '@/lib/func';
import Image from 'next/image';
import { ListingItem } from '../types/buyers';
import { dummyItems } from '../components/data';
import PressableBtn from '@/components/buttons/PressableBtn';

const BuyerInventorySell = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [items, setItems] = useState<ListingItem[]>([]);

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState<ListingItem | null>(null);

  const load = () => {};

  const del = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isExporter = user?.role === 'exporter';

  return (
    <>
      <main className="">
        <div className="helix-card p-5 mb-6 border-[#C9922A]/30 bg-[#C9922A]/5">
          <div className="flex items-start gap-3">
            {isExporter ? (
              <Truck size={22} className="text-[#C9922A]" />
            ) : (
              <Store size={22} className="text-[#1A7A6E]" />
            )}
            <div className="text-[13px] text-[#F5F5F5]">
              {isExporter ? (
                <>
                  <b>Riby Inc is Delivery Partner of Record</b> for all listings
                  you create here. Consumers pay Helix; you receive USD net of
                  fees; Riby handles US customs &amp; last-mile delivery.
                </>
              ) : (
                <>
                  Listings here sell your <b>US-stocked inventory</b> to
                  consumers with 48-hour delivery. Helix keeps a 2% marketplace
                  fee; Anchor credits the remainder to your USD wallet
                  instantly.
                </>
              )}
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="helix-card flex justify-center flex-col items-center gap-6 p-10 text-center text-[#9CA3AF]">
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
                    <td className="text-[12px] text-[#9CA3AF]">{l.category}</td>
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
                          className="text-[#1A7A6E] hover:text-[#C9922A]"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => del(l.id ?? 0)}
                          className="text-[#E74C3C] hover:text-[#ff8e82]"
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
          isExporter={isExporter}
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
