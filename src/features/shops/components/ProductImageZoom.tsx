'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageZoomProps {
  images: string[];
  index: number;
  altPrefix?: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 1.5;
const WHEEL_STEP = 1.15;
const DOUBLE_CLICK_SCALE = 2.5;

const ProductImageZoom = ({
  images,
  index,
  altPrefix = 'Product image',
  onIndexChange,
  onClose,
}: ProductImageZoomProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);
  const scaleRef = useRef(MIN_SCALE);

  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const hasMultiple = images.length > 1;
  const current = images[index];

  /** Keep the image from being panned past its own edges. */
  const clampOffset = useCallback(
    (next: { x: number; y: number }, nextScale: number) => {
      const rect = viewportRef.current?.getBoundingClientRect();
      if (!rect || nextScale <= MIN_SCALE) return { x: 0, y: 0 };

      const maxX = (rect.width * (nextScale - 1)) / 2;
      const maxY = (rect.height * (nextScale - 1)) / 2;

      return {
        x: Math.min(maxX, Math.max(-maxX, next.x)),
        y: Math.min(maxY, Math.max(-maxY, next.y)),
      };
    },
    [],
  );

  /**
   * Zoom around `point` (px relative to the viewport centre) so the spot under
   * the cursor stays put. Without a point, it zooms around the centre.
   */
  const applyZoom = useCallback(
    (nextScale: number, point?: { x: number; y: number }) => {
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
      const ratio = clamped / scaleRef.current;
      scaleRef.current = clamped;
      setScale(clamped);

      setOffset((prev) => {
        if (clamped === MIN_SCALE) return { x: 0, y: 0 };
        const next = point
          ? {
              x: point.x - (point.x - prev.x) * ratio,
              y: point.y - (point.y - prev.y) * ratio,
            }
          : prev;
        return clampOffset(next, clamped);
      });
    },
    [clampOffset],
  );

  const resetZoom = useCallback(() => applyZoom(MIN_SCALE), [applyZoom]);

  const goTo = useCallback(
    (next: number) => {
      if (!images.length) return;
      onIndexChange((next + images.length) % images.length);
    },
    [images.length, onIndexChange],
  );

  // Reset the zoom whenever the visible image changes.
  // useEffect(() => {
  //   () => resetZoom();
  // }, [index, resetZoom]);

  // Lock the page behind the overlay + keyboard shortcuts.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo(index + 1);
      if (e.key === 'ArrowLeft') goTo(index - 1);
    };

    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [goTo, index, onClose]);

  // Native listener so the page does not scroll while zooming.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      applyZoom(
        scaleRef.current * (e.deltaY < 0 ? WHEEL_STEP : 1 / WHEEL_STEP),
        {
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        },
      );
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [applyZoom]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scaleRef.current <= MIN_SCALE) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offset.x,
      oy: offset.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    setOffset(
      clampOffset(
        {
          x: drag.ox + (e.clientX - drag.x),
          y: drag.oy + (e.clientY - drag.y),
        },
        scaleRef.current,
      ),
    );
  };

  const endDrag = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scaleRef.current > MIN_SCALE) {
      resetZoom();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    applyZoom(DOUBLE_CLICK_SCALE, {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  return (
    <aside
      className="fixed inset-0 z-70 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${altPrefix} viewer`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} />
      </button>

      <div
        ref={viewportRef}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          'relative h-full w-full touch-none overflow-hidden select-none',
          scale > MIN_SCALE
            ? isDragging
              ? 'cursor-grabbing'
              : 'cursor-grab'
            : 'cursor-zoom-in',
        )}
      >
        <div
          className={cn(
            'absolute inset-0',
            !isDragging && 'transition-transform duration-100 ease-out',
          )}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          }}
        >
          <Image
            src={current}
            alt={`${altPrefix} ${index + 1}`}
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-contain"
          />
        </div>
      </div>

      {hasMultiple && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4"
        >
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next image"
            className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={() => applyZoom(scaleRef.current / ZOOM_STEP)}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
        >
          <ZoomOut size={18} />
        </button>

        <span className="min-w-14 text-center text-xs text-white/80">
          {Math.round(scale * 100)}%
        </span>

        <button
          type="button"
          onClick={() => applyZoom(scaleRef.current * ZOOM_STEP)}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
        >
          <ZoomIn size={18} />
        </button>

        <button
          type="button"
          onClick={resetZoom}
          disabled={scale <= MIN_SCALE}
          aria-label="Reset zoom"
          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </aside>
  );
};

export default ProductImageZoom;
