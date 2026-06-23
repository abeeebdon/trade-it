'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatUSD } from '@/lib/func';
import { StatusPill } from '@/features/shops/components/StatusPill';
import { toast } from 'sonner';
import { CheckCircle2, Download } from 'lucide-react';
import { useGetOrderById } from '../../hooks/useOrders';
import { useHeader } from '@/context/HeaderContext';
import { LIFECYCLE, tradeDocuments } from '@/lib/constants';
import { SellerOrder } from '../types/exporterOrdersType';
import { Loading } from '@/components/loading';
import { LifecycleStepper } from '../components/LifeCycleScroller';

export default function OrderDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setHeader } = useHeader();

  const [disputeOpen, setDisputeOpen] = useState(false);
  const [dispute, setDispute] = useState({ reason: '', description: '' });
  const [busy, setBusy] = useState(false);

  const { data, isLoading, refetch } = useGetOrderById(id ?? '');
  const orderDetails: SellerOrder = useMemo(() => {
    return data ? data : ({} as SellerOrder);
  }, [data]);

  const currentIdx = LIFECYCLE.findIndex(
    (item) => item.value === orderDetails.status,
  );
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [currentIdx]);
  const issueProforma = async () => {
    setBusy(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      toast.success('Proforma issued — buyer notified');
      refetch();
    } catch {
      toast.error('Failed');
    } finally {
      setBusy(false);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="helix-card p-12 text-center text-[#9CA3AF]">
        Order details could not be found. Please check your tracking ID link.
      </div>
    );
  }

  const isSupplier = orderDetails?.role?.toLowerCase() === 'exporter';
  const isBuyer = orderDetails?.role?.toLowerCase() === 'retailer';

  return (
    <main className="w-full overflow-hidden">
      {/* Status pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        <StatusPill status={orderDetails.status} />
        <StatusPill status={orderDetails.paymentStatus} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Trade Lifecycle */}
          <div className="helix-card p-6">
            <div className="helix-label mb-4">Trade Lifecycle</div>
            <LifecycleStepper steps={LIFECYCLE} currentIdx={currentIdx} />
          </div>

          {/* Actions */}
          {(isSupplier || isBuyer) && (
            <div className="helix-card p-6">
              <div className="helix-label mb-3">Actions</div>
              <div className="flex flex-wrap gap-2">
                {isSupplier && orderDetails.status === 'draft' && (
                  <button
                    onClick={issueProforma}
                    disabled={busy}
                    className="helix-btn-primary"
                  >
                    Issue Proforma Invoice
                  </button>
                )}
                {isBuyer &&
                  orderDetails.paymentStatus !== 'confirmed' &&
                  orderDetails.status === 'confirmed' && (
                    <button
                      // onClick={simulatePayment}
                      disabled={busy}
                      className="helix-btn-primary"
                    >
                      Simulate Payment (MOCK)
                    </button>
                  )}
                {isSupplier &&
                  orderDetails.status !== 'draft' &&
                  orderDetails.status !== 'disputed' &&
                  orderDetails.status !== 'delivered' &&
                  LIFECYCLE.slice(currentIdx + 1, currentIdx + 2).map((s) => (
                    <button
                      key={s.value}
                      // onClick={() => setStatus(s)}
                      disabled={busy}
                      className="helix-btn-secondary"
                    >
                      Mark {s.label}
                    </button>
                  ))}
                <button
                  onClick={() => setDisputeOpen(true)}
                  className="helix-btn-secondary border-[#E74C3C]/60! text-[#E74C3C]!"
                >
                  Raise dispute
                </button>
              </div>
            </div>
          )}

          {/* ── Trade Documents ── */}
          <div className="helix-card p-6">
            <div className="helix-label mb-3">Trade Documents</div>
            <div className="flex flex-wrap gap-3">
              {tradeDocuments.map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.kind}
                    // onClick={() => downloadPdf(d.kind)}
                    className="p-4 border border-[#1A7A6E]/30 rounded hover:border-[#C9922A] hover:bg-[#C9922A]/5 transition text-left"
                  >
                    <Icon size={20} className="text-[#C9922A] mb-2" />
                    <div className="text-[12px] font-medium">{d.label}</div>
                    <div className="text-[10px] text-[#9CA3AF] flex items-center gap-1 mt-1">
                      <Download size={10} /> Download PDF
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="helix-card p-6">
            <div className="helix-label mb-3">Timeline</div>
          </div>
        </div>

        {/* ── Right col ── */}
        <div className="space-y-4">
          {/* Order value */}
          <div className="helix-card p-6">
            <div className="helix-label">Order Value</div>
            <div className="font-mono text-3xl text-[#C9922A] font-bold mt-1">
              {formatUSD(orderDetails.amount)}
            </div>
            <div className="text-[12px] text-[#9CA3AF]">
              {orderDetails.quantity} × {formatUSD(orderDetails.amount)}
            </div>
          </div>

          {/* Payment instructions */}
          {true && (
            <div className="helix-card p-6">
              <div className="helix-label">Payment Instructions</div>
              <div className="mt-3 p-3 bg-[#0A1628] rounded border border-[#C9922A]/30 font-mono text-[13px]">
                <div className="text-[10px] tracking-widest text-[#9CA3AF] mb-1">
                  VIRTUAL ACCOUNT (USD)
                </div>
                <div className="text-[#C9922A] text-base">
                  {/* {o.anchor_reserved_account_number} */}
                </div>
                <div className="text-[11px] text-[#9CA3AF] mt-1">
                  Anchor Reserved · FBO Helix
                </div>
              </div>
              <div className="text-[11px] text-[#9CA3AF] mt-3">
                Send{' '}
                <span className="text-[#C9922A] font-mono">
                  {formatUSD(orderDetails.amount)}
                </span>{' '}
                exactly. Payment auto-reconciles via Anchor webhook.
              </div>
            </div>
          )}

          {/* Parties */}
          <div className="helix-card p-6">
            <div className="helix-label">Parties</div>
            <div className="mt-3 space-y-3 text-[13px]">
              <div>
                <div className="text-[10px] text-[#9CA3AF] tracking-widest">
                  SUPPLIER
                </div>
                {/* <div>{orderDetails}</div>
                <div className="text-[11px] text-[#9CA3AF]">
                  {data.supplier?.country} */}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#9CA3AF] tracking-widest">
                BUYER
              </div>
              {/* <div>{data.buyer?.business_name}</div> */}
              <div className="text-[11px] text-[#9CA3AF]">
                {/* {data.buyer?.country} */}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#9CA3AF] tracking-widest">
                DELIVERY ADDRESS
              </div>
              <div className="text-[12px]">{orderDetails.shippingAddress}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispute Modal */}
      {disputeOpen && (
        <div
          className="fixed inset-0 bg-[#0A1628]/80 flex items-start justify-center pt-16 pb-10 overflow-y-auto z-50 p-4"
          onClick={() => setDisputeOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="helix-card w-full max-w-md p-6"
          >
            <h3 className="helix-h3">Raise dispute</h3>
            <div className="space-y-3 mt-4">
              <div>
                <label className="helix-label">Reason</label>
                <input
                  className="helix-input"
                  value={dispute.reason}
                  onChange={(e) =>
                    setDispute({ ...dispute, reason: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="helix-label">Description</label>
                <textarea
                  className="helix-input h-24"
                  value={dispute.description}
                  onChange={(e) =>
                    setDispute({ ...dispute, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDisputeOpen(false)}
                  className="helix-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  // onClick={raiseDispute}
                  disabled={busy}
                  className="helix-btn-primary flex-1"
                >
                  {busy ? 'Submitting…' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
