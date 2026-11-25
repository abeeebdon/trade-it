'use client';

import { useMemo, useState } from 'react';

import Pagination from '@/components/ui/Pagination';
import SelectDropDown from '@/components/SelectDropDown';
import { useDebounce } from '@/components/debounce/useDebounce';

import { useGetAdminProducts } from '../hooks/useGetAdminProducts';
import { matchesSearch, productStatusLabel } from '../utils';
import AdminProductsToolbar, {
  ProductStatusFilter,
} from '../components/AdminProductsToolbar';
import {
  AdminProductMobileCard,
  AdminProductsTable,
} from '../components/AdminProductsTable';
import {
  AdminProductCardSkeleton,
  AdminProductRowSkeleton,
  AdminProductsToolbarSkeleton,
} from '../components/AdminProductsSkeleton';
import {
  AdminProductsEmpty,
  AdminProductsError,
} from '../components/AdminProductsStates';

const DEFAULT_PAGE_SIZE = 10;

const AdminProductPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProductStatusFilter>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending, isError, refetch } = useGetAdminProducts({
    pageNumber: page,
    pageSize,
    search: debouncedSearch,
  });
  console.log('data', data);

  const totalPages = data?.totalPages ?? 1;
  const totalRecords = data?.totalRecords ?? 0;

  const products = useMemo(() => {
    const list = data?.data ?? [];

    return list.filter((product) => {
      const matchesStatus =
        !status || productStatusLabel(product.statusId) === status;
      return matchesStatus && matchesSearch(product, search);
    });
  }, [data, status, search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageSizeChange = (next: number) => {
    setPageSize(next);
    setPage(1);
  };

  // ── Loading ────────────────────────────────────────
  if (isPending) {
    return (
      <div className="space-y-6">
        <AdminProductsToolbarSkeleton />

        <div className="hidden md:block overflow-hidden rounded-lg border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap">
                    Product
                  </th>
                  <th className="border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap">
                    Category
                  </th>
                  <th className="border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap">
                    Price
                  </th>
                  <th className="border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap">
                    MOQ
                  </th>
                  <th className="border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap">
                    Unit
                  </th>
                  <th className="border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap">
                    Source
                  </th>
                  <th className="border-b border-border bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-medium tracking-[0.12em] text-muted uppercase whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <AdminProductRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md:hidden space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <AdminProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────
  if (isError) {
    return <AdminProductsError onRetry={() => refetch()} />;
  }

  // ── Empty ──────────────────────────────────────────
  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <AdminProductsToolbar
          search={search}
          onSearchChange={handleSearchChange}
          status={status}
          onStatusChange={setStatus}
          totalRecords={totalRecords}
        />
        <AdminProductsEmpty />
      </div>
    );
  }

  // ── Data ───────────────────────────────────────────
  return (
    <div className="space-y-6">
      <AdminProductsToolbar
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={setStatus}
        totalRecords={totalRecords}
      />

      {/* Desktop table */}
      <AdminProductsTable products={products} />

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <AdminProductMobileCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination + page size */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[13px] text-muted sm:hidden">
          <span>
            Total records: <strong className="text-text">{totalRecords}</strong>
          </span>
        </div>
        <Pagination
          page={Math.min(page, totalPages)}
          totalPages={totalPages}
          onChange={setPage}
        />
        <SelectDropDown pageNum={pageSize} setPageNum={handlePageSizeChange} />
      </div>
    </div>
  );
};

export default AdminProductPage;
