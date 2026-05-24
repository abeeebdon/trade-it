'use client';

import Link from 'next/link';
import { Copy } from 'lucide-react';

import { formatNGN, formatUSD } from '@/lib/func';
import { BalanceBlockProps } from '../types/finance';

export default function BalanceBlock({
  label,
  balance,
  currency,
  count,
  accent,
  va,
  onCopy,
}: BalanceBlockProps) {
  return (
    <div
      className={`helix-card p-6 ${accent ? 'relative overflow-hidden' : ''}`}
    >
      {accent && (
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
      )}

      <div className="flex items-center justify-between">
        <div className="helix-label">{label}</div>

        <Link
          href="/finance/accounts"
          className="text-[10px] font-mono uppercase tracking-wider text-secondary"
        >
          {count} saved {currency} acct
          {count === 1 ? '' : 's'}
        </Link>
      </div>

      <div className="font-mono text-3xl text-text sm:text-4xl font-bold mt-2 tracking-tight">
        {currency === 'USD' ? formatUSD(balance) : formatNGN(balance)}
      </div>

      {va?.account_number && (
        <div className="mt-5 pt-4 border-t border-[#1A7A6E]/15">
          <div className="text-[10px] uppercase tracking-widest text-muted mb-1">
            Virtual Account · {va.bank}
          </div>

          <div className="flex items-center gap-2">
            <div className="font-mono text-[15px] text-primary">
              {va.account_number}
            </div>

            <button onClick={() => onCopy(va.account_number)}>
              <Copy size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
