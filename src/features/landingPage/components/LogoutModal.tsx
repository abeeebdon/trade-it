'use client';

import Loader from '@/components/buttons/Loader';
import { X } from 'lucide-react';

type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  label?: string;
  btnText?: string;
  text?: string;
};

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  btnText = 'Logout',
  label = 'Confirm Logout',
  text = 'Are you sure you want to log out of your account? You’ll need to sign  in again to continue.',
}: LogoutModalProps) {
  if (!open) return null;

  return (
    <div className="fixed w-full h-screen inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute  inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div
        className=" w-[90%] max-w-md border helix-card z-9999  p-6 animate-fadeUp"
        role="dialog"
      >
        <button
          onClick={onClose}
          className=" text-[#9CA3AF] hover:text-[#F5F5F5]"
        >
          <X size={18} />
        </button>

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
      </div>
    </div>
  );
}
