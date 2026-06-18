'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Coins,
  Receipt,
  Package,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { formatUSD, formatNGN, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import BalanceCard from '../components/BalanceCard';
import { useGetCommandCenter } from '../hooks/useGetCommandCenter';
import { CommandCenterWallet } from '../types/command-center';
import { useHeader } from '@/context/HeaderContext';
import { Order, Transaction } from '../types/exporter';

// Helpers

function walletToVa(wallet: CommandCenterWallet | undefined) {
  if (!wallet) return undefined;
  return {
    account_number: wallet.accountNumber,
    bank: wallet.bankName,
  };
}

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { setHeader } = useHeader();

  const { data, isPending, isError } = useGetCommandCenter();

  useEffect(() => {
    const welcomeMessage = user?.fullName
      ? `Welcome back, ${user.fullName}`
      : user?.email
        ? `Welcome back, ${user.email}`
        : 'Welcome back';

    setHeader({
      title: welcomeMessage,
      kicker: 'Exporter · Command Center',
    });

    return () => setHeader(null);
  }, [user, setHeader]);

  if (isPending) return <Skeleton />;

  if (isError) {
    return (
      <div className="helix-card p-8 text-center text-[#9CA3AF] text-sm">
        Failed to load dashboard. Please refresh.
      </div>
    );
  }

  const usdWallet = data?.wallets.find(
    (w: CommandCenterWallet) => w.currency === 'USD',
  );
  const ngnWallet = data?.wallets.find(
    (w: CommandCenterWallet) => w.currency === 'NGN',
  );
  const compliance = data?.compliance;
  const fxRate = data?.fxRate;
  const orders = data?.recentOrders?.items ?? [];
  const transactions = data?.recentTransactions ?? [];

  const isVerified = compliance?.status === 'approved';

  return (
    <>
      {/* Verification banner */}
      {!isVerified && (
        <div className="helix-card p-5 mb-6 border-[#C9922A]/40 justify-between bg-[#C9922A]/6 flex flex-col sm:flex-row items-start gap-4">
          <div className="sm:flex-row flex flex-col gap-4">
            <ShieldAlert size={22} className="text-[#C9922A] mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold">
                Complete verification to unlock trading
              </div>
              <p className="text-[13px] text-[#9CA3AF] mt-1">
                Submit your KYB documents to provision your NGN and USD
                accounts.
              </p>
            </div>
          </div>

          <Link
            href="/exporter/onboarding"
            className="helix-btn-primary text-sm whitespace-nowrap"
          >
            Continue onboarding{' '}
            <ArrowRight size={14} className="inline ml-1 font-bold" />
          </Link>
        </div>
      )}

      {/* Balances  */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <BalanceCard
          label="USD Balance"
          value={formatUSD(usdWallet?.availableBalance ?? 0)}
          sub="Available · USD"
          va={walletToVa(usdWallet)}
          accent
        />
        <BalanceCard
          label="NGN Balance"
          value={formatNGN(ngnWallet?.availableBalance ?? 0)}
          sub="Available · NGN"
          va={walletToVa(ngnWallet)}
        />
        <div className="helix-card p-5">
          <div className="flex justify-between items-start">
            <div>
              <span className="helix-label">USD / NGN Rate</span>
              <div className="font-mono text-3xl font-bold text-primary mt-2 tracking-tight">
                ₦{fxRate ? Number(fxRate.rate).toLocaleString() : '—'}
              </div>
            </div>
            <Coins size={22} className="text-[#1A7A6E]" />
          </div>
          <div className="mt-4 text-[11px] font-mono text-[#9CA3AF] tracking-wider">
            {fxRate?.source?.toUpperCase()} ·{' '}
            {fxRate ? formatDateTime(fxRate.updatedAt) : ''}
          </div>
          {user?.role === 'exporter' && (
            <Link
              href="/finance"
              className="mt-4 inline-flex items-center gap-1 text-[#C9922A] text-[12px] hover:gap-2 transition-all"
            >
              Manage funds <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </section>

      {/* Orders + Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="helix-card lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A7A6E]/20">
            <div>
              <div className="helix-label">Recent Orders</div>
              <div className="helix-h3 mt-1">
                {data?.recentOrders?.activeCount
                  ? `${data.recentOrders.activeCount} active`
                  : 'No orders yet'}
              </div>
            </div>
            <Link
              href="/orders"
              className="text-[12px] text-[#C9922A] hover:underline"
            >
              View all
            </Link>
          </div>

          {orders.length ? (
            <div className="overflow-x-auto">
              <table className="helix-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 6).map((o: Order) => (
                    <tr key={o.id}>
                      <td className="font-mono text-[#C9922A]">
                        <Link href={`/orders/${o.id}`}>{o.order_number}</Link>
                      </td>
                      <td className="max-w-[220px] truncate">
                        {o.product_name}
                      </td>
                      <td className="font-mono">{o.quantity}</td>
                      <td className="font-mono">
                        {formatUSD(o.agreed_price_usd ?? 0)}
                      </td>
                      <td>
                        <StatusPill status={o.status} />
                      </td>
                      <td>
                        <StatusPill status={o.payment_status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-[#9CA3AF] text-sm">
              <Package size={34} className="mx-auto mb-3 text-[#1A7A6E]" />
              {user?.role === 'retailer'
                ? 'Browse the marketplace to submit your first RFQ.'
                : 'Orders you receive or place will appear here.'}
            </div>
          )}
        </div>

        <div className="helix-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="helix-label">Compliance Score</div>
              <div className="font-mono text-4xl font-bold text-muted mt-2">
                {compliance?.score ?? '—'}
                <span className="text-muted text-xl">/100</span>
              </div>
            </div>
            <StatusPill
              status={
                (compliance?.score ?? 0) >= 80 ? 'active' : 'expiring_soon'
              }
            />
          </div>

          {(compliance?.missingDocuments?.length ?? 0) > 0 && (
            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-2">
                Missing documents
              </div>
              <ul className="space-y-1">
                {compliance!.missingDocuments.slice(0, 4).map((doc: string) => (
                  <li
                    key={doc}
                    className="text-[13px] flex items-center gap-2 text-text"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9922A]" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/compliance"
            className="mt-5 inline-flex items-center gap-1 text-[#C9922A] text-[12px] hover:gap-2 transition-all"
          >
            Manage vault <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Recent Transactions */}
      <section className="helix-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A7A6E]/20">
          <div>
            <div className="helix-label">Recent Transactions</div>
            <div className="helix-h3 mt-1">Ledger · last 10</div>
          </div>
          <Link
            href="/exporter/finance"
            className="text-[12px] text-[#C9922A] hover:underline"
          >
            View full ledger
          </Link>
        </div>

        {transactions.length ? (
          <div className="overflow-x-auto">
            <table className="helix-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Reference</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t: Transaction) => (
                  <tr key={t.id}>
                    <td className="font-mono text-[12px] text-[#9CA3AF]">
                      {formatDateTime(t.timestamp)}
                    </td>
                    <td>
                      <StatusPill
                        status={
                          t.type === 'credit'
                            ? 'received'
                            : t.type === 'fee'
                              ? 'expiring_soon'
                              : 'active'
                        }
                      />
                    </td>
                    <td className="max-w-70 truncate">{t.description}</td>
                    <td className="font-mono text-[12px] text-[#1A7A6E]">
                      {t.anchor_transaction_ref}
                    </td>
                    <td
                      className={`font-mono text-right ${t.type === 'credit' ? 'text-[#C9922A]' : 'text-[#F5F5F5]'}`}
                    >
                      {t.type === 'credit' ? '+' : '-'}
                      {t.currency === 'USD'
                        ? formatUSD(t.amount ?? 0)
                        : formatNGN(t.amount ?? 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-[#9CA3AF] text-sm">
            <Receipt size={34} className="mx-auto mb-3 text-[#1A7A6E]" />
            No transactions yet.
          </div>
        )}
      </section>
    </>
  );
}

// Skeleton
function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="helix-card p-5 h-32 animate-pulse opacity-40"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="helix-card col-span-2 h-64 animate-pulse opacity-40" />
        <div className="helix-card h-64 animate-pulse opacity-40" />
      </div>
      <div className="helix-card h-48 animate-pulse opacity-40" />
    </div>
  );
}
