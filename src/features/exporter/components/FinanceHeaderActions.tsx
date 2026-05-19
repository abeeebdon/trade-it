'use client';

import Link from 'next/link';
import { Banknote, WalletCards } from 'lucide-react';

interface Props {
  onWithdrawNGN: () => void;
  onWithdrawUSD: () => void;
}

export default function FinanceHeaderActions({
  onWithdrawNGN,
  onWithdrawUSD,
}: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Link
        href="/exporter/withdrawal-accounts"
        className="helix-btn-secondary inline-flex items-center gap-2"
      >
        <WalletCards size={15} />
        <span className="hidden sm:inline">Accounts</span>
      </Link>

      <button
        onClick={onWithdrawNGN}
        className="helix-btn-secondary inline-flex items-center gap-2"
      >
        <Banknote size={15} />
        <span className="hidden sm:inline">Withdraw NGN</span>
      </button>

      <button
        onClick={onWithdrawUSD}
        className="helix-btn-primary inline-flex items-center gap-2"
      >
        <Banknote size={15} />

        <span className="hidden sm:inline">Withdraw USD</span>
      </button>
    </div>
  );
}
