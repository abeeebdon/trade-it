'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { LifecycleStepperProps } from '../types/exporterOrdersType';

export function LifecycleStepper({ steps, currentIdx }: LifecycleStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const active = activeRef.current;
    if (!container || !active) return;

    const target =
      active.offsetLeft - container.clientWidth / 2 + active.offsetWidth / 2;
    container.scrollTo({
      left: Math.max(0, target),
      behavior: 'smooth',
    });
  }, [currentIdx]);

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {steps.map((s, i) => (
        <div
          ref={i === currentIdx ? activeRef : null}
          key={s.value}
          className="flex items-center gap-1.5 sm:gap-2 shrink-0"
        >
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              i <= currentIdx
                ? 'bg-[#C9922A] text-[#0A1628]'
                : 'bg-[#0A1628] border border-[#1A7A6E]/40 text-[#9CA3AF]'
            }`}
          >
            {i <= currentIdx ? (
              <CheckCircle2 size={13} />
            ) : (
              <span className="text-[10px] sm:text-[11px] font-mono">
                {i + 1}
              </span>
            )}
          </div>
          <div
            className="text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors"
            style={{ color: i <= currentIdx ? '#F5F5F5' : '#9CA3AF' }}
          >
            {s.label}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-4 sm:w-6 h-px shrink-0 transition-colors ${
                i < currentIdx ? 'bg-[#C9922A]' : 'bg-[#1A7A6E]/30'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
