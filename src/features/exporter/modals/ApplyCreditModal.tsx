'use client';

import { useState } from 'react';
import Modal from '../components/Modal';
import { formatUSD } from '@/lib/func';
import type { CreditEligibility } from '../types/exporter';

interface Props {
  eligibility: CreditEligibility;
  onClose: () => void;
  onSubmit: (payload: {
    amount: number;
    term: number;
    purpose: string;
  }) => void;
}

export default function ApplyCreditModal({
  eligibility,
  onClose,
  onSubmit,
}: Props) {
  const [amount, setAmount] = useState(
    Math.min(10000, eligibility.max_limit_usd),
  );

  const [term, setTerm] = useState(eligibility.indicative_term_months || 6);

  const [purpose, setPurpose] = useState('Export production financing');

  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    try {
      await new Promise((res) => setTimeout(res, 700));
      onSubmit({
        amount,
        term,
        purpose,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    /* 
      This wrapper forces the modal container layer to allow native page-level vertical scrolling, 
      letting the user scroll all the way to the top and bottom of the form on any screen.
    */
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 pt-10 pb-10 px-4">
      <Modal title="Apply for credit" onClose={onClose} testid="apply-modal">
        <div className="space-y-4">
          <div>
            <label className="helix-label">Amount (USD)</label>

            <input
              type="number"
              className="helix-input"
              value={amount}
              max={eligibility.max_limit_usd}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <div className="text-[11px] text-[#9CA3AF] mt-1 font-mono">
              Max indicative: {formatUSD(eligibility.max_limit_usd)}
            </div>
          </div>

          <div>
            <label className="helix-label">Term (months)</label>

            <select
              className="helix-input"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
            >
              {[3, 6, 9, 12].map((t) => (
                <option key={t} value={t}>
                  {t} months
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="helix-label">Purpose of funds</label>

            <textarea
              className="helix-input h-24"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          <div className="border-t border-[#1A7A6E]/15 pt-3 text-[11px] leading-relaxed text-[#9CA3AF]">
            By submitting, you authorise JompStart Digital to review your Helix
            sales history, KYB records, and compliance profile.
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="helix-btn-secondary flex-1">
              Cancel
            </button>

            <button
              onClick={submit}
              disabled={busy}
              className="helix-btn-primary flex-1"
            >
              {busy ? 'Submitting...' : 'Submit application'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
