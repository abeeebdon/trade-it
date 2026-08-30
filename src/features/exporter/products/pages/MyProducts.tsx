'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  useGetProductCategories,
  useGetProducts,
} from '../../hooks/useProducts';
import { ProductResponseType } from '../types/product';
import Pagination from '../../components/pagination';
import ProductCard, { ProductTableRow } from '../components/ProductCard';
import MyProductHead from '../components/MyProductHead';

const PAGE_SIZE = 10;

export default function ExporterProducts() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data, isPending, isError } = useGetProducts({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });
  const { data: categoriesData, isPending: categoriesLoading } =
    useGetProductCategories();
  const products: ProductResponseType[] = useMemo(() => {
    return data?.data ?? [];
  }, [data]);
  const categoryOptions = categoriesData?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStatus =
        selectedStatus === 'all' || String(product.statusId) === selectedStatus;

      if (!matchesCategory || !matchesStatus) return false;

      if (!startDate && !endDate) return true;

      const createdAt = product.createdAt
        ? new Date(product.createdAt).getTime()
        : null;

      if (!createdAt) return false;

      if (startDate) {
        const from = new Date(`${startDate}T00:00:00`).getTime();
        if (createdAt < from) return false;
      }

      if (endDate) {
        const to = new Date(`${endDate}T23:59:59.999`).getTime();
        if (createdAt > to) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedStatus, startDate, endDate]);

  const openCreate = () => {
    router.push('/exporter/my-products/create');
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setPage(1);
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    setPage(1);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  return (
    <section>
      <MyProductHead
        selectedCategory={selectedCategory}
        categoryOptions={categoryOptions}
        categoriesLoading={categoriesLoading}
        selectedStatus={selectedStatus}
        startDate={startDate}
        endDate={endDate}
        onCreate={openCreate}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onReset={resetFilters}
      />
      {isPending && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="helix-card h-16 animate-pulse opacity-40" />
          ))}
        </div>
      )}

      {isError && (
        <div className="helix-card p-8 text-center text-muted text-sm">
          Failed to load products. Please refresh.
        </div>
      )}

      {/* Empty */}
      {!isPending && !isError && filteredProducts.length < 1 && (
        <div className="helix-card p-10 text-center">
          {products.length === 0 ? (
            <>
              <div className="text-muted">
                No products yet. Create your first listing to appear in the
                marketplace.
              </div>
              <button onClick={openCreate} className="helix-btn-primary mt-4">
                Create product
              </button>
            </>
          ) : (
            <div className="text-muted">
              No products match the selected filters.
            </div>
          )}
        </div>
      )}

      {/* Table / Cards */}
      {!isPending && !isError && filteredProducts.length > 0 && (
        <>
          <div className="hidden md:block helix-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="helix-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>MOQ</th>
                    <th>Unit</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <ProductTableRow key={product.id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-border">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        </>
      )}
    </section>
  );
}
