'use client';

import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  testid?: string;
}

export default function Modal({
  title,
  children,
  onClose,
  testid,
}: ModalProps) {
  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0  z-9999 w-full h-full left-0 right-0 top-0 bottom-0"
      data-testid={testid}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0  bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal wrapper */}
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex items-start justify-center p-4 sm:p-6">
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-secondary/20 bg-bg shadow-2xl mt-10 mb-10 "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1A7A6E]/10 px-5 py-4">
              <h2 className="helix-h3">{title}</h2>

              <button
                onClick={onClose}
                className="text-muted hover:text-text transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
