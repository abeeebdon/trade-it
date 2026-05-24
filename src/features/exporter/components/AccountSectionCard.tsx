import { Check, Star, Trash2 } from 'lucide-react';
import { AccountSectionCardProps } from '../types/exporter';
import WarningModal from '@/components/modals/WarningModal';
import { useState } from 'react';

const AccountSectionCard = ({
  a,
  onDefault,
  onRemove,
}: AccountSectionCardProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <article
      key={a.id}
      className="border border-secondary/25 rounded p-4 flex items-start justify-between gap-3 bg-bg/40"
    >
      <div className="min-w-0 flex-1">
        <div className="flex text-text items-center gap-2 flex-wrap">
          <div className="font-semibold text-[14px] truncate">{a.label}</div>
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
        <p className="text-[12px] text-muted mt-1 truncate">{a.bank_name}</p>
        <p className="text-[12px] text-muted font-mono mt-1">
          {a.account_number_masked}
          {a.account_type ? ` · ${a.account_type}` : ''}
          {a.routing_number ? ` · RTN ${a.routing_number}` : ''}
        </p>
        <p className="text-[11px] text-muted mt-1">Holder: {a.account_name}</p>
      </div>

      {/* Actions */}
      <article className="flex flex-col gap-2 shrink-0">
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
          onClick={() => setDeleteModal(true)}
          title="Deactivate"
          className="text-muted hover:text-[#E74C3C] transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </article>
      <WarningModal
        btnText="Delete"
        open={deleteModal}
        label="Deactivate Account"
        onClose={() => setDeleteModal(false)}
        onConfirm={() => onRemove(a.id)}
        text="Deactivate this account? Existing withdrawals to it stay in your history."
        loading={false}
      />
    </article>
  );
};

export default AccountSectionCard;
