'use client';

import { formatUSD } from '@/lib/func';
import type { SellerQuote, RespondForm } from '../types/exporter';

interface RespondQuoteModalProps {
  quote: SellerQuote;
  form: RespondForm;
  busy: boolean;
  onFormChange: (form: RespondForm) => void;
  onSend: () => void;
  onClose: () => void;
}

export default function RespondQuoteModal({
  quote,
  form,
  busy,
  onFormChange,
  onSend,
  onClose,
}: RespondQuoteModalProps) {
  const estimatedTotal =
    form.quoted_unit_price_usd && Number(form.quoted_unit_price_usd) > 0
      ? Number(form.quoted_unit_price_usd) * quote.quantity
      : null;

  return (
    <div
      className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur flex items-start justify-center pt-16 pb-10 overflow-y-auto z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="helix-card p-6 w-full max-w-md"
      >
        <div className="helix-kicker">Respond · {quote.quote_number}</div>
        <h3 className="helix-h3 mt-1">{quote.listing_title}</h3>
        <div className="mt-3 text-[12px] text-[#9CA3AF]">
          Qty requested:{' '}
          <span className="font-mono text-[#F5F5F5]">{quote.quantity}</span>
        </div>
        {quote.message && (
          <div className="mt-2 text-[12px] italic text-[#9CA3AF]">
            &ldquo;{quote.message}&rdquo;
          </div>
        )}

        <div className="mt-4 space-y-3">
          {/* Quoted unit price */}
          <div>
            <label className="helix-label">Quoted unit price (USD)</label>
            <input
              type="number"
              step="0.01"
              min={0}
              className="helix-input"
              value={form.quoted_unit_price_usd}
              onChange={(e) =>
                onFormChange({
                  ...form,
                  quoted_unit_price_usd: e.target.value,
                })
              }
              data-testid="q-unit"
            />
            {estimatedTotal && (
              <div className="text-[11px] text-[#C9922A] font-mono mt-1">
                Est. total: {formatUSD(estimatedTotal)}
              </div>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="helix-label">Note to consumer</label>
            <textarea
              className="helix-input h-20"
              value={form.quote_note}
              placeholder="Optional note about pricing, timeline, etc."
              onChange={(e) =>
                onFormChange({ ...form, quote_note: e.target.value })
              }
              data-testid="q-note"
            />
          </div>

          {/* Valid days */}
          <div>
            <label className="helix-label">Valid for (days)</label>
            <input
              type="number"
              min={1}
              max={30}
              className="helix-input"
              value={form.valid_days}
              onChange={(e) =>
                onFormChange({
                  ...form,
                  valid_days: Number(e.target.value),
                })
              }
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="helix-btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={onSend}
              disabled={busy || !form.quoted_unit_price_usd}
              className="helix-btn-primary flex-1"
              data-testid="q-send"
            >
              {busy ? 'Sending…' : 'Send quote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
