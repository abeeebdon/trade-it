import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  to?: string;
  accent?: boolean;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  to,
  accent,
}: StatCardProps) {
  const content = (
    <div
      className={`helix-card p-5 flex items-start justify-between ${
        accent ? 'border-[#C9922A]/40' : ''
      }`}
    >
      <div>
        <div className="helix-label">{label}</div>
        <div className="font-mono text-2xl font-bold mt-1 text-[#C9922A]">
          {value}
        </div>
      </div>
      <Icon
        size={20}
        className={accent ? 'text-[#C9922A]' : 'text-[#1A7A6E]'}
      />
    </div>
  );

  return to ? <Link href={to}>{content}</Link> : content;
}
