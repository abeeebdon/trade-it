'use client';

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/ui/EmblaCarouselArrowBtn';
import { DotButton, useDotButton } from '@/components/ui/EmblaCarouselDotBtn';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

type CarouselPlugin = NonNullable<Parameters<typeof useEmblaCarousel>[1]>;

interface ProductDetailsCarouselProps {
  slides: string[];
  altPrefix?: string;
  options?: NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
  plugins?: CarouselPlugin;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
  showArrows?: boolean;
  showDots?: boolean;
}

const ProductDetailsCarousel: React.FC<ProductDetailsCarouselProps> = ({
  slides,
  altPrefix = 'Product image',
  options = {},
  plugins,
  className,
  imageClassName,
  aspectRatio = 'aspect-4/3',
  showArrows = true,
  showDots = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = usePrevNextButtons(emblaApi as any);

  const hasMultiple = slides.length > 1;

  if (!slides.length) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-[#0A1628]',
          aspectRatio,
          className,
        )}
      >
        <p className="text-text-muted text-sm">No images available</p>
      </div>
    );
  }

  return (
    <div className={cn('embla overflow-hidden', className)}>
      <div className="embla__viewport relative" ref={emblaRef}>
        <div className="embla__container flex ">
          {slides.map((slide, index) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide}>
              <div className={cn('relative bg-[#0A1628]', aspectRatio)}>
                <Image
                  src={slide}
                  alt={`${altPrefix} ${index + 1}`}
                  fill
                  className={cn('object-cover', imageClassName)}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {hasMultiple && (showArrows || showDots) && (
        <div className="embla__controls">
          {showArrows && (
            <div className="embla__buttons absolute top-1/2 left-0 right-0 flex justify-between items-center px-4">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          )}

          {showDots && (
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={'embla__dot'.concat(
                    index === selectedIndex ? ' embla__dot--selected' : '',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCarousel;
