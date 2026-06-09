import Pagination, { paginate } from '@/components/ui/Pagination';
import { formatUSD, formatNGN, formatDateTime } from '@/lib/func';
import { useState } from 'react';
import { FilterState, Transaction } from '../types/buyers';
import { StatusPill } from '@/features/shops/components/StatusPill';

const TransactionLedger = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    currency: '',
    type: '',
  });
  const PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const txPage = paginate(txs, page, PER_PAGE);

  return (
    <div className="helix-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1A7A6E]/20 flex flex-wrap justify-between gap-3 items-center">
        <div>
          <div className="helix-label">Transaction Ledger</div>

          <div className="helix-h3 mt-1">{txs.length} transaction(s)</div>
        </div>

        <div className="flex gap-2">
          <select
            className="helix-input w-32"
            value={filter.currency}
            onChange={(e) =>
              setFilter({
                ...filter,
                currency: e.target.value as FilterState['currency'],
              })
            }
          >
            <option value="">All ccy</option>
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
          </select>

          <select
            className="helix-input w-36"
            value={filter.type}
            onChange={(e) =>
              setFilter({
                ...filter,
                type: e.target.value as FilterState['type'],
              })
            }
          >
            <option value="">All types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
            <option value="transfer">Transfer</option>
            <option value="fee">Fee</option>
          </select>
        </div>
      </div>

      {txs.length === 0 ? (
        <div className="p-10 text-center text-[#9CA3AF]">No transactions.</div>
      ) : (
        <table className="helix-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Type</th>
              <th>Description</th>
              <th>Reference</th>
              <th>Status</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {txPage.items.map((t) => (
              <tr key={t.id} data-testid={`tx-${t.id}`}>
                <td className="font-mono text-[12px] text-[#9CA3AF]">
                  {formatDateTime(t.timestamp)}
                </td>

                <td className="uppercase text-[11px] font-mono tracking-wider">
                  {t.type}
                </td>

                <td className="max-w-sm truncate">{t.description}</td>

                <td className="font-mono text-[11px] text-[#1A7A6E]">
                  {t.anchor_transaction_ref}
                </td>

                <td>
                  <StatusPill status={t.status} />
                </td>

                <td
                  className={`font-mono text-right ${
                    t.type === 'credit' ? 'text-[#C9922A]' : 'text-[#F5F5F5]'
                  }`}
                >
                  {t.type === 'credit' ? '+' : '-'}

                  {t.currency.toUpperCase() === 'USD'
                    ? formatUSD(t.amount)
                    : formatNGN(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        page={txPage.page}
        totalPages={txPage.totalPages}
        onChange={setPage}
      />
    </div>
  );
};

export default TransactionLedger;
