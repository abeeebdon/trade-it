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
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#C9922A]/10 blur-2xl pointer-events-none" />
      )}
      <div className="flex justify-between items-start relative">
        <div>
          <div className="helix-label">{label}</div>
          <div
            className="font-mono text-4xl font-bold mt-2 tracking-tight text-[#F5F5F5]"
            data-testid={`balance-${label.split(' ')[0].toLowerCase()}`}
          >
            {value}
          </div>
          <div className="text-[11px] text-[#9CA3AF] mt-1 font-mono uppercase tracking-wider">
            {sub}
          </div>
        </div>
      </div>
      {va?.account_number && (
        <div className="mt-5 pt-4 border-t border-[#1A7A6E]/15">
          <div className="text-[10px] uppercase tracking-widest text-[#9CA3AF] mb-1">
            Virtual Account
          </div>
          <div className="font-mono text-[13px] text-[#C9922A]">
            {va.account_number}
          </div>
          <div className="text-[11px] text-[#9CA3AF]">{va.bank}</div>
        </div>
      )}
    </div>
  );
}
