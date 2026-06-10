'use client';

import Image from 'next/image';
import { Edit, Trash2, Package, MapPin, Truck } from 'lucide-react';
import { useGetListingById } from '../../hooks/useListings';
import { useMemo } from 'react';
import { ProductListingTypes, ProductPhoto } from '../types/sellType';

const DTCDetails = ({ id }: { id: string }) => {
  const { data, isPending } = useGetListingById({ id });
  const product: ProductListingTypes = useMemo(() => {
    return data ? data : [];
  }, [data]);
  const productPhotos: ProductPhoto[] = useMemo(() => {
    return data ? data.photos : [];
  }, [data]);
  return (
    <section className="mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-2xl  shadow-sm ">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="p-6">
            <div className="relative aspect-square overflow-hidden rounded-xl ">
              <Image
                src={product.photo}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto">
              {productPhotos?.map((photo) => {
                console.log(photo);
                return (
                  <div
                    key={photo.id}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-danger">ll</p>
                    <Image
                      src={photo.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  {product.status}
                </span>

                <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h1>

                <p className="mt-2 text-sm uppercase tracking-wider text-gray-500">
                  {product.category}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  // onClick={() => onEdit(product)}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition hover:opacity-90"
                >
                  <Edit size={16} />
                  Edit
                </button>

                <button
                  // onClick={() => onDelete(product.id)}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <p className="text-sm text-gray-500">Retail Price</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  ${product.retailPriceUsd}
                </h3>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <p className="text-sm text-gray-500">Stock Available</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {product.stockQty}
                </h3>
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Ships From</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.shipsFrom}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Package size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Fulfillment Mode</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.mode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Truck size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Delivery Partner</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.deliveryPartnerOfRecord}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Description
              </h3>

              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DTCDetails;
