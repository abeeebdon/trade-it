'use client';

import type { AccountSectionProps } from '../types/exporter';
import AccountSectionCard from './AccountSectionCard';
import BankAccountSkeleton from './BankActionSkeletonLoader';

export default function AccountSection({
  title,
  icon: Icon,
  items,
  loading,
  empty,
  onDefault,
  onRemove,
}: AccountSectionProps) {
  return (
    <section className="bg-surface border border-border rounded p-5 mb-5">
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
            <BankAccountSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-mute text-[13px] py-3">{empty}</div>
      ) : (
        <section className="grid  md:grid-cols-2 gap-3">
          {items.map((a) => (
            <AccountSectionCard
              key={a.id}
              a={a}
              onDefault={onDefault}
              onRemove={onRemove}
            />
          ))}
        </section>
      )}
    </section>
  );
}
