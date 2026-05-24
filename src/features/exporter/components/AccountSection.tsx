'use client';

import { Star, Trash2, Check } from 'lucide-react';
import type { WithdrawalAccount } from '../types/exporter';
import { LucideIcon } from 'lucide-react';

interface AccountSectionProps {
  title: string;
  icon: LucideIcon;
  items: WithdrawalAccount[];
  loading: boolean;
  empty: string;
  testid: string;
  onDefault: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function AccountSection({
  title,
  icon: Icon,
  items,
  loading,
  empty,
  testid,
  onDefault,
  onRemove,
}: AccountSectionProps) {
  return (
    <div className="helix-card p-5 mb-5" data-testid={testid}>
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-primary" />
        <div className="helix-h3">{title}</div>
        <span className="ml-auto text-[11px] font-mono uppercase tracking-wider text-muted">
          {items.length}
        </span>
      </div>

      {/* States */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-24 rounded border border-[#1A7A6E]/15 animate-pulse opacity-40"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-[#9CA3AF] text-[13px] py-3">{empty}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {items.map((a) => (
            <div
              key={a.id}
              data-testid={`acc-${a.id}`}
              className="border border-[#1A7A6E]/25 rounded p-4 flex items-start justify-between gap-3 bg-bg/40"
            >
              {/* Account info */}
              <div className="min-w-0 flex-1">
                <div className="flex text-text items-center gap-2 flex-wrap">
                  <div className="font-semibold text-[14px] truncate">
                    {a.label}
                  </div>
                  {a.is_default && (
                    <span className="helix-status helix-status-gold text-[9px] py-0.5 px-2 inline-flex items-center gap-1">
                      <Star size={9} className="fill-current" /> Default
                    </span>
                  )}
                  {a.approval_status === 'approved' && (
                    <span className="helix-status helix-status-ok text-[9px] py-0.5 px-2 inline-flex items-center gap-1">
                      <Check size={9} /> Approved
                    </span>
                  )}
                  {a.approval_status === 'pending' && (
                    <span className="helix-status helix-status-expiring text-[9px] py-0.5 px-2">
                      Pending
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-muted mt-1 truncate">
                  {a.bank_name}
                </div>
                <div className="text-[12px] text-muted font-mono mt-1">
                  {a.account_number_masked}
                  {a.account_type ? ` · ${a.account_type}` : ''}
                  {a.routing_number ? ` · RTN ${a.routing_number}` : ''}
                </div>
                <div className="text-[11px] text-muted mt-1">
                  Holder: {a.account_name}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                {!a.is_default && (
                  <button
                    onClick={() => onDefault(a.id)}
                    title="Set as default"
                    className="text-[#9CA3AF] hover:text-[#C9922A] transition-colors"
                    data-testid={`default-${a.id}`}
                  >
                    <Star size={14} />
                  </button>
                )}
                <button
                  onClick={() => onRemove(a.id)}
                  title="Deactivate"
                  className="text-[#9CA3AF] hover:text-[#E74C3C] transition-colors"
                  data-testid={`remove-${a.id}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
