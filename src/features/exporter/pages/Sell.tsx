'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Plus, Truck, Store, Trash2, Pencil } from 'lucide-react';
import { toast } from 'sonner';

import { formatUSD } from '@/lib/func';
import { RootState } from '@/store/store';
import { useHeader } from '@/context/HeaderContext';
import { StatusPill } from '@/features/shops/components/StatusPill';

import { mockListings } from '../components/data';
import ListingForm from '../components/ListingForm';

import { Listing } from '../types/exporter';

export default function Sell() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { setHeader } = useHeader();

  const [items, setItems] = useState<Listing[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);

  const isExporter = user?.role === 'exporter';

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockListings);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setHeader({
      title: 'Direct-to-Consumer Listings',

      kicker: isExporter
        ? 'Exporter · Sell DTC with Riby of Record'
        : 'Buyer · Sell from local inventory',

      action: (
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="helix-btn-primary inline-flex items-center gap-2"
          data-testid="create-listing-btn"
        >
          <Plus size={14} />

          <span className="hidden sm:inline">New listing</span>

          <span className="sm:hidden">New</span>
        </button>
      ),
    });

    return () => {
      setHeader(null);
    };
  }, [isExporter, setHeader]);

  const del = (id: string) => {
    if (!window.confirm('Delete this listing?')) return;

    setItems((prev) => prev.filter((l) => l.id !== id));

    toast.success('Deleted');
  };

  return (
    <>
      {/* INFO BANNER */}
      <div className="helix-card p-4 sm:p-5 mb-6 border-[#C9922A]/30 bg-[#C9922A]/5">
        <div className="flex items-start gap-3">
          {isExporter ? (
            <Truck size={22} className="text-[#C9922A] shrink-0" />
          ) : (
            <Store size={22} className="text-[#1A7A6E] shrink-0" />
          )}

          <div className="text-[13px] sm:text-sm text-[#F5F5F5] leading-relaxed">
            {isExporter ? (
              <>
                <b>Riby Inc is Delivery Partner of Record</b> for all listings
                you create here. Consumers pay Helix; you receive USD net of
                fees; Riby handles US customs &amp; last-mile delivery.
              </>
            ) : (
              <>
                Listings here sell your <b>US-stocked inventory</b> to consumers
                with 48-hour delivery.
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="grid gap-4 lg:hidden">
        {items.map((l) => (
          <div key={l.id} className="helix-card p-4 space-y-4">
            <div className="flex gap-4">
              {l.photos?.[0] ? (
                <Image
                  src={l.photos[0]}
                  alt={l.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-[#1A7A6E]/10 flex items-center justify-center text-[10px] font-mono">
                  NO IMG
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">{l.title}</h3>

                <p className="text-xs text-[#9CA3AF] mt-1">{l.category}</p>

                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <StatusPill status={l.status} />

                  <span
                    className={`helix-status ${
                      l.fulfillment_mode === 'riby_dtc'
                        ? 'helix-status-gold'
                        : 'helix-status-ok'
                    }`}
                  >
                    {l.fulfillment_mode === 'riby_dtc'
                      ? 'DTC · RIBY'
                      : 'LOCAL · 48HR'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-xs text-[#9CA3AF]">Price</p>

                <p className="font-semibold font-mono">
                  {formatUSD(l.retail_price_usd)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-[#9CA3AF]">Stock</p>

                <p className="font-semibold font-mono">{l.stock_qty}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(l);
                  setOpen(true);
                }}
                className="helix-btn-secondary flex-1 inline-flex items-center justify-center gap-2"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                onClick={() => del(l.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[#E74C3C]/40 bg-[#E74C3C]/10 px-4 py-2 text-[#E74C3C]"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <div className="helix-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="helix-table min-w-full">
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
                        src={l.photos[0]}
                        alt={l.title}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded object-cover"
                      />
                    </td>

                    <td>{l.title}</td>

                    <td>{l.category}</td>

                    <td>{formatUSD(l.retail_price_usd)}</td>

                    <td>{l.stock_qty}</td>

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
                          className="text-[#1A7A6E]"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => del(l.id)}
                          className="text-[#E74C3C]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <ListingForm
        open={open}
        isExporter={isExporter}
        editing={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={(listing) => {
          if (editing) {
            setItems((prev) =>
              prev.map((l) => (l.id === listing.id ? listing : l)),
            );
          } else {
            setItems((prev) => [...prev, listing]);
          }
        }}
      />
    </>
  );
}
