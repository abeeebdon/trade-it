import { CheckCircle2, Key, Link, Truck } from 'lucide-react';
import { useGetOrders } from '../hooks/useGetOrders';
import { formatDateTime, formatUSD } from '@/lib/func';
import { StatusPill } from './StatusPill';

const OrderComp = () => {
  const { data: consumerOrders, isPending } = useGetOrders();
  console.log(consumerOrders);

  return (
    <main>
      <div className="helix-label mb-3">Orders</div>
      {isPending ? (
        <div className="text-[#9CA3AF]">Loading…</div>
      ) : consumerOrders?.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No orders yet.{' '}
          <Link href="/" className="text-[#C9922A]">
            Start shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {consumerOrders?.map((o) => (
            <div
              key={o.id}
              className="helix-card p-5"
              data-testid={`consumer-order-${o.id}`}
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-[#1A7A6E]">
                    {o.orderNumber} ·{' '}
                    {o.orderType === 'prepay' ? 'QUOTED PRICE' : 'LISTED PRICE'}
                  </div>
                  <div className="helix-h3 mt-1">{o.productName}</div>
                  <div className="text-[12px] text-[#9CA3AF] mt-1">
                    {o.quantity} × {formatUSD(o.amount)} ={' '}
                    <span className="text-[#C9922A] font-mono">
                      {formatUSD(o.amount)}
                    </span>
                  </div>
                  {/* {o.delivery_partner_of_record && (
                                            <div className="text-[12px] mt-2 inline-flex items-center gap-1 text-[#C9922A]">
                                                <Truck size={12} /> Delivered via{' '}
                                                <b>{o.delivery_partner_of_record}</b>
                                            </div>
                                        )}
                                        {o.tracking_number && (
                                            <div className="font-mono text-[11px] text-[#1A7A6E] mt-2">
                                                Tracking: {o.tracking_number}
                                            </div>
                                        )} */}
                </div>
                <div className="text-right">
                  <div className="flex flex-col items-end gap-1">
                    <StatusPill status={o.status} />

                    {/* <span
                                                className={`helix-status ${o.escrow_status === 'held' ? 'helix-status-gold' : 'helix-status-ok'}`}
                                            >
                                                <Key size={10} /> ESCROW · {o.escrow_status?.toUpperCase()}
                                            </span> */}
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] font-mono mt-2">
                    {formatDateTime(o.deliveryDate)}
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#1A7A6E]/15 text-[12px] text-[#9CA3AF]">
                Ship to: {o.shipTo}, {o.shippingAddress}
              </div>
              {/* {o.escrow_status === 'held' && (
                                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                                        <div className="text-[11px] text-[#9CA3AF] inline-flex items-center gap-1">
                                            <Key size={12} className="text-[#C9922A]" /> Funds (
                                            {formatUSD(o.total_usd)}) held by{' '}
                                            <b className="text-[#C9922A]">
                                                {o.escrow_held_by || 'Riby Inc'}
                                            </b>
                                            .
                                        </div>
                                        {(o.status === 'shipped' || o.status === 'delivered') && (
                                            <button
                                                // onClick={() => confirmDelivery(o.id)}
                                                className="helix-btn-primary text-sm inline-flex items-center gap-1"
                                                data-testid={`confirm-${o.id}`}
                                            >
                                                <CheckCircle2 size={14} /> Confirm delivery &amp; release
                                            </button>
                                        )}
                                    </div>
                                )} */}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default OrderComp;
