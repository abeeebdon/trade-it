'use client';

import Loader from '@/components/buttons/Loader';
import { X } from 'lucide-react';

type SuccessModalProps = {
  open: boolean;
  message: string;
  onContinue: () => void;
  onCancel: () => void;
  loading?: boolean;
  continueText?: string;
  cancelText?: string;
};

const SuccessModal = ({
  open,
  message,
  onContinue,
  onCancel,
  loading = false,
  continueText = 'Continue',
  cancelText = 'Cancel',
}: SuccessModalProps) => {
  if (!open) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onCancel}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <article
        className="w-[90%] max-w-md border border-border rounded bg-bg z-10 p-6 text-center"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-end my-2">
          <button
            onClick={onCancel}
            className="text-muted hover:text-text cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Success animation: webm mark with gif fallback */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/success/success.gif"
          className="mx-auto w-28 h-28 object-contain"
          aria-label="Success"
        >
          <source src="/success/success_mark.webm" type="video/webm" />
        </video>

        <h2 className="helix-h2 mt-4">Success</h2>

        <p className="text-sm text-[#9CA3AF] mt-2">{message}</p>

        {/* actions */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 mt-6">
          <button
            onClick={onCancel}
            className="helix-btn-secondary flex-1"
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            onClick={onContinue}
            className="helix-btn-primary flex-1"
            disabled={loading}
          >
            {loading ? <Loader /> : continueText}
          </button>
        </div>
      </article>
    </section>
  );
};

export default SuccessModal;
