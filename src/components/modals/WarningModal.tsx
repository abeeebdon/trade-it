'use client';

import Loader from '@/components/buttons/Loader';
import { X } from 'lucide-react';

type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  label: string;
  btnText: string;
  text: string;
};

const WarningModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  btnText,
  label,
  text,
}: LogoutModalProps) => {
  if (!open) return null;

  return (
    <section className="fixed  inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <article
        className=" w-[90%] max-w-md border border-border rounded bg-bg z-9999  p-6 "
        role="dialog "
      >
        <div className="flex justify-end my-2">
          <button
            onClick={onClose}
            className=" text-muted hover:text-text cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="helix-h2">{label}</h2>

        <p className="text-sm text-[#9CA3AF] mt-2">{text}</p>

        {/* actions */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 mt-6">
          <button
            onClick={onClose}
            className="helix-btn-secondary flex-1"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="helix-btn-primary flex-1 "
            disabled={loading}
          >
            {loading ? <Loader /> : btnText}
          </button>
        </div>
      </article>
    </section>
  );
};
export default WarningModal;
