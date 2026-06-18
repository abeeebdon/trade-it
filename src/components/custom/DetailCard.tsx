import { ReactNode } from 'react';

interface DetailCardProps {
  label: string;
  value: ReactNode;
}
export default function DetailCard({ label, value }: DetailCardProps) {
  return (
    <div>
      <div className="helix-label">{label}</div>
      <div className="text-[14px] mt-1">{value}</div>
    </div>
  );
}
