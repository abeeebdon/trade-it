'use client';

import { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';

import { formatUSD, formatNGN } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { Product } from '../../types/exporter';
import { useGetProducts } from '../../hooks/useProducts';
import ProductForm from '../../modals/CreateProduct';
import Image from 'next/image';

const PAGE_SIZE = 10;

export default function ExporterProducts() {
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const { data, isPending, isError } = useGetProducts({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-end mb-6">
        <button
          onClick={openCreate}
          className="helix-btn-primary inline-flex items-center gap-2"
          data-testid="create-product-btn"
        >
          <Plus size={14} /> New product
        </button>
      </div>

      {/* Loading */}
      {isPending && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="helix-card h-16 animate-pulse opacity-40" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="helix-card p-8 text-center text-[#9CA3AF] text-sm">
          Failed to load products. Please refresh.
        </div>
      )}

      {/* Empty */}
      {!isPending && !isError && products.length === 0 && (
        <div className="helix-card p-10 text-center">
          <div className="text-[#9CA3AF]">
            No products yet. Create your first listing to appear in the
            marketplace.
          </div>
          <button onClick={openCreate} className="helix-btn-primary mt-4">
            Create product
          </button>
        </div>
      )}

      {/* Table */}
      {!isPending && !isError && products.length > 0 && (
        <div className="helix-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="helix-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>MOQ</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.photos?.[0] ? (
                        <Image
                          src={p.photos[0]}
                          alt=""
                          className="w-14 h-14 rounded object-cover"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <div className="w-14 h-14 rounded bg-[#1A7A6E]/10 flex items-center justify-center text-[#1A7A6E] text-[10px] font-mono">
                          NO IMG
                        </div>
                      )}
                    </td>
                    <td className="max-w-xs truncate">{p.name}</td>
                    <td className="text-[13px] text-[#9CA3AF]">{p.category}</td>
                    <td className="font-mono">
                      {formatUSD(p.price_usd)}
                      <div className="text-[11px] text-[#9CA3AF]">
                        {formatNGN(p.price_ngn)}
                      </div>
                    </td>
                    <td className="font-mono">
                      {p.min_order_qty} {p.unit}
                    </td>
                    <td>
                      <StatusPill status={p.status} />
                    </td>
                    <td>
                      <button
                        onClick={() => openEdit(p)}
                        className="text-[#1A7A6E] hover:text-[#C9922A]"
                        data-testid={`edit-${p.id}`}
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-4 border-t border-[#1A7A6E]/20 flex items-center justify-between">
              <span className="text-[12px] text-[#9CA3AF] font-mono">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="helix-btn-secondary text-[12px] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="helix-btn-secondary text-[12px] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {formOpen && <ProductForm onClose={handleFormClose} editing={editing} />}
    </>
  );
}
