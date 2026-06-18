import { formatUSD } from '@/lib/func';

const RequestQuotationModal = () => {
  return (
    <div
      className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center pt-16 pb-10 overflow-y-auto z-50 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card w-full max-w-md p-6 fade-up"
      >
        <div className="helix-label">Request Quotation</div>
        <h2 className="helix-h3 mt-1">{p.name}</h2>
        <div className="mt-5 space-y-4">
          <div>
            <label className="helix-label">Quantity</label>
            <input
              type="number"
              min={p.min_order_qty}
              className="helix-input"
              value={rfq.quantity}
              onChange={(e) =>
                setRfq({ ...rfq, quantity: Number(e.target.value) })
              }
            />
            <div className="text-[11px] text-[#9CA3AF] mt-1 font-mono">
              Est: {formatUSD((rfq.quantity || 0) * p.price_usd)}
            </div>
          </div>
          <div>
            <label className="helix-label">Delivery address</label>
            <input
              className="helix-input"
              value={rfq.delivery_address}
              onChange={(e) =>
                setRfq({ ...rfq, delivery_address: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="helix-label">Target delivery date</label>
            <input
              type="date"
              className="helix-input"
              value={rfq.target_delivery_date}
              onChange={(e) =>
                setRfq({ ...rfq, target_delivery_date: e.target.value })
              }
            />
          </div>
          <div>
            <label className="helix-label">Message to supplier</label>
            <textarea
              className="helix-input h-20"
              value={rfq.message}
              onChange={(e) => setRfq({ ...rfq, message: e.target.value })}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setOpen(false)}
              className="helix-btn-secondary flex-1"
            >
              Cancel
            </button>
            <button onClick={submitRfq} className="helix-btn-primary flex-1">
              Submit RFQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestQuotationModal;
