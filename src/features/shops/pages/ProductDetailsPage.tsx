'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductById } from '@/features/exporter/hooks/useProducts';
import { Loading } from '@/components/loading';
import { ProductData } from '@/features/exporter/api/productsApi';
import ProductDetailsForm from '../components/ProductDetailsForm';
import ProductDetailsCarousel from '../components/ProductDetailsCarousel';
import { Lock } from 'lucide-react';

const ProductDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { data, isPending } = useGetProductById(id ?? '');

  const productDetails: ProductData = useMemo(() => {
    return data ? data : ({} as ProductData);
  }, [data]);

  const imageUrls = useMemo(() => {
    if (productDetails.images?.length) {
      return productDetails.images.map((img) => img.imageUrl);
    }
    return productDetails.thumbnailImage ? [productDetails.thumbnailImage] : [];
  }, [productDetails]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );

  return (
    <section className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="helix-card overflow-hidden">
          <ProductDetailsCarousel
            slides={[
              ...(productDetails.thumbnailImage
                ? [productDetails.thumbnailImage]
                : []),
              ...imageUrls.filter(
                (url) => url !== productDetails.thumbnailImage,
              ),
            ]}
            altPrefix={productDetails.productName}
            aspectRatio="aspect-4/3"
            options={{ align: 'start', loop: true }}
            className="w-full"
            showDots={true}
            showArrows={true}
          />
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {/* {isDtc ? (
                <span className="helix-status helix-status-gold">
                  <Truck size={10} /> Direct · Riby Inc of Record
                </span>
              ) : (
                <span className="helix-status helix-status-ok">
                  <Store size={10} /> US In-Stock · 48-hour
                </span>
              )} */}
              <span className="helix-status helix-status-neutral">
                {productDetails.category.replace('-', ' ')}
              </span>
              <span className="helix-status helix-status-gold">
                <Lock size={10} /> Riby Escrow Protected
              </span>
            </div>
            <h1 className="helix-h2">{productDetails.productName}</h1>
            <p className="text-[15px] text-text mt-4 leading-relaxed">
              {productDetails.description}
            </p>

            <div className="mt-6 pt-6 border-t border-[#1A7A6E]/15 grid grid-cols-2 gap-6 text-[13px]">
              <div>
                <p className="helix-label">Country of origin</p>
                {/* <p className="mt-1">{productDetails.}</p> */}
              </div>

              <div>
                <p className="helix-label">Seller</p>
                <p className="mt-1">Jompshop</p>
              </div>
              {/* {l.delivery_partner_of_record && (
                <div>
                  <p className="helix-label">Delivery Partner of Record</p>
                  <p className="mt-1 text-[#C9922A] font-medium">
                    {l.delivery_partner_of_record}
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <ProductDetailsForm productDetails={productDetails} />
    </section>
  );
};

export default ProductDetailsPage;
