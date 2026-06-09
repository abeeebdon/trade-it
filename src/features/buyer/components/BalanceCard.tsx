type VirtualAccount = {
  account_number: string;
  bank: string;
};

export interface BalanceCardProps {
  label: string;
  value: string | number;
  sub?: string;
  va?: VirtualAccount;
  accent?: boolean;
}
export default function BalanceCard({
  label,
  value,
  sub,
  va,
  accent,
}: BalanceCardProps) {
  return (
    <div
      className={`helix-card p-5 ${accent ? 'relative overflow-hidden' : ''}`}
    >
      {accent && (
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
      )}
      <div className="flex justify-between items-start relative">
        <div>
          <div className="helix-label">{label}</div>
          <div
            className="font-mono text-4xl font-bold mt-2 tracking-tight text-text"
            data-testid={`balance-${label.split(' ')[0].toLowerCase()}`}
          >
            {value}
          </div>
          <div className="text-[11px] text-muted mt-1 font-mono uppercase tracking-wider">
            {sub}
          </div>
        </div>
      </div>
      {va?.account_number && (
        <div className="mt-5 pt-4 border-t border-secondary/15">
          <div className="text-[10px] uppercase tracking-widest text-muted mb-1">
            Virtual Account
          </div>
          <div className="font-mono text-[13px] text-primary">
            {va.account_number}
          </div>
          <div className="text-[11px] text-muted">{va.bank}</div>
        </div>
      )}
    </div>
  );
}
