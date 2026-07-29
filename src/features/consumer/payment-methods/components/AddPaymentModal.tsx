'use client';

import { PAYMENT_KINDS } from '../constants';
import AddCardModal from './AddCardModal';
import AddAchModal from './AddAchModal';
import AddZelleModal from './AddZelleModal';
import { useState } from 'react';

interface AddPaymentModalProps {
  onClose: () => void;
}

export default function AddPaymentModal({ onClose }: AddPaymentModalProps) {
  const [modalKind, setModalKind] = useState('card');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative helix-card p-6 w-full max-w-md mx-4">
        <h3 className="helix-h3 mb-4">Add payment method</h3>

        {/* Kind selector */}
        <div className="flex gap-2 mb-4">
          {PAYMENT_KINDS.map((k) => (
            <button
              key={k.v}
              type="button"
              onClick={() => setModalKind(k.v)}
              className={`flex-1 px-3 py-2 rounded-md text-[12px] border ${
                modalKind === k.v
                  ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A] font-semibold'
                  : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'
              }`}
            >
              {k.l}
            </button>
          ))}
        </div>

        {/* Hidden kind field for RHF tracking */}
        {modalKind === 'card' && <AddCardModal onClose={onClose} />}
        {modalKind === 'zelle' && <AddZelleModal onClose={onClose} />}
        {modalKind === 'ach' && <AddAchModal onClose={onClose} />}
      </div>
    </div>
  );
}
