'use client';

import { useEffect, useState } from 'react';
import { formatUSD, formatNGN, formatDateTime } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  ArrowUpRight,
  Coins,
  Receipt,
  Package,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import BalanceCard from '../components/BalanceCard';

// ─── Mock Data ──────

const mockFinance = {
  usd_balance: 12450.0,
  ngn_balance: 19800000,
  virtual_accounts: {
    usd: { account_number: '9900012345', bank: 'Anchor Bank (USD)' },
    ngn: { account_number: '0123456789', bank: 'Anchor Bank (NGN)' },
  },
  recent_transactions: [
    {
      id: 'txn-001',
      timestamp: '2025-04-28T10:22:00Z',
      type: 'credit',
      description: 'Payment received for Order #ORD-0041',
      anchor_transaction_ref: 'ANC-REF-88123',
      currency: 'USD',
      amount: 3200.0,
    },
    {
      id: 'txn-002',
      timestamp: '2025-04-27T08:15:00Z',
      type: 'debit',
      description: 'Platform fee — Order #ORD-0039',
      anchor_transaction_ref: 'ANC-REF-88100',
      currency: 'USD',
      amount: 48.0,
    },
    {
      id: 'txn-003',
      timestamp: '2025-04-25T14:44:00Z',
      type: 'fee',
      description: 'FX conversion NGN → USD',
      anchor_transaction_ref: 'ANC-REF-88088',
      currency: 'NGN',
      amount: 150000,
    },
  ],
};

const mockOrders = [
  {
    id: 'ord-001',
    order_number: 'ORD-0041',
    product_name: 'Premium Sesame Seeds (50kg bags)',
    quantity: 200,
    agreed_price_usd: 3200,
    status: 'in_progress',
    payment_status: 'paid',
  },
  {
    id: 'ord-002',
    order_number: 'ORD-0039',
    product_name: 'Refined Shea Butter — Grade A',
    quantity: 80,
    agreed_price_usd: 1600,
    status: 'pending',
    payment_status: 'awaiting',
  },
  {
    id: 'ord-003',
    order_number: 'ORD-0035',
    product_name: 'Hibiscus Flower (Dried, Export Grade)',
    quantity: 500,
    agreed_price_usd: 5500,
    status: 'completed',
    payment_status: 'paid',
  },
];

const mockFx = {
  usd_to_ngn: 1590.5,
  source: 'CBN',
  fetched_at: Math.floor(Date.now() / 1000),
};

const mockBiz = {
  kyc_status: 'approved',
  kyb_status: 'approved',
  registration_type: 'business',
  compliance_score: 82,
};

const mockComplianceScore = {
  score: 82,
  missing: ['Utility Bill (last 3 months)', 'Board Resolution Letter'],
};

// ─── Types ─────────────────────

type Finance = typeof mockFinance;
type Order = (typeof mockOrders)[number];
type Fx = typeof mockFx;
type Biz = typeof mockBiz;
type ComplianceScore = typeof mockComplianceScore;

// ─── Dashboard ────────

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = useState<Finance | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [fx, setFx] = useState<Fx | null>(null);
  const [biz, setBiz] = useState<Biz | null>(null);
  const [complianceScore, setComplianceScore] =
    useState<ComplianceScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockFinance);
      setOrders(mockOrders);
      setFx(mockFx);
      setBiz(mockBiz);
      setComplianceScore(mockComplianceScore); // always set for mock
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <Skeleton />;

  return (
    <>
      {/* Status banner when not approved */}
      {biz &&
        biz.kyc_status !== 'approved' &&
        biz.kyb_status !== 'approved' && (
          <div className="helix-card p-5 mb-6 border-[#C9922A]/40 bg-[#C9922A]/6 flex items-start gap-4">
            <ShieldAlert size={22} className="text-[#C9922A] mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold">
                Complete verification to unlock trading
              </div>
              <p className="text-[13px] text-[#9CA3AF] mt-1">
                Submit your{' '}
                {biz.registration_type === 'business' ? 'KYB' : 'KYC'} documents
                to provision your NGN and USD accounts.
              </p>
            </div>
            <Link
              href="/onboarding"
              className="helix-btn-primary text-sm whitespace-nowrap"
            >
              Continue onboarding{' '}
              <ArrowRight size={14} className="inline ml-1 font-bold" />
            </Link>
          </div>
        )}

      {!biz && (
        <div className="helix-card p-5 mb-6 border-[#C9922A]/40 bg-[#C9922A]/6 flex items-start gap-4">
          <ShieldAlert size={22} className="text-[#C9922A] mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold">Set up your business profile</div>
            <p className="text-[13px] text-[#9CA3AF] mt-1">
              Before you can list products or receive payments, create your
              business profile.
            </p>
          </div>
          <Link
            href="/onboarding"
            className="helix-btn-primary text-sm whitespace-nowrap"
          >
            Start onboarding{' '}
            <ArrowRight size={14} className="inline ml-1 font-bold" />
          </Link>
        </div>
      )}

      {/* BALANCES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <BalanceCard
          label="USD Balance"
          value={formatUSD(data?.usd_balance ?? 0)}
          sub="Available · USD"
          va={data?.virtual_accounts?.usd}
          accent
        />
        <BalanceCard
          label="NGN Balance"
          value={formatNGN(data?.ngn_balance ?? 0)}
          sub="Available · NGN"
          va={data?.virtual_accounts?.ngn}
        />
        <div className="helix-card p-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="helix-label">USD / NGN Rate</div>
              <div className="font-mono text-3xl font-bold text-primary mt-2 tracking-tight">
                ₦{fx ? Number(fx.usd_to_ngn).toLocaleString() : '—'}
              </div>
            </div>
            <Coins size={22} className="text-[#1A7A6E]" />
          </div>
          <div className="mt-4 text-[11px] font-mono text-[#9CA3AF] tracking-wider">
            {fx?.source?.toUpperCase()} ·{' '}
            {fx
              ? formatDateTime(new Date(fx.fetched_at * 1000).toISOString())
              : ''}
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

      {/* Row 2: orders + compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="helix-card lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A7A6E]/20">
            <div>
              <div className="helix-label">Recent Orders</div>
              <div className="helix-h3 mt-1">
                {orders.length ? `${orders.length} active` : 'No orders yet'}
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
                  {orders.slice(0, 6).map((o) => (
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
              {user?.role === 'reseller'
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
                {complianceScore
                  ? `${complianceScore.score}`
                  : (biz?.compliance_score ?? '—')}
                <span className="text-muted text-xl">/100</span>
              </div>
            </div>
            <StatusPill
              status={
                (complianceScore?.score ?? biz?.compliance_score ?? 0) >= 80
                  ? 'active'
                  : 'expiring_soon'
              }
            />
          </div>
          {(complianceScore?.missing?.length ?? 0) > 0 && (
            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-2">
                Missing documents
              </div>
              <ul className="space-y-1">
                {complianceScore!.missing.slice(0, 4).map((m) => (
                  <li
                    key={m}
                    className="text-[13px] flex items-center gap-2 text-text"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9922A]" />{' '}
                    {m}
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

      {/* Recent transactions */}
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
        {data?.recent_transactions?.length ? (
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
                {data.recent_transactions.map((t) => (
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
                      className={`font-mono text-right ${
                        t.type === 'credit'
                          ? 'text-[#C9922A]'
                          : 'text-[#F5F5F5]'
                      }`}
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

// ─── Sub-components ─────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="helix-card p-5 h-32 animate-pulse opacity-40" />
      ))}
    </div>
  );
}
