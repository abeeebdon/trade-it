'use client';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductById } from '@/features/exporter/hooks/useProducts';
import { Loading } from '@/components/loading';
import { ProductData } from '@/features/exporter/api/productsApi';
import ProductDetailsCarousel from '../components/ProductDetailsCarousel';
import ProductImageZoom from '../components/ProductImageZoom';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { data, isPending } = useGetProductById(id ?? '');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const productDetails: ProductData = useMemo(() => {
    return data ? data : ({} as ProductData);
  }, [data]);

  const imageUrls = useMemo(() => {
    if (productDetails.images?.length) {
      return productDetails.images.map((img) => img.imageUrl);
    }
    return productDetails.thumbnailImage ? [productDetails.thumbnailImage] : [];
  }, [productDetails]);

  const slides = useMemo(() => {
    const thumbnail = productDetails.thumbnailImage;
    const gallery = imageUrls.filter((url) => url !== thumbnail);
    return thumbnail ? [thumbnail, ...gallery] : gallery;
  }, [productDetails.thumbnailImage, imageUrls]);

  const openZoom = useCallback((index: number) => {
    setActiveIndex(index);
    setIsZoomOpen(true);
  }, []);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );

  return (
    <section className="md:flex  gap-8">
      <div className="md:w-1/2">
        <ProductDetailsCarousel
          slides={slides}
          altPrefix={productDetails.productName}
          aspectRatio="aspect-4/3"
          options={{ align: 'start', loop: true }}
          className="w-full"
          showDots={true}
          showArrows={false}
          index={activeIndex}
          onSelect={setActiveIndex}
          onSlideClick={openZoom}
        />

        {slides.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {slides.map((url, index) => (
              <button
                type="button"
                key={url}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === activeIndex}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-md bg-[#0A1628] transition',
                  index === activeIndex
                    ? 'ring-2 ring-[#C9922A] ring-offset-1'
                    : 'opacity-70 hover:opacity-100',
                )}
              >
                <Image
                  src={url}
                  alt={`${productDetails.productName} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 12vw"
                  className="object-center"
                />
              </button>
            ))}
          </div>
        )}
      </div>
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

      {/* <ProductDetailsForm productDetails={productDetails} /> */}

      {isZoomOpen && slides.length > 0 && (
        <ProductImageZoom
          images={slides}
          index={Math.min(activeIndex, slides.length - 1)}
          altPrefix={productDetails.productName}
          onIndexChange={setActiveIndex}
          onClose={() => setIsZoomOpen(false)}
        />
      )}
    </section>
  );
};

export default ProductDetailsPage;
